import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Marquee } from './collections/Marquee'
import { About } from './collections/About'
import { BentoGrid } from './collections/BentoGrid'
import { Getraenkekarte } from './collections/Getraenkekarte'

import { GeneralSettings } from '@/globals/general-settings/config'
import { Navigation } from '@/globals/navigation/config'
import { ProductOfTheMonth } from '@/globals/product-of-the-month/config'
import { Partners } from '@/globals/partners/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, Marquee, About, BentoGrid, Getraenkekarte],
  globals: [GeneralSettings, Navigation, ProductOfTheMonth, Partners],
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
  sharp,
  plugins: [],
})
