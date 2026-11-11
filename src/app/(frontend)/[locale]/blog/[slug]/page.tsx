import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft, EyeOff, Pencil } from 'lucide-react'
import { BlogRahmen } from '@/components/blog/BlogRahmen'
import { BeitragLoeschen, Kommentare } from '@/components/blog/Kommentare'
import { BLOG, fuelle } from '@/i18n/inhalte/blog'
import { lokalisierterPfad, spracheAusParams, type SprachCode } from '@/i18n/sprachen'
import { bildUrl, blogKontext } from '@/lib/blog/server'
import type { BlogBilder, BlogThema } from '@/payload-types'

export const dynamic = 'force-dynamic'

type Params = Promise<{ locale: string; slug: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const t = BLOG[await spracheAusParams(params)].meta
  return { title: t.titel, robots: { index: false } }
}

// ID aus einer Beziehung lesen, egal ob Payload sie aufgelöst hat oder nicht
const idVon = (wert: unknown) =>
  wert && typeof wert === 'object'
    ? (wert as { id: string }).id
    : (wert as string | null | undefined)

export default async function BlogBeitrag({ params }: { params: Params }) {
  const sprache: SprachCode = await spracheAusParams(params)
  const { slug } = await params
  const t = BLOG[sprache]
  const pfad = (p: string) => lokalisierterPfad(p, sprache)!
  const { payload, user } = await blogKontext()

  // Ohne Login zur Anmeldung, danach geht es direkt zu diesem Beitrag zurück
  if (!user)
    redirect(`${pfad('/blog/anmelden')}?weiter=${encodeURIComponent(pfad(`/blog/${slug}`))}`)

  const { docs } = await payload.find({
    collection: 'blog-beitraege',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    locale: sprache,
    user,
    overrideAccess: false,
  })
  const beitrag = docs[0]
  if (!beitrag) notFound()

  const istTeam = user.collection === 'users'
  const istEigen = user.collection === 'mitglieder' && idVon(beitrag.autor) === user.id
  const thema = typeof beitrag.thema === 'object' ? (beitrag.thema as BlogThema) : null
  const titelbild = bildUrl(beitrag.titelbild, 'gross')
  const galerie = (beitrag.galerie ?? []).filter(
    (b): b is BlogBilder => typeof b === 'object' && !!b?.url,
  )
  const datum = new Intl.DateTimeFormat(sprache, { day: 'numeric', month: 'long', year: 'numeric' })
  // Leerzeile im Text = neuer Absatz
  const absaetze = beitrag.inhalt.split(/\n\s*\n/).filter((a) => a.trim())

  const kommentare = await payload.find({
    collection: 'blog-kommentare',
    where: { beitrag: { equals: beitrag.id }, status: { equals: 'sichtbar' } },
    sort: 'createdAt',
    limit: 200,
    depth: 0,
    user,
    overrideAccess: false,
  })

  return (
    <BlogRahmen sprache={sprache} nutzerName={user.name || user.email} kompakt>
      <article>
        {/* Kopf: Titelbild über die volle Breite, Thema und Titel darüber gelegt */}
        <header className="relative flex min-h-[22rem] items-end overflow-hidden bg-[#1a252d] md:min-h-[30rem]">
          {titelbild && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={titelbild} alt="" className="absolute inset-0 size-full! object-cover" />
          )}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-4xl px-4 pt-24 pb-10 md:px-8">
            <Link
              href={pfad('/blog')}
              className="mb-6 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-zinc-300 hover:text-yellow-400"
            >
              <ArrowLeft className="size-4" aria-hidden /> {t.beitrag.zurueck}
            </Link>
            {thema && (
              <p className="m-0">
                <Link
                  href={`${pfad('/blog')}?thema=${thema.slug}`}
                  className="rounded-full bg-yellow-500 px-3 py-0.5 font-sans text-xs uppercase tracking-[0.2em] text-zinc-900 hover:bg-yellow-400"
                >
                  {thema.titel}
                </Link>
              </p>
            )}
            <h1 className="headingA m-0 mt-4 text-4xl leading-tight font-normal! text-white md:text-6xl">
              {beitrag.titel}
            </h1>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 md:px-8">
          <p className="m-0 font-sans text-sm text-zinc-400">
            <span className="text-zinc-100">{beitrag.autorName}</span> ·{' '}
            {datum.format(new Date(beitrag.createdAt))} ·{' '}
            {fuelle(t.uebersicht.minuten, { n: beitrag.lesezeit ?? 1 })}
            {beitrag.bearbeitetAm && (
              <>
                {' '}
                ·{' '}
                {fuelle(t.beitrag.bearbeitet, {
                  datum: datum.format(new Date(beitrag.bearbeitetAm)),
                })}
              </>
            )}
          </p>

          {beitrag.status === 'ausgeblendet' && (
            <p className="mt-4 flex items-center gap-2 rounded-lg border border-orange-500/40 bg-orange-950/40 p-3 font-sans text-sm text-orange-200">
              <EyeOff className="size-4 shrink-0" aria-hidden /> {t.beitrag.ausgeblendet}
            </p>
          )}

          <p className="mt-8 font-sans text-xl leading-relaxed font-semibold text-zinc-100">
            {beitrag.einleitung}
          </p>

          <div className="mt-6 space-y-5 font-sans text-lg leading-relaxed text-zinc-300">
            {absaetze.map((a, i) => (
              <p key={i} className="m-0 whitespace-pre-line">
                {a}
              </p>
            ))}
          </div>

          {galerie.length > 0 && (
            <section className="mt-12" aria-labelledby="galerie-titel">
              <h2 id="galerie-titel" className="headingB m-0 text-2xl text-yellow-400">
                {t.beitrag.galerie}
              </h2>
              <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
                {galerie.map((b) => (
                  <a
                    key={b.id}
                    href={b.url!}
                    target="_blank"
                    rel="noopener"
                    title={t.beitrag.bildOeffnen}
                    className="block overflow-hidden rounded-xl border border-zinc-800 hover:border-yellow-500/60"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={bildUrl(b, 'karte')!}
                      alt={b.alt || ''}
                      loading="lazy"
                      className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </a>
                ))}
              </div>
            </section>
          )}

          {!!beitrag.schlagwoerter?.length && (
            <ul className="mt-10 flex flex-wrap gap-2" aria-label={t.beitrag.schlagwoerter}>
              {beitrag.schlagwoerter.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-zinc-700 px-3 py-0.5 font-sans text-sm text-zinc-400"
                >
                  #{s}
                </li>
              ))}
            </ul>
          )}

          {(istEigen || istTeam) && (
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={pfad(`/blog/${beitrag.slug}/bearbeiten`)}
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-600 px-4 py-1.5 font-sans text-sm text-zinc-200 hover:border-yellow-500 hover:text-yellow-400"
              >
                <Pencil className="size-4" aria-hidden />
                {t.beitrag.bearbeiten}
              </Link>
              <BeitragLoeschen beitragId={beitrag.id} />
            </div>
          )}

          <Kommentare
            beitragId={beitrag.id}
            kommentare={kommentare.docs.map((k) => ({
              id: k.id,
              text: k.text,
              autorName: k.autorName || '–',
              datum: datum.format(new Date(k.createdAt)),
              loeschbar:
                istTeam || (user.collection === 'mitglieder' && idVon(k.autor) === user.id),
            }))}
          />
        </div>
      </article>
    </BlogRahmen>
  )
}
