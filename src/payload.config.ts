import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Marquee } from './collections/Marquee'
import { About } from './collections/About'
import { BentoGrid } from './collections/BentoGrid'
import { Getraenkekarte } from './collections/Getraenkekarte'
import { Mitglieder } from './collections/blog/Mitglieder'
import { BlogThemen } from './collections/blog/BlogThemen'
import { BlogBeitraege } from './collections/blog/BlogBeitraege'
import { BlogBilder } from './collections/blog/BlogBilder'
import { BlogKommentare } from './collections/blog/BlogKommentare'
import { teamStandard, teamStandardGlobal } from './collections/blog/zugriff'

import { GeneralSettings } from '@/globals/general-settings/config'
import { Navigation } from '@/globals/navigation/config'
import { ProductOfTheMonth } from '@/globals/product-of-the-month/config'
import { Partners } from '@/globals/partners/config'
import { contactMailEndpoint } from '@/endpoints/contact-mail'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default buildConfig({
  serverURL,
  cors: [serverURL, 'http://localhost:3000'],
  csrf: [serverURL, 'http://localhost:3000'],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    // Website-Inhalte: alles ohne eigene Regel darf nur das Team (nicht Blog-Mitglieder)
    ...[Users, Media, Pages, Marquee, About, BentoGrid, Getraenkekarte].map(teamStandard),
    // Blog: Mitglieder melden sich selbst an und schreiben Beiträge (siehe src/collections/blog)
    Mitglieder,
    BlogThemen,
    BlogBeitraege,
    BlogBilder,
    BlogKommentare,
  ],
  globals: [GeneralSettings, Navigation, ProductOfTheMonth, Partners].map(teamStandardGlobal),
  // Inhalte je Sprache pflegbar: nur Felder mit `localized: true` bekommen pro Sprache einen eigenen Wert.
  // fallback: fehlt eine Übersetzung, wird der deutsche Text angezeigt.
  localization: {
    locales: [
      { code: 'de', label: 'Deutsch' },
      { code: 'en', label: 'English' },
      { code: 'fr', label: 'Français' },
      { code: 'it', label: 'Italiano' },
      { code: 'ru', label: 'Русский' },
    ],
    defaultLocale: 'de',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  email: process.env.RESEND_API_KEY
    ? nodemailerAdapter({
        defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
        defaultFromName: 'Rettungsanker',
        transportOptions: {
          host: 'smtp.resend.com',
          port: 465,
          secure: true,
          auth: {
            user: 'resend',
            pass: process.env.RESEND_API_KEY,
          },
        },
      })
    : undefined,
  endpoints: [contactMailEndpoint],
  sharp,
  plugins: [
    // Uploads dauerhaft in Vercel Blob statt im lokalen Ordner media/ (auf Vercel nicht beschreibbar).
    // clientUploads: der Browser lädt direkt hoch, sonst scheitern Dateien über 4,5 MB am Funktionslimit.
    // Ohne Token (z. B. lokal ohne .env-Eintrag) schaltet sich das Plugin ab und es gilt wieder media/.
    vercelBlobStorage({
      // Blog-Bilder laufen über Payload (nicht direkt aus dem Blob), damit nur Angemeldete sie sehen
      collections: { media: true, 'blog-bilder': { prefix: 'blog' } },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
})
