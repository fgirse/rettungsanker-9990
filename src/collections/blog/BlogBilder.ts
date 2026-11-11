import path from 'path'
import { APIError, type CollectionConfig } from 'payload'
import { anlegenAngemeldet, istAngemeldet, istMitglied, istTeam } from './zugriff'

// Höchstgröße pro Bild. Vercel nimmt pro Anfrage maximal 4,5 MB an;
// das Formular verkleinert große Fotos vorher, damit sie hier durchpassen.
const MAX_BYTES = 4 * 1024 * 1024

// SVG ist Text und könnte Skripte enthalten. Solche Dateien lehnen wir ab,
// damit ein hochgeladenes Bild beim direkten Öffnen keinen Code ausführt.
const GEFAEHRLICH_IM_SVG =
  /<script|<foreignObject|<iframe|<embed|<object|\son[a-z]+\s*=|javascript:|data:text\/html/i

// Fotos und Grafiken in Blogbeiträgen. Nur angemeldete Mitglieder sehen sie.
export const BlogBilder: CollectionConfig = {
  slug: 'blog-bilder',
  labels: { singular: 'Blog-Bild', plural: 'Blog-Bilder' },
  admin: { group: 'Blog', defaultColumns: ['filename', 'alt', 'hochgeladenVon', 'createdAt'] },
  access: {
    read: ({ req }) => istAngemeldet(req),
    create: anlegenAngemeldet,
    update: ({ req }) =>
      istTeam(req) ? true : istMitglied(req) ? { hochgeladenVon: { equals: req.user!.id } } : false,
    delete: ({ req }) =>
      istTeam(req) ? true : istMitglied(req) ? { hochgeladenVon: { equals: req.user!.id } } : false,
  },
  upload: {
    staticDir: path.resolve(process.cwd(), 'media/blog'),
    mimeTypes: ['image/jpeg', 'image/png', 'image/svg+xml'],
    // Kleinere Fassungen für Kacheln und Beitragskopf, damit nicht immer das Original lädt
    imageSizes: [
      { name: 'karte', width: 800, withoutEnlargement: true },
      { name: 'gross', width: 1800, withoutEnlargement: true },
    ],
  },
  hooks: {
    beforeValidate: [
      ({ req, data, operation }) => {
        const datei = req.file
        if (datei) {
          if (datei.size > MAX_BYTES) throw new APIError('Bild zu groß', 413, undefined, true)
          if (
            datei.mimetype === 'image/svg+xml' &&
            GEFAEHRLICH_IM_SVG.test(datei.data.toString('utf8'))
          ) {
            throw new APIError('SVG enthält unzulässige Inhalte', 400, undefined, true)
          }
        }
        // Hochlader serverseitig festhalten, nicht vom Browser übernehmen
        if (operation === 'create' && data) {
          data.hochgeladenVon = istMitglied(req) ? req.user!.id : undefined
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'alt', label: 'Bildbeschreibung', type: 'text', maxLength: 200 },
    {
      name: 'hochgeladenVon',
      type: 'relationship',
      relationTo: 'mitglieder',
      admin: { readOnly: true, position: 'sidebar' },
    },
  ],
}
