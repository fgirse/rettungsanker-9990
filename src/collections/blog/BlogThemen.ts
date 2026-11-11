import type { CollectionConfig } from 'payload'
import { istAngemeldet, nurTeam } from './zugriff'

// Themen, unter denen Mitglieder schreiben. Pflegt nur das Team.
export const BlogThemen: CollectionConfig = {
  slug: 'blog-themen',
  labels: { singular: 'Blog-Thema', plural: 'Blog-Themen' },
  typescript: { interface: 'BlogThema' },
  admin: {
    useAsTitle: 'titel',
    group: 'Blog',
    defaultColumns: ['titel', 'slug', 'reihenfolge'],
  },
  defaultSort: 'reihenfolge',
  access: {
    read: ({ req }) => istAngemeldet(req),
    create: nurTeam,
    update: nurTeam,
    delete: nurTeam,
  },
  fields: [
    { name: 'titel', type: 'text', required: true, localized: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar', description: 'Kurzname für die Adresse, z. B. sc-freiburg' },
    },
    { name: 'beschreibung', type: 'textarea', localized: true },
    {
      name: 'reihenfolge',
      type: 'number',
      defaultValue: 10,
      admin: { position: 'sidebar', description: 'Kleinere Zahl = weiter vorn im Filter' },
    },
  ],
}
