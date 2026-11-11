/**
 * Legt die fünf Startthemen des Blogs in allen Sprachen an.
 * Bereits vorhandene Themen (gleicher slug) werden nur aktualisiert, nicht doppelt angelegt.
 * Aufruf: bun run blog:themen
 */
import { getPayload } from 'payload'
import config from '../src/payload.config.js'
import { START_THEMEN } from '../src/i18n/inhalte/blog.js'
import { SPRACH_CODES } from '../src/i18n/sprachen.js'

const payload = await getPayload({ config })

for (const [i, thema] of START_THEMEN.entries()) {
  const { docs } = await payload.find({
    collection: 'blog-themen',
    where: { slug: { equals: thema.slug } },
    limit: 1,
  })

  // Zuerst Deutsch anlegen bzw. aktualisieren, danach die Übersetzungen je Sprache
  const doc = docs[0]
    ? await payload.update({
        collection: 'blog-themen',
        id: docs[0].id,
        locale: 'de',
        data: { titel: thema.titel.de, beschreibung: thema.beschreibung.de },
      })
    : await payload.create({
        collection: 'blog-themen',
        locale: 'de',
        data: {
          slug: thema.slug,
          titel: thema.titel.de,
          beschreibung: thema.beschreibung.de,
          reihenfolge: (i + 1) * 10,
        },
      })

  for (const sprache of SPRACH_CODES.filter((s) => s !== 'de')) {
    await payload.update({
      collection: 'blog-themen',
      id: doc.id,
      locale: sprache,
      data: { titel: thema.titel[sprache], beschreibung: thema.beschreibung[sprache] },
    })
  }
  console.log(`${docs[0] ? 'Aktualisiert' : 'Angelegt'}: ${thema.titel.de}`)
}

process.exit(0)
