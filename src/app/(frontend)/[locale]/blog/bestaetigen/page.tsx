import type { Metadata } from 'next'
import { BlogRahmen } from '@/components/blog/BlogRahmen'
import { Bestaetigen } from '@/components/blog/KontoFormulare'
import { BLOG } from '@/i18n/inhalte/blog'
import { spracheAusParams, type SprachParams } from '@/i18n/sprachen'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: SprachParams }): Promise<Metadata> {
  const t = BLOG[await spracheAusParams(params)]
  return { title: `${t.konto.bestaetigenTitel} – ${t.meta.titel}`, robots: { index: false } }
}

export default async function Seite({
  params,
  searchParams,
}: {
  params: SprachParams
  searchParams: Promise<{ token?: string }>
}) {
  const sprache = await spracheAusParams(params)
  const query = await searchParams

  return (
    <BlogRahmen sprache={sprache}>
      <Bestaetigen token={query.token ?? ''} />
    </BlogRahmen>
  )
}
