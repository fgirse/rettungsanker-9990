import type { CollectionConfig } from 'payload'
import { autorFelder, statusFeld } from './BlogBeitraege'
import {
  anlegenAngemeldet,
  autorUndStatusSichern,
  lesenSichtbarOderEigen,
  nurEigeneOderTeam,
} from './zugriff'

export const BlogKommentare: CollectionConfig = {
  slug: 'blog-kommentare',
  labels: { singular: 'Kommentar', plural: 'Kommentare' },
  admin: {
    useAsTitle: 'text',
    group: 'Blog',
    defaultColumns: ['text', 'autorName', 'beitrag', 'status', 'createdAt'],
  },
  defaultSort: 'createdAt',
  access: {
    read: lesenSichtbarOderEigen,
    create: anlegenAngemeldet,
    update: nurEigeneOderTeam,
    delete: nurEigeneOderTeam,
  },
  hooks: {
    beforeChange: [
      ({ data, operation, originalDoc, req }) => {
        autorUndStatusSichern({ data, operation, originalDoc, req })
        // Ein Kommentar bleibt bei seinem Beitrag
        if (operation === 'update' && originalDoc) data.beitrag = originalDoc.beitrag
        return data
      },
    ],
  },
  fields: [
    {
      name: 'beitrag',
      type: 'relationship',
      relationTo: 'blog-beitraege',
      required: true,
      index: true,
    },
    { name: 'text', type: 'textarea', required: true, maxLength: 2000 },
    statusFeld,
    ...autorFelder,
  ],
}
