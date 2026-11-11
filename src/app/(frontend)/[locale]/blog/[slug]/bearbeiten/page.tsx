import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { BlogRahmen } from '@/components/blog/BlogRahmen'
import { BeitragFormular } from '@/components/blog/BeitragFormular'
import { BLOG } from '@/i18n/inhalte/blog'
import { lokalisierterPfad, spracheAusParams } from '@/i18n/sprachen'
import { bildUrl, blogKontext } from '@/lib/blog/server'
import type { BlogBilder } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Params = Promise<{ locale: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const t = BLOG[await spracheAusParams(params)]
  return { title: `${t.formular.titelBearbeiten} – ${t.meta.titel}`, robots: { index: false } }
}

const idVon = (wert: unknown) =>
  wert && typeof wert === 'object'
    ? (wert as { id: string }).id
    : (wert as string | null | undefined)

// Gespeichertes Bild fürs Formular: ID behalten, kleine Fassung als Vorschau
const alsVorschau = (b: unknown) =>
  b && typeof b === 'object' ? { id: (b as BlogBilder).id, url: bildUrl(b, 'karte') ?? '' } : null

// Bearbeiten-Seite: nur der Autor (oder das Team) darf hierher
export default async function BeitragBearbeiten({ params }: { params: Params }) {
  const sprache = await spracheAusParams(params)
  const { slug } = await params
  const pfad = (p: string) => lokalisierterPfad(p, sprache)!
  const { payload, user } = await blogKontext()
  if (!user) {
    redirect(
      `${pfad('/blog/anmelden')}?weiter=${encodeURIComponent(pfad(`/blog/${slug}/bearbeiten`))}`,
    )
  }

  const { docs } = await payload.find({
    collection: 'blog-beitraege',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    user,
    overrideAccess: false,
  })
  const beitrag = docs[0]
  if (!beitrag) notFound()

  const darf =
    user.collection === 'users' ||
    (user.collection === 'mitglieder' && idVon(beitrag.autor) === user.id)
  // Fremde Beiträge: zurück zur Leseansicht statt Formular
  if (!darf) redirect(pfad(`/blog/${slug}`))

  const themen = await payload.find({
    collection: 'blog-themen',
    locale: sprache,
    sort: 'reihenfolge',
    limit: 50,
    depth: 0,
    user,
    overrideAccess: false,
  })

  return (
    <BlogRahmen sprache={sprache} nutzerName={user.name || user.email} kompakt>
      <BeitragFormular
        themen={themen.docs.map((th) => ({ id: th.id, titel: th.titel }))}
        vorlage={{
          id: beitrag.id,
          slug: beitrag.slug ?? slug,
          titel: beitrag.titel,
          thema: idVon(beitrag.thema) ?? '',
          einleitung: beitrag.einleitung,
          inhalt: beitrag.inhalt,
          schlagwoerter: beitrag.schlagwoerter ?? [],
          titelbild: alsVorschau(beitrag.titelbild),
          galerie: (beitrag.galerie ?? []).flatMap((b) => {
            const v = alsVorschau(b)
            return v ? [v] : []
          }),
        }}
      />
    </BlogRahmen>
  )
}
