import type { CollectionConfig } from 'payload'

export const BentoGrid: CollectionConfig = {
  slug: 'bentogrid',

  fields: [
    {
      name: 'image_biere',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'title_biere',
      localized: true,
      type: 'text',
      required: true,
    },

    {
      name: 'content_biere',
      localized: true,
      type: 'richText',
      required: true,
    },
    {
      name: 'image_weine',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title_weine',
      localized: true,
      type: 'text',
      required: true,
    },

    {
      name: 'content_weine',
      localized: true,
      type: 'richText',
      required: true,
    },
    {
      name: 'image_cocktails',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title_cocktails',
      localized: true,
      type: 'text',
      required: true,
    },

    {
      name: 'content_cocktails',
      localized: true,
      type: 'richText',
      required: true,
    },
    {
      name: 'image_fussball',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'title_fussball',
      localized: true,
      type: 'text',
      required: true,
    },

    {
      name: 'content_fussball',
      localized: true,
      type: 'richText',
      required: true,
    },
    {
      name: 'image_events',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title_events',
      localized: true,
      type: 'text',
      required: true,
    },

    {
      name: 'content_events',
      localized: true,
      type: 'richText',
      required: true,
    },
    {
      name: 'image_albers',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title_albers',
      localized: true,
      type: 'text',
      required: true,
    },

    {
      name: 'content_albers',
      localized: true,
      type: 'richText',
      required: true,
    },
    {
      name: 'image_logoNeu',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'title_logoNeu',
      localized: true,
      type: 'text',
      required: true,
    },

    {
      name: 'content_logoNeu',
      localized: true,
      type: 'richText',
      required: true,
    },
  ],
}
