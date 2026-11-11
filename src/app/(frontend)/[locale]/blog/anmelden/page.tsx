import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { BlogRahmen } from '@/components/blog/BlogRahmen'
import { AnmeldenFormular } from '@/components/blog/KontoFormulare'
import { BLOG } from '@/i18n/inhalte/blog'
import { lokalisierterPfad, spracheAusParams, type SprachParams } from '@/i18n/sprachen'
import { blogKontext } from '@/lib/blog/server'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: SprachParams }): Promise<Metadata> {
  const t = BLOG[await spracheAusParams(params)]
  return { title: `${t.konto.anmeldenTitel} – ${t.meta.titel}`, robots: { index: false } }
}

export default async function Seite({
  params,
  searchParams,
}: {
  params: SprachParams
  searchParams: Promise<{ weiter?: string }>
}) {
  const sprache = await spracheAusParams(params)
  const query = await searchParams
  // Wer schon angemeldet ist, braucht diese Seite nicht
  const { user } = await blogKontext()
  if (user) redirect(lokalisierterPfad('/blog', sprache)!)
  return (
    <BlogRahmen sprache={sprache}>
      <AnmeldenFormular weiter={query.weiter} />
    </BlogRahmen>
  )
}
