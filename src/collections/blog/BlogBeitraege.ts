import type { CollectionConfig } from 'payload'
import slugify from 'slugify'
import {
  anlegenAngemeldet,
  autorUndStatusSichern,
  lesenSichtbarOderEigen,
  istMitglied,
  nurEigeneOderTeam,
} from './zugriff'

// Status-Feld gibt es in Beiträgen und Kommentaren: neue Einträge sind sofort sichtbar,
// das Team kann sie im Admin ausblenden.
export const statusFeld = {
  name: 'status',
  type: 'select' as const,
  required: true,
  defaultValue: 'sichtbar',
  options: [
    { label: 'Sichtbar', value: 'sichtbar' },
    { label: 'Ausgeblendet', value: 'ausgeblendet' },
  ],
  admin: { position: 'sidebar' as const },
}

export const autorFelder = [
  {
    name: 'autor',
    type: 'relationship' as const,
    relationTo: 'mitglieder' as const,
    admin: { readOnly: true, position: 'sidebar' as const },
  },
  // Name zum Zeitpunkt des Schreibens: so können andere Mitglieder ihn sehen,
  // ohne Zugriff auf das Konto (und die E-Mail-Adresse) des Autors zu bekommen
  {
    name: 'autorName',
    label: 'Autor (Name)',
    type: 'text' as const,
    admin: { readOnly: true, position: 'sidebar' as const },
  },
]

export const BlogBeitraege: CollectionConfig = {
  slug: 'blog-beitraege',
  labels: { singular: 'Blogbeitrag', plural: 'Blogbeiträge' },
  admin: {
    useAsTitle: 'titel',
    group: 'Blog',
    defaultColumns: ['titel', 'autorName', 'thema', 'status', 'createdAt'],
  },
  defaultSort: '-createdAt',
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
        // „bearbeitet am“ nur, wenn der Autor selbst ändert – nicht wenn das Team ausblendet
        if (operation === 'update') {
          data.bearbeitetAm = istMitglied(req)
            ? new Date().toISOString()
            : originalDoc?.bearbeitetAm
        }
        // Adresse einmalig aus dem Titel bilden; der Zufallsteil verhindert doppelte Adressen
        if (operation === 'create') {
          const basis = slugify(String(data.titel || 'beitrag'), {
            lower: true,
            strict: true,
          }).slice(0, 60)
          data.slug = `${basis || 'beitrag'}-${Math.random().toString(36).slice(2, 7)}`
        } else if (originalDoc?.slug) {
          data.slug = originalDoc.slug
        }
        // Lesezeit: rund 200 Wörter pro Minute
        // Fehlt ein Feld in der Anfrage (z. B. Team ändert nur den Status), den gespeicherten Text nehmen
        const einleitung = data.einleitung ?? originalDoc?.einleitung ?? ''
        const inhalt = data.inhalt ?? originalDoc?.inhalt ?? ''
        const woerter = `${einleitung} ${inhalt}`.trim().split(/\s+/).length
        data.lesezeit = Math.max(1, Math.round(woerter / 200))
        return data
      },
    ],
    // Mit dem Beitrag verschwinden auch seine Kommentare und Bilder, sonst bleiben Waisen zurück
    afterDelete: [
      async ({ doc, req }) => {
        await req.payload.delete({
          collection: 'blog-kommentare',
          where: { beitrag: { equals: doc.id } },
          req,
        })
        const idVon = (b: unknown) =>
          b && typeof b === 'object' ? (b as { id: string }).id : (b as string)
        const bilder = [doc.titelbild, ...(doc.galerie ?? [])].map(idVon).filter(Boolean)
        if (bilder.length) {
          await req.payload.delete({
            collection: 'blog-bilder',
            where: { id: { in: bilder } },
            req,
          })
        }
      },
    ],
  },
  fields: [
    { name: 'titel', type: 'text', required: true, maxLength: 120 },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: { readOnly: true, position: 'sidebar' },
    },
    { name: 'thema', type: 'relationship', relationTo: 'blog-themen', required: true },
    {
      name: 'einleitung',
      type: 'textarea',
      required: true,
      maxLength: 400,
      admin: { description: 'Kurzer Anreißer, erscheint auch in der Übersicht' },
    },
    { name: 'titelbild', type: 'upload', relationTo: 'blog-bilder' },
    {
      name: 'inhalt',
      type: 'textarea',
      required: true,
      maxLength: 20000,
      admin: { description: 'Leerzeile = neuer Absatz' },
    },
    { name: 'galerie', type: 'upload', relationTo: 'blog-bilder', hasMany: true, maxRows: 12 },
    {
      name: 'schlagwoerter',
      label: 'Schlagwörter',
      type: 'text',
      hasMany: true,
      maxRows: 8,
      maxLength: 30,
    },
    {
      name: 'lesezeit',
      label: 'Lesezeit (Min.)',
      type: 'number',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'bearbeitetAm',
      label: 'Zuletzt vom Autor bearbeitet',
      type: 'date',
      admin: { readOnly: true, position: 'sidebar' },
    },
    statusFeld,
    ...autorFelder,
  ],
}
