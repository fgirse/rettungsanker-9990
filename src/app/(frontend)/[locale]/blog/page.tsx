import type { Metadata } from 'next'
import Link from 'next/link'
import { Anchor } from 'lucide-react'
import { BlogRahmen } from '@/components/blog/BlogRahmen'
import { Gesperrt } from '@/components/blog/Gesperrt'
import { BLOG, fuelle } from '@/i18n/inhalte/blog'
import { lokalisierterPfad, spracheAusParams, type SprachParams } from '@/i18n/sprachen'
import { bildUrl, blogKontext } from '@/lib/blog/server'
import type { BlogThema } from '@/payload-types'
import type { Where } from 'payload'

// Inhalte hängen vom Login ab, daher bei jedem Aufruf frisch vom Server
export const dynamic = 'force-dynamic'

const PRO_SEITE = 12

export async function generateMetadata({ params }: { params: SprachParams }): Promise<Metadata> {
  const t = BLOG[await spracheAusParams(params)].meta
  // Nur für Mitglieder – Suchmaschinen sollen die (leere) Sperrseite nicht aufnehmen
  return { title: t.titel, description: t.beschreibung, robots: { index: false } }
}

export default async function BlogUebersicht({
  params,
  searchParams,
}: {
  params: SprachParams
  searchParams: Promise<{ thema?: string; seite?: string }>
}) {
  const sprache = await spracheAusParams(params)
  const t = BLOG[sprache]
  const { payload, user } = await blogKontext()

  if (!user) {
    return (
      <BlogRahmen sprache={sprache}>
        <Gesperrt sprache={sprache} />
      </BlogRahmen>
    )
  }

  const { thema: themaSlug, seite } = await searchParams
  const themen = await payload.find({
    collection: 'blog-themen',
    locale: sprache,
    sort: 'reihenfolge',
    limit: 50,
    depth: 0,
    user,
    overrideAccess: false,
  })
  const aktiv = themen.docs.find((th) => th.slug === themaSlug)

  const where: Where = { status: { equals: 'sichtbar' } }
  if (aktiv) where.thema = { equals: aktiv.id }

  const beitraege = await payload.find({
    collection: 'blog-beitraege',
    where,
    sort: '-createdAt',
    limit: PRO_SEITE,
    page: Math.max(1, Number(seite) || 1),
    depth: 1,
    locale: sprache,
    user,
    overrideAccess: false,
  })

  const pfad = (p: string) => lokalisierterPfad(p, sprache)!
  const filterLink = (slug?: string, s?: number) => {
    const q = new URLSearchParams()
    if (slug) q.set('thema', slug)
    if (s && s > 1) q.set('seite', String(s))
    const qs = q.toString()
    return pfad('/blog') + (qs ? `?${qs}` : '')
  }
  const datum = new Intl.DateTimeFormat(sprache, { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <BlogRahmen sprache={sprache} nutzerName={user.name || user.email}>
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        {/* Themen-Filter */}
        <nav aria-label="Themen" className="flex flex-wrap gap-2">
          {[{ slug: undefined, titel: t.uebersicht.alle }, ...themen.docs].map((th) => {
            const istAktiv = (th.slug ?? undefined) === aktiv?.slug
            return (
              <Link
                key={th.slug ?? 'alle'}
                href={filterLink(th.slug)}
                aria-current={istAktiv ? 'page' : undefined}
                className={`rounded-full border px-4 py-1 font-sans text-sm transition-colors ${
                  istAktiv
                    ? 'border-yellow-500 bg-yellow-500 text-zinc-900'
                    : 'border-zinc-700 text-zinc-300 hover:border-yellow-500 hover:text-yellow-400'
                }`}
              >
                {th.titel}
              </Link>
            )
          })}
        </nav>
        {aktiv?.beschreibung && (
          <p className="mt-4 font-sans text-sm text-zinc-400">{aktiv.beschreibung}</p>
        )}

        {beitraege.docs.length === 0 ? (
          <p className="mt-16 text-center font-sans text-zinc-400">{t.uebersicht.leer}</p>
        ) : (
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {beitraege.docs.map((b) => {
              const bild = bildUrl(b.titelbild, 'karte')
              const thema = typeof b.thema === 'object' ? (b.thema as BlogThema) : null
              return (
                <li key={b.id}>
                  <Link
                    href={pfad(`/blog/${b.slug}`)}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 transition-colors hover:border-yellow-500/60"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#1a252d]">
                      {bild ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={bild}
                          alt=""
                          loading="lazy"
                          className="size-full! object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <Anchor className="size-14 text-yellow-500/30" aria-hidden />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      {thema && (
                        <p className="m-0 font-sans text-xs uppercase tracking-[0.2em] text-yellow-500">
                          {thema.titel}
                        </p>
                      )}
                      <h2 className="m-0 mt-2 font-mono text-xl leading-snug text-zinc-100 group-hover:text-yellow-400">
                        {b.titel}
                      </h2>
                      <p className="mt-3 line-clamp-3 flex-1 font-sans text-sm text-zinc-400">
                        {b.einleitung}
                      </p>
                      <p className="m-0 mt-4 font-sans text-xs text-zinc-500">
                        {b.autorName} · {datum.format(new Date(b.createdAt))} ·{' '}
                        {fuelle(t.uebersicht.minuten, { n: b.lesezeit ?? 1 })}
                      </p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}

        {/* Blättern, wenn es mehr als eine Seite gibt */}
        {beitraege.totalPages > 1 && (
          <div className="mt-10 flex justify-between font-sans text-sm">
            {beitraege.hasPrevPage ? (
              <Link
                href={filterLink(aktiv?.slug, beitraege.prevPage!)}
                className="text-yellow-400 hover:underline"
              >
                ← {t.uebersicht.neuere}
              </Link>
            ) : (
              <span />
            )}
            {beitraege.hasNextPage && (
              <Link
                href={filterLink(aktiv?.slug, beitraege.nextPage!)}
                className="text-yellow-400 hover:underline"
              >
                {t.uebersicht.aeltere} →
              </Link>
            )}
          </div>
        )}
      </div>
    </BlogRahmen>
  )
}
