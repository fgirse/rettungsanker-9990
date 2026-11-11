import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { BlogRahmen } from '@/components/blog/BlogRahmen'
import { BeitragFormular } from '@/components/blog/BeitragFormular'
import { BLOG } from '@/i18n/inhalte/blog'
import { lokalisierterPfad, spracheAusParams, type SprachParams } from '@/i18n/sprachen'
import { blogKontext } from '@/lib/blog/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: SprachParams }): Promise<Metadata> {
  const t = BLOG[await spracheAusParams(params)]
  return { title: `${t.formular.titel} – ${t.meta.titel}`, robots: { index: false } }
}

// Seite „Beitrag schreiben“: nur für Angemeldete, Themen kommen in der Sprache der Seite
export default async function NeuerBeitrag({ params }: { params: SprachParams }) {
  const sprache = await spracheAusParams(params)
  const pfad = (p: string) => lokalisierterPfad(p, sprache)!
  const { payload, user } = await blogKontext()
  if (!user) redirect(`${pfad('/blog/anmelden')}?weiter=${encodeURIComponent(pfad('/blog/neu'))}`)

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
      <BeitragFormular themen={themen.docs.map((th) => ({ id: th.id, titel: th.titel }))} />
    </BlogRahmen>
  )
}
