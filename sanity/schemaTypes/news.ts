// Schema: news
export default {
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        {
          name: 'es',
          title: 'Spanish',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
      ],
    },
    {
      name: 'slug', // Solo necesario si isExternalLink es false y no hay internalLinkRef con slug propio
      title: 'Slug (for internal news page if no other reference)',
      type: 'slug',
      options: {
        source: (doc: any) => doc.title?.es || doc.title?.en || '',
        maxLength: 96,
      },
      // Ocultar este campo condicionalmente si isExternalLink es true o internalLinkRef está definido
      // En v0.dev, generar slug para todas las noticias internas por simplicidad si no se puede ocultar.
    },
    {
      name: 'mainImage',
      title: 'Main Image / Thumbnail',
      type: 'image', // URL placeholder
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'summary', // Un breve resumen para la tarjeta de noticias
      title: 'Summary',
      type: 'object',
      fields: [
        { name: 'es', title: 'Spanish', type: 'text', rows: 3 },
        { name: 'en', title: 'English', type: 'text', rows: 3 },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'content', // Contenido completo si la noticia es interna y no referencia a otra página
      title: 'Full Content (if this news item has its own page)',
      type: 'object',
      fields: [
        {
          name: 'es',
          title: 'Spanish',
          type: 'array',
          of: [{ type: 'block' }], // Simular como texto
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'block' }],
        }, // Simular como texto
      ],
    },
    {
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'isExternalLink',
      title: 'Is this an external link?',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }: any) => !parent?.isExternalLink, // Mostrar solo si isExternalLink es true
    },
    {
      name: 'internalLinkRef',
      title: 'Internal Link (reference to content)',
      type: 'reference',
      to: [
        // Puede enlazar a cualquiera de estos tipos
        { type: 'artist' },
        { type: 'exhibition' },
        { type: 'fair' },
        // { type: 'artwork' }, // No hay página de detalle de artwork
        // { type: 'news' }, // Para enlazar a otra noticia si tuviera sentido (ej. un seguimiento)
      ],
      hidden: ({ parent }: any) => parent?.isExternalLink, // Mostrar solo si isExternalLink es false
    },
    // Referencias temáticas opcionales para filtrado o contexto
    {
      name: 'relatedArtists',
      title: 'Related Artists',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
    },
    {
      name: 'relatedArtworks',
      title: 'Related Artworks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }], // Aunque no hay página de obra, se puede referenciar para mostrar info
    },
    {
      name: 'relatedExhibitions',
      title: 'Related Exhibitions',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'exhibition' }] }],
    },
    {
      name: 'relatedFairs',
      title: 'Related Fairs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'fair' }] }],
    },
    {
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
            {
              name: 'thumbnail',
              title: 'Thumbnail',
              type: 'image',
              options: { hotspot: true },
            },
          ],
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  orderings: [
    {
      title: 'Publication Date, Newest',
      name: 'publicationDateDesc',
      by: [{ field: 'publicationDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title.es',
      subtitle: 'summary.es',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle,
        media,
      }
    },
  },
}
