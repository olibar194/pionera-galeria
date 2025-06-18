'use client'

import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'

const translations = {
  es: {
    nombreCompleto: 'Nombre completo',
    nacionalidadPais: 'Nacionalidad / País',
    fechaNacimiento: 'Fecha de nacimiento',
    email: 'Email',
    cv: 'CV (PDF, DOC, DOCX)',
    propuesta: 'Propuesta (PDF, DOC, DOCX)',
    beca: 'Beca',
    becaSi: 'Sí',
    becaNo: 'No',
    duracionEstadia: 'Duración de estadía',
    duracion2Semanas: '2 semanas',
    duracion1Mes: '1 mes',
    alojamiento: 'Alojamiento',
    enviar: 'Enviar postulación',
    requerido: 'Este campo es obligatorio',
    emailInvalido: 'Email inválido',
    adjuntaCV: 'Adjunta tu CV',
    adjuntaPropuesta: 'Adjunta tu propuesta',
    seleccionaOpcion: 'Selecciona una opción',
    placeholderDuracion: 'Selecciona duración',
    exito: 'Formulario enviado correctamente',
  },
  en: {
    nombreCompleto: 'Full name',
    nacionalidadPais: 'Nationality / Country',
    fechaNacimiento: 'Date of birth',
    email: 'Email',
    cv: 'CV (PDF, DOC, DOCX)',
    propuesta: 'Proposal (PDF, DOC, DOCX)',
    beca: 'Scholarship',
    becaSi: 'Yes',
    becaNo: 'No',
    duracionEstadia: 'Length of stay',
    duracion2Semanas: '2 weeks',
    duracion1Mes: '1 month',
    alojamiento: 'Accommodation',
    enviar: 'Submit application',
    requerido: 'This field is required',
    emailInvalido: 'Invalid email',
    adjuntaCV: 'Attach your CV',
    adjuntaPropuesta: 'Attach your proposal',
    seleccionaOpcion: 'Select an option',
    placeholderDuracion: 'Select duration',
    exito: 'Form submitted successfully',
  },
}

interface ResidencyFormFields {
  nombreCompleto: string
  nacionalidadPais: string
  fechaNacimiento: string
  email: string
  cv: FileList
  propuesta: FileList
  beca: string
  duracionEstadia: string
  alojamiento: string
}

interface ResidencyFormProps {
  locale: string
}

export default function ResidencyForm({ locale }: ResidencyFormProps) {
  const t = translations[locale === 'en' ? 'en' : 'es']

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResidencyFormFields>()

  const onSubmit = (data: ResidencyFormFields) => {
    // Aquí puedes manejar el envío, por ejemplo, enviar a una API o mostrar un mensaje
    alert(t.exito)
    reset()
  }

  return (
    <form
      className='space-y-6 max-w-xl mx-auto'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Label htmlFor='nombreCompleto'>{t.nombreCompleto} *</Label>
        <Input
          id='nombreCompleto'
          {...register('nombreCompleto', {
            required: t.requerido,
          })}
        />
        {errors.nombreCompleto && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.nombreCompleto.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor='nacionalidadPais'>{t.nacionalidadPais} *</Label>
        <Input
          id='nacionalidadPais'
          {...register('nacionalidadPais', {
            required: t.requerido,
          })}
        />
        {errors.nacionalidadPais && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.nacionalidadPais.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor='fechaNacimiento'>{t.fechaNacimiento} *</Label>
        <Input
          id='fechaNacimiento'
          type='date'
          {...register('fechaNacimiento', {
            required: t.requerido,
          })}
        />
        {errors.fechaNacimiento && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.fechaNacimiento.message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor='email'>{t.email} *</Label>
        <Input
          id='email'
          type='email'
          {...register('email', {
            required: t.requerido,
            pattern: {
              value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
              message: t.emailInvalido,
            },
          })}
        />
        {errors.email && (
          <p className='text-red-500 text-sm mt-1'>{errors.email.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor='cv'>{t.cv} *</Label>
        <Input
          id='cv'
          type='file'
          accept='.pdf,.doc,.docx'
          {...register('cv', {
            required: t.adjuntaCV,
            validate: (files) => files && files.length > 0,
          })}
        />
        {errors.cv && (
          <p className='text-red-500 text-sm mt-1'>{errors.cv.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor='propuesta'>{t.propuesta} *</Label>
        <Input
          id='propuesta'
          type='file'
          accept='.pdf,.doc,.docx'
          {...register('propuesta', {
            required: t.adjuntaPropuesta,
            validate: (files) => files && files.length > 0,
          })}
        />
        {errors.propuesta && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.propuesta.message}
          </p>
        )}
      </div>
      <div>
        <Label>{t.beca} *</Label>
        <RadioGroup
          className='flex gap-4 mt-2'
          {...register('beca', { required: t.seleccionaOpcion })}
        >
          <RadioGroupItem value='Sí' id='beca-si' {...register('beca')} />
          <Label htmlFor='beca-si'>{t.becaSi}</Label>
          <RadioGroupItem value='No' id='beca-no' {...register('beca')} />
          <Label htmlFor='beca-no'>{t.becaNo}</Label>
        </RadioGroup>
        {errors.beca && (
          <p className='text-red-500 text-sm mt-1'>{errors.beca.message}</p>
        )}
      </div>
      <div>
        <Label htmlFor='duracionEstadia'>{t.duracionEstadia} *</Label>
        <Select
          {...register('duracionEstadia', {
            required: t.seleccionaOpcion,
          })}
        >
          <SelectTrigger id='duracionEstadia'>
            <SelectValue placeholder={t.placeholderDuracion} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='2 semanas'>{t.duracion2Semanas}</SelectItem>
            <SelectItem value='1 mes'>{t.duracion1Mes}</SelectItem>
          </SelectContent>
        </Select>
        {errors.duracionEstadia && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.duracionEstadia.message}
          </p>
        )}
      </div>
      <div>
        <Label>{t.alojamiento} *</Label>
        <RadioGroup
          className='flex gap-4 mt-2'
          {...register('alojamiento', { required: t.seleccionaOpcion })}
        >
          <RadioGroupItem
            value='Sí'
            id='alojamiento-si'
            {...register('alojamiento')}
          />
          <Label htmlFor='alojamiento-si'>{t.becaSi}</Label>
          <RadioGroupItem
            value='No'
            id='alojamiento-no'
            {...register('alojamiento')}
          />
          <Label htmlFor='alojamiento-no'>{t.becaNo}</Label>
        </RadioGroup>
        {errors.alojamiento && (
          <p className='text-red-500 text-sm mt-1'>
            {errors.alojamiento.message}
          </p>
        )}
      </div>
      <Button type='submit' className='w-full'>
        {t.enviar}
      </Button>
    </form>
  )
}
