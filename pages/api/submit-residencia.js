import formidable from 'formidable'
import { v4 as uuidv4 } from 'uuid'
import { google } from 'googleapis'
import sgMail from '@sendgrid/mail'

// Disable Next.js default bodyParser for this route
export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }

  try {
    // Parse multipart form
    const form = formidable({ keepExtensions: true })
    const data = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err)
        else resolve({ fields, files })
      })
    })
    const { fields, files } = data
    console.log('FIELDS:', fields)
    console.log('FILES:', files)

    // Generate unique ID
    const uniqueId = uuidv4()
    console.log('UNIQUE ID:', uniqueId)

    // Google Drive Auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(
          /\\n/g,
          '\n'
        ),
      },
      scopes: [
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/spreadsheets',
      ],
    })
    const drive = google.drive({ version: 'v3', auth })
    const sheets = google.sheets({ version: 'v4', auth })

    // Create folder in Drive
    const folder = await drive.files.create({
      resource: {
        name: uniqueId,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [process.env.GOOGLE_DRIVE_FOLDER_ID],
      },
      fields: 'id',
    })
    const folderId = folder.data.id
    console.log('FOLDER ID:', folderId)

    // Helper to upload file
    async function uploadFile(file, name) {
      if (!file || !file.filepath) {
        console.error('Archivo no recibido correctamente:', file)
        throw new Error('No se recibió el archivo o está corrupto')
      }
      const resp = await drive.files.create({
        resource: {
          name,
          parents: [folderId],
        },
        media: {
          mimeType: file.mimetype,
          body: require('fs').createReadStream(file.filepath),
        },
        fields: 'id, webViewLink',
      })
      // Make file public
      await drive.permissions.create({
        fileId: resp.data.id,
        requestBody: { role: 'reader', type: 'anyone' },
      })
      // Get public link
      const fileMeta = await drive.files.get({
        fileId: resp.data.id,
        fields: 'webViewLink',
      })
      console.log('File uploaded:', name, fileMeta.data.webViewLink)
      return fileMeta.data.webViewLink
    }

    // Upload files
    // Si formidable recibe archivos, los pone como objeto o array
    const cvFile = Array.isArray(files.cv) ? files.cv[0] : files.cv
    const propuestaFile = Array.isArray(files.propuesta)
      ? files.propuesta[0]
      : files.propuesta
    const cvLink = await uploadFile(cvFile, 'cv_' + uniqueId)
    const propuestaLink = await uploadFile(
      propuestaFile,
      'propuesta_' + uniqueId
    )
    console.log('CV LINK:', cvLink)
    console.log('PROPUESTA LINK:', propuestaLink)

    // Normaliza los campos recibidos del formulario
    const nombre = fields.nombre || fields.nombreCompleto || ''
    const nacionalidad = fields.nacionalidad || fields.nacionalidadPais || ''
    const fechaNacimiento = fields.edad || fields.fechaNacimiento || ''
    const email = fields.email || ''
    const beca = fields.beca || ''
    const duracionEstadia = fields.duracionEstadia || ''
    const alojamiento = fields.alojamiento || ''

    // Add row to Google Sheets SOLO con los campos requeridos
    const values = [
      uniqueId,
      nombre,
      nacionalidad,
      fechaNacimiento,
      email,
      beca,
      duracionEstadia,
      alojamiento,
      cvLink,
      propuestaLink,
      new Date().toISOString(),
    ]
    const flatValues = values.map((v) =>
      Array.isArray(v) ? v[0] || '' : v == null ? '' : v
    )
    console.log('VALUES TO SHEETS FLATTENED:', flatValues)
    const sheetsResp = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'A1',
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [flatValues] },
    })
    console.log('SHEETS RESPONSE:', sheetsResp.data)

    // Send email notification con SendGrid
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('Falta la variable de entorno SENDGRID_API_KEY')
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const html = `
      <h2>Nueva postulación a la residencia</h2>
      <ul>
        <li><b>ID:</b> ${uniqueId}</li>
        <li><b>Nombre:</b> ${nombre}</li>
        <li><b>Nacionalidad:</b> ${nacionalidad}</li>
        <li><b>Fecha de nacimiento:</b> ${fechaNacimiento}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Beca:</b> ${beca}</li>
        <li><b>Duración de la estadía:</b> ${duracionEstadia}</li>
        <li><b>Alojamiento:</b> ${alojamiento}</li>
        <li><b>CV:</b> <a href="${cvLink}">Ver archivo</a></li>
        <li><b>Propuesta:</b> <a href="${propuestaLink}">Ver archivo</a></li>
        <li><b>Fecha de envío:</b> ${flatValues[10]}</li>
      </ul>
    `
    const mailResp = await sgMail.send({
      to: 'olibar194@gmail.com',
      from: process.env.SENDGRID_FROM || 'no-reply@pioneragaleria.com',
      subject: `Nueva postulación a la residencia de: ${nombre}`,
      html,
    })
    console.log('MAIL RESPONSE:', mailResp)

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('ERROR EN API:', error)
    return res.status(500).json({ success: false, error: error.message })
  }
}
