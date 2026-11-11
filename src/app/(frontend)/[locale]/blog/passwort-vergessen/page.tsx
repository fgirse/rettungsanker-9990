import type { Metadata } from 'next'
import { BlogRahmen } from '@/components/blog/BlogRahmen'
import { PasswortVergessenFormular } from '@/components/blog/KontoFormulare'
import { BLOG } from '@/i18n/inhalte/blog'
import { spracheAusParams, type SprachParams } from '@/i18n/sprachen'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: SprachParams }): Promise<Metadata> {
  const t = BLOG[await spracheAusParams(params)]
  return { title: `${t.konto.vergessenTitel} – ${t.meta.titel}`, robots: { index: false } }
}

export default async function Seite({ params }: { params: SprachParams }) {
  const sprache = await spracheAusParams(params)

  return (
    <BlogRahmen sprache={sprache}>
      <PasswortVergessenFormular />
    </BlogRahmen>
  )
}
