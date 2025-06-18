// Schema: residency
export default {
  name: 'residency',
  title: 'Residency',
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'object',
      fields: [
        {
          name: 'es',
          title: 'Spanish',
          type: 'string',
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
        },
      ],
    },
    {
      name: 'mainImage',
      title: 'Main Image / Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        {
          name: 'es',
          title: 'Spanish',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule: any) => Rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title.es',
      media: 'mainImage',
    },
    prepare(selection: any) {
      const { title, media } = selection
      return {
        title: title,
        media: media,
      }
    },
  },
}
