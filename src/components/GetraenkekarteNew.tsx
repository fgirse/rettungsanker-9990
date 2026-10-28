'use client'

import React, { useMemo, useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'

// Einheitliche, einfarbige Illustrationen von game-icons.net (CC BY 3.0, Namensnennung im Impressum)
import img01 from '../../public/Assets/Svg/getraenke/01_beer-stein.svg'
import img02 from '../../public/Assets/Svg/getraenke/02_beer-bottle.svg'
import img03 from '../../public/Assets/Svg/getraenke/03_wine-bottle.svg'
import img04 from '../../public/Assets/Svg/getraenke/04_martini.svg'
import img05 from '../../public/Assets/Svg/getraenke/05_brandy-bottle.svg'
import img06 from '../../public/Assets/Svg/getraenke/06_soda-bottle.svg'
import img07 from '../../public/Assets/Svg/getraenke/07_coffee-cup.svg'
import img08 from '../../public/Assets/Svg/getraenke/08_pretzel.svg'

import LogoNeu from '../../public/Assets/Img/LogoNeu.png'
import AnkerIcon from './AnkerIcon'
import { useSprache } from '@/i18n/SprachProvider'
import { lokalisierterPfad } from '@/i18n/sprachen'
import { GETRAENKE } from '@/i18n/inhalte/getraenke'

// ── Types ─────────────────────────────────────────────────────────────────────

export type Kategorie =
  | 'biere_vom_fass'
  | 'biere_in_flaschen'
  | 'weine'
  | 'cocktails-longdrinks'
  | 'kurze-brände'
  | 'softdrinks'
  | 'kaffee-tee'
  | 'snacks'

export interface MenuItem {
  id: string
  kategorie: Kategorie
  artikel: string
  beschreibung?: string | null
  volumen?: string | null
  preis: string
  sortierung?: number | null
}

// ── Category definitions ──────────────────────────────────────────────────────

interface CategoryDef {
  id: Kategorie
  label: string
  emoji: string
  tagline: string
  image: StaticImageData
  accent: string // Tailwind text colour
  bg: string // section background gradient
  border: string // Tailwind border colour
  dot: string // Tailwind bg colour for dot
  badge: string // badge classes
  headerGlow: string // inline radial glow colour for hero image
}

// Farben wechseln nur zwischen Bernstein und Gelb, passend zu Logo und Grafiken.
// Name und Untertitel jeder Rubrik stehen übersetzt in GETRAENKE.kategorien.
const CATEGORIES: Omit<CategoryDef, 'label' | 'tagline'>[] = [
  {
    id: 'biere_vom_fass',
    emoji: '🍺',
    image: img01,
    accent: 'text-amber-400',
    bg: 'bg-linear-to-br from-amber-950/60 via-yellow-900/30 to-slate-950',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
    headerGlow: 'rgba(245,158,11,0.25)',
  },
  {
    id: 'biere_in_flaschen',
    emoji: '🍻',
    image: img02,
    accent: 'text-yellow-400',
    bg: 'bg-linear-to-br from-yellow-900/60 via-yellow-800/30 to-slate-950',
    border: 'border-yellow-500/30',
    dot: 'bg-yellow-400',
    badge: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/25',
    headerGlow: 'rgba(234,179,8,0.25)',
  },
  {
    id: 'weine',
    emoji: '🍷',
    image: img03,
    accent: 'text-amber-400',
    bg: 'bg-linear-to-br from-amber-950/60 via-yellow-900/30 to-slate-950',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
    headerGlow: 'rgba(245,158,11,0.25)',
  },
  {
    id: 'cocktails-longdrinks',
    emoji: '🍹',
    image: img04,
    accent: 'text-yellow-400',
    bg: 'bg-linear-to-br from-yellow-900/60 via-yellow-800/30 to-slate-950',
    border: 'border-yellow-500/30',
    dot: 'bg-yellow-400',
    badge: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/25',
    headerGlow: 'rgba(234,179,8,0.25)',
  },
  {
    id: 'kurze-brände',
    emoji: '🥃',
    image: img05,
    accent: 'text-amber-400',
    bg: 'bg-linear-to-br from-amber-950/60 via-yellow-900/30 to-slate-950',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
    headerGlow: 'rgba(245,158,11,0.25)',
  },
  {
    id: 'softdrinks',
    emoji: '🥤',
    image: img06,
    accent: 'text-yellow-400',
    bg: 'bg-linear-to-br from-yellow-900/60 via-yellow-800/30 to-slate-950',
    border: 'border-yellow-500/30',
    dot: 'bg-yellow-400',
    badge: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/25',
    headerGlow: 'rgba(234,179,8,0.25)',
  },
  {
    id: 'kaffee-tee',
    emoji: '☕',
    image: img07,
    accent: 'text-amber-400',
    bg: 'bg-linear-to-br from-amber-950/60 via-yellow-900/30 to-slate-950',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
    headerGlow: 'rgba(245,158,11,0.25)',
  },
  {
    id: 'snacks',
    emoji: '🥨',
    image: img08,
    accent: 'text-yellow-400',
    bg: 'bg-linear-to-br from-yellow-900/60 via-yellow-800/30 to-slate-950',
    border: 'border-yellow-500/30',
    dot: 'bg-yellow-400',
    badge: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/25',
    headerGlow: 'rgba(234,179,8,0.25)',
  },
]

// Rubriken mit Name und Untertitel in der aktuellen Sprache
function useKategorien(): CategoryDef[] {
  const t = GETRAENKE[useSprache().sprache]
  return CATEGORIES.map((cat) => ({ ...cat, ...t.kategorien[cat.id] }))
}

// ── Sticky nav with active highlight ─────────────────────────────────────────

function StickyNav({
  activeId,
  onSelect,
}: {
  activeId: Kategorie
  onSelect: (id: Kategorie) => void
}) {
  const kategorien = useKategorien()
  return (
    <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-white/8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3">
        {/* Tailwind hat keine eingebaute scrollbar-none-Klasse, daher per Arbitrary Property */}
        <div className="flex overflow-x-auto gap-0.5 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {kategorien.map((cat) => {
            const isActive = activeId === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelect(cat.id)}
                aria-label={cat.label}
                aria-pressed={isActive}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap
                  transition-all duration-200 shrink-0 cursor-pointer font-medium
                  ${
                    isActive
                      ? `${cat.accent} bg-white/10`
                      : 'text-slate-400 hover:text-white hover:bg-white/6'
                  }
                `}
              >
                <Image
                  src={cat.image}
                  alt=""
                  width={24}
                  height={24}
                  className="object-contain"
                />
                {/* Auf Mobile reicht das Bild, der Name kommt ab sm dazu */}
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

// ── Single item row ───────────────────────────────────────────────────────────

function ItemRow({ item, cat }: { item: MenuItem; cat: CategoryDef }) {
  return (
    <div
      className={`
        group relative flex items-start gap-3 px-4 py-3 md:px-5 md:py-3
        border-b last:border-b-0 ${cat.border} bg-black/10
        hover:bg-black/25 transition-colors duration-150
      `}
    >
      {/* accent dot */}
      <span className={`shrink-0 w-1.5 h-1.5 rounded-full mt-2 ${cat.dot} opacity-60`} />

      {/* name + meta */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-white font-semibold text-sm leading-snug">{item.artikel}</span>
          {item.volumen && (
            <span className={`text-xs font-medium ${cat.badge} px-1.5 py-px rounded-full`}>
              {item.volumen}
            </span>
          )}
        </div>
        {item.beschreibung && (
          <p className="text-slate-400 text-xs mt-0.5 leading-relaxed italic">
            {item.beschreibung}
          </p>
        )}
      </div>

      {/* price */}
      {/* whitespace-nowrap hält Betrag und € in einer Zeile */}
      <div className="shrink-0 whitespace-nowrap text-right">
        <span className={`font-bold text-base md:text-lg ${cat.accent} leading-none`}>
          {item.preis}
        </span>
        <span className="ml-1 text-slate-500 text-xs">€</span>
      </div>

      {/* hover left bar */}
      <div
        className={`absolute inset-y-0 left-0 w-0.5 rounded-r-full ${cat.dot} opacity-0 group-hover:opacity-70 transition-opacity`}
      />
    </div>
  )
}

// ── Category section ──────────────────────────────────────────────────────────

function CategorySection({ cat, items }: { cat: CategoryDef; items: MenuItem[] }) {
  const t = GETRAENKE[useSprache().sprache]
  return (
    <section
      id={`cat-${cat.id}`}
      className={`relative overflow-hidden border-b border-white/5 ${cat.bg}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Header: illustration + title side by side */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          {/* Illustration */}
          <div
            className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-white/10 bg-[#1a252d] p-5 shadow-2xl"
            style={{ boxShadow: `0 0 40px 0 ${cat.headerGlow}` }}
          >
            <Image
              src={cat.image}
              alt={cat.label}
              width={160}
              height={160}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Title block */}
          <div className="text-center sm:text-left">
            <p
              className={`text-xs tracking-widest uppercase font-semibold mb-1 ${cat.accent} opacity-70`}
            >
              {cat.emoji} {t.auswahl}
            </p>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-bold ${cat.accent} leading-tight`}
            >
              {cat.label}
            </h2>
            <p className="text-slate-400 mt-2 text-sm md:text-base italic">{cat.tagline}</p>
          </div>
        </div>

        {/* Item list */}
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 italic">
              {t.demnaechst} {cat.emoji}
            </p>
          </div>
        ) : (
          <div
            className={`rounded-2xl overflow-hidden border ${cat.border}`}
            style={{ background: 'rgba(0,0,0,0.25)' }}
          >
            {items.map((item) => (
              <ItemRow key={item.id} item={item} cat={cat} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ── Nav grid (hero) ───────────────────────────────────────────────────────────

function CategoryNavGrid({ onSelect }: { onSelect: (id: Kategorie) => void }) {
  const kategorien = useKategorien()
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-7xl mx-auto px-4 pb-10">
      {kategorien.map((cat) => (
        <button
          key={cat.id}
          type="button"
          onClick={() => onSelect(cat.id)}
          className={`
            group flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer
            border ${cat.border} bg-white/4 hover:bg-white/8
            transition-all duration-200 hover:scale-105 hover:shadow-lg
          `}
        >
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-white/10 bg-[#1a252d] p-2.5 shadow-lg"
            style={{ boxShadow: `0 4px 20px 0 ${cat.headerGlow}` }}
          >
            <Image
              src={cat.image}
              alt=""
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
          <span
            className={`text-xs font-semibold text-center leading-tight ${cat.accent} group-hover:opacity-100 opacity-80`}
          >
            {cat.label}
          </span>
        </button>
      ))}
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function GetraenkekarteNew({ items }: { items: MenuItem[] }) {
  const [activeId, setActiveId] = useState<Kategorie>(CATEGORIES[0].id)
  const t = GETRAENKE[useSprache().sprache]
  const kategorien = useKategorien()

  const activeCat = kategorien.find((c) => c.id === activeId)!

  // Group items by category, sorted by sortierung
  const byCategory = useMemo(
    () =>
      CATEGORIES.reduce<Partial<Record<Kategorie, MenuItem[]>>>((acc, cat) => {
        acc[cat.id] = items
          .filter((item) => item.kategorie === cat.id)
          .sort((a, b) => (a.sortierung ?? 99) - (b.sortierung ?? 99))
        return acc
      }, {}),
    [items],
  )

  const handleSelect = (id: Kategorie) => {
    setActiveId(id)
    // Erst nach dem Rendern der neuen Kategorie zum Abschnitt scrollen
    setTimeout(() => {
      document
        .getElementById('getraenkekarte-section')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <div id="section-getraenkekarte" className="bg-slate-950 text-white font-sans">
      {/* ── Hero header ──────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-950 pt-16 pb-10">
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <header className="relative overflow-hidden pt-10 pb-8 px-4">
          {/* Background glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% -10%, oklch(0.78 0.18 75 / 0.12) 0%, transparent 70%)',
            }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Anchor + Logo row */}
            <div className="flex items-center justify-center gap-3 mb-3">
              <Image src={LogoNeu} alt="" className="w-7 h-7" />
              <span
                className="text-sm tracking-[0.25em] uppercase font-sans"
                style={{ color: 'oklch(0.6 0.02 80)' }}
              >
                Rettungsanker Freiburg
              </span>
              <Image src={LogoNeu} alt="" className="w-7 h-7" />
            </div>

            {/* Main title – Mindestgröße so klein, dass die breite Schrift auch auf schmalen Handys ganz sichtbar bleibt */}
            <h1
              className="headingA text-yellow-500"
              style={{ fontSize: 'clamp(1.5rem, 9vw, 6rem)', lineHeight: 1.05 }}
            >
              {t.titel}
            </h1>

            {/* Subtitle */}
            <p
              className="mt-2 text-base md:text-lg font-sans"
              style={{ color: 'oklch(0.6 0.02 80)' }}
            >
              {t.untertitel}
            </p>

            {/* Gold divider */}
            <div className="gold-divider mt-5 max-w-xs mx-auto">
              <AnkerIcon className="w-4 h-4 shrink-0" />
            </div>
          </div>
        </header>

        {/* Category navigation grid */}
        <CategoryNavGrid onSelect={handleSelect} />
      </div>

      {/* ── Sticky nav bar ───────────────────────────────────────────────────── */}
      <StickyNav activeId={activeId} onSelect={handleSelect} />

      {/* ── Active section only ───────────────────────────────────────────────── */}
      {/* scroll-mt verhindert, dass die Sticky-Nav den Abschnittsanfang verdeckt */}
      <div id="getraenkekarte-section" className="scroll-mt-14">
        <CategorySection key={activeId} cat={activeCat} items={byCategory[activeId] ?? []} />
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <div className="bg-slate-950 py-10 text-center border-t border-white/5">
        <p className="text-slate-500 text-sm">
          {t.preiseSpecials}
        </p>
        <p className="text-slate-700 text-xs mt-1 italic">{t.prost}</p>
      </div>
    </div>
  )
}

// ── Einzelne Rubrik als eigene Seite (z. B. /weine, /cocktails) ───────────────

// Nutzt dieselbe Darstellung wie die Getränkekarte, damit beide Seiten gleich aussehen
// und die Einträge nur an einer Stelle im CMS gepflegt werden.
export function KategorieSeite({ kategorie, items }: { kategorie: Kategorie; items: MenuItem[] }) {
  const { sprache } = useSprache()
  const t = GETRAENKE[sprache]
  const cat = useKategorien().find((c) => c.id === kategorie)!
  const sorted = [...items].sort((a, b) => (a.sortierung ?? 99) - (b.sortierung ?? 99))

  return (
    <div className="bg-slate-950 text-white font-sans min-h-screen">
      <CategorySection cat={cat} items={sorted} />
      <div className="bg-slate-950 py-10 text-center border-t border-white/5">
        <Link
          href={lokalisierterPfad('/getraenkekarte', sprache)!}
          className="inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-yellow-400"
        >
          {t.ganzeKarte}
        </Link>
        <p className="text-slate-500 text-sm mt-6">{t.preise}</p>
      </div>
    </div>
  )
}
