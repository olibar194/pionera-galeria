export default {
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "portraitImage",
      title: "Portrait Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "birthYear",
      title: "Birth Year",
      type: "number",
    },
    {
      name: "country",
      title: "Country",
      type: "string",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "bio",
      title: "Biography",
      type: "object",
      fields: [
        {
          name: "es",
          title: "Spanish",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
    {
      name: "statement",
      title: "Artist Statement",
      type: "object",
      fields: [
        {
          name: "es",
          title: "Spanish",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "en",
          title: "English",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
    {
      name: "portfolio",
      title: "Portfolio PDF",
      type: "file",
      options: {
        accept: ".pdf",
      },
    },
    {
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Alternative Text",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
            {
              name: "thumbnail",
              title: "Thumbnail",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: "featured",
      title: "Featured Artist",
      type: "boolean",
      description: "Show this artist on the homepage",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "portraitImage",
    },
  },
}
