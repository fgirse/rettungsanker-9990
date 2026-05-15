'use client'

import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'

import img01 from '../../public/Assets/Img/01_fassbier.png'
import img02 from '../../public/Assets/Img/02_flaschenpost.png'
import img03 from '../../public/Assets/Img/03_weine.png'
import img04 from '../../public/Assets/Img/04_cocktails_longdrinks.png'
import img05 from '../../public/Assets/Img/05_kurze_braende.png'
import img06 from '../../public/Assets/Img/06_softdrinks.png'
import img07 from '../../public/Assets/Img/07_kaffee_tee.png'
import img08 from '../../public/Assets/Img/08_snacks.png'

import LogoNeu from '../../public/Assets/Img/LogoNeu.png'

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

const CATEGORIES: CategoryDef[] = [
  {
    id: 'biere_vom_fass',
    label: 'Biere vom Fass',
    emoji: '🍺',
    tagline: 'Frisch gezapft & nordisch herb',
    image: img01,
    accent: 'text-amber-400',
    bg: 'bg-gradient-to-br from-amber-950/60 via-yellow-900/30 to-slate-950',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
    badge: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
    headerGlow: 'rgba(245,158,11,0.25)',
  },
  {
    id: 'biere_in_flaschen',
    label: 'Flaschenpost',
    emoji: '🍻',
    tagline: 'Vielfältig & für jeden Geschmack',
    image: img02,
    accent: 'text-yellow-400',
    bg: 'bg-gradient-to-br from-yellow-900/60 via-yellow-800/30 to-slate-950',
    border: 'border-yellow-500/30',
    dot: 'bg-yellow-400',
    badge: 'bg-yellow-500/15 text-yellow-300 border border-yellow-500/25',
    headerGlow: 'rgba(234,179,8,0.25)',
  },
  {
    id: 'weine',
    label: 'Weine',
    emoji: '🍷',
    tagline: 'Regional & handverlesen',
    image: img03,
    accent: 'text-rose-400',
    bg: 'bg-gradient-to-br from-rose-950/60 via-rose-900/30 to-slate-950',
    border: 'border-rose-500/30',
    dot: 'bg-rose-400',
    badge: 'bg-rose-500/15 text-rose-300 border border-rose-500/25',
    headerGlow: 'rgba(244,63,94,0.25)',
  },
  {
    id: 'cocktails-longdrinks',
    label: 'Cocktails & Longdrinks',
    emoji: '🍹',
    tagline: 'Gemixt mit Liebe & einer Prise Wahnsinn',
    image: img04,
    accent: 'text-fuchsia-400',
    bg: 'bg-gradient-to-br from-fuchsia-950/60 via-purple-900/30 to-slate-950',
    border: 'border-fuchsia-500/30',
    dot: 'bg-fuchsia-400',
    badge: 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/25',
    headerGlow: 'rgba(217,70,239,0.25)',
  },
  {
    id: 'kurze-brände',
    label: 'Kurze & Brände',
    emoji: '🥃',
    tagline: 'Elztal · Heinemann · Steiger',
    image: img05,
    accent: 'text-orange-400',
    bg: 'bg-gradient-to-br from-orange-950/60 via-amber-900/30 to-slate-950',
    border: 'border-orange-500/30',
    dot: 'bg-orange-400',
    badge: 'bg-orange-500/15 text-orange-300 border border-orange-500/25',
    headerGlow: 'rgba(251,146,60,0.25)',
  },
  {
    id: 'softdrinks',
    label: 'Softdrinks',
    emoji: '🥤',
    tagline: 'Cool bleiben!',
    image: img06,
    accent: 'text-cyan-400',
    bg: 'bg-gradient-to-br from-cyan-950/60 via-blue-900/30 to-slate-950',
    border: 'border-cyan-500/30',
    dot: 'bg-cyan-400',
    badge: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
    headerGlow: 'rgba(34,211,238,0.25)',
  },
  {
    id: 'kaffee-tee',
    label: 'Kaffee & Tee',
    emoji: '☕',
    tagline: 'Warm ums Herz',
    image: img07,
    accent: 'text-orange-300',
    bg: 'bg-gradient-to-br from-stone-900/80 via-amber-950/40 to-slate-950',
    border: 'border-orange-400/30',
    dot: 'bg-orange-300',
    badge: 'bg-orange-400/15 text-orange-200 border border-orange-400/25',
    headerGlow: 'rgba(253,186,116,0.25)',
  },
  {
    id: 'snacks',
    label: 'Snacks',
    emoji: '🥨',
    tagline: 'Klein aber oho',
    image: img08,
    accent: 'text-lime-400',
    bg: 'bg-gradient-to-br from-lime-950/60 via-green-900/30 to-slate-950',
    border: 'border-lime-500/30',
    dot: 'bg-lime-400',
    badge: 'bg-lime-500/15 text-lime-300 border border-lime-500/25',
    headerGlow: 'rgba(163,230,53,0.25)',
  },
]

// ── Sticky nav with active highlight ─────────────────────────────────────────

function StickyNav({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  return (
    <nav className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-white/8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-3">
        <div className="flex overflow-x-auto gap-0.5 py-1.5 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeId === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => onSelect(cat.id)}
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
                  alt={cat.label}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">{cat.emoji}</span>
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
      <div className="shrink-0 text-right">
        <span className={`font-bold text-base md:text-lg ${cat.accent} leading-none`}>
          {item.preis}
        </span>
        <span className="block text-slate-500 text-xs">€</span>
      </div>

      {/* hover left bar */}
      <div
        className={`absolute inset-y-0 left-0 w-0.5 rounded-r-full ${cat.dot} opacity-0 group-hover:opacity-70 transition-opacity`}
      />
    </div>
  )
}

// ── Category section ──────────────────────────────────────────────────────────

function CategorySection({
  cat,
  items,
  sectionRef,
}: {
  cat: CategoryDef
  items: MenuItem[]
  sectionRef: (el: HTMLElement | null) => void
}) {
  return (
    <section
      id={`cat-${cat.id}`}
      ref={sectionRef}
      className={`relative overflow-hidden border-b border-white/5 ${cat.bg}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        {/* Header: illustration + title side by side */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          {/* Illustration */}
          <div
            className="shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            style={{ boxShadow: `0 0 40px 0 ${cat.headerGlow}` }}
          >
            <Image
              src={cat.image}
              alt={cat.label}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Title block */}
          <div className="text-center sm:text-left">
            <p
              className={`text-xs tracking-widest uppercase font-semibold mb-1 ${cat.accent} opacity-70`}
            >
              {cat.emoji} Unsere Auswahl
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
              Demnächst verfügbar — schau bald wieder vorbei! {cat.emoji}
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

function CategoryNavGrid({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 max-w-7xl mx-auto px-4 pb-10">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`
            group flex flex-col items-center gap-2 p-3 rounded-2xl cursor-pointer
            border ${cat.border} bg-white/4 hover:bg-white/8
            transition-all duration-200 hover:scale-105 hover:shadow-lg
          `}
          style={{ boxShadow: `0 0 0 0 ${cat.headerGlow}` }}
        >
          <div
            className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden border border-white/10 shadow-lg"
            style={{ boxShadow: `0 4px 20px 0 ${cat.headerGlow}` }}
          >
            <Image
              src={cat.image}
              alt={cat.label}
              width={80}
              height={80}
              className="w-full h-full object-cover"
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
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].id)

  const activeCat = CATEGORIES.find((c) => c.id === activeId)!

  // Group items by category, sorted by sortierung
  const byCategory = React.useMemo(
    () =>
      CATEGORIES.reduce<Record<string, MenuItem[]>>((acc, cat) => {
        acc[cat.id] = items
          .filter((item) => item.kategorie === cat.id)
          .sort((a, b) => (a.sortierung ?? 99) - (b.sortierung ?? 99))
        return acc
      }, {}),
    [items],
  )

  const handleSelect = (id: string) => {
    setActiveId(id)
    // scroll to the section top after render
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
        {/* <div className="relative max-w-7xl mx-auto px-4 text-center mb-10">
          <p className="text-xs tracking-widest uppercase text-slate-500 mb-3">
            Rettungsanker Freiburg
          </p>
          <h1 className="headingA text-5xl sm:text-7xl lg:text-8xl font-black leading-none mb-4 bg-linear-to-br from-white via-yellow-400 to-amber-500 bg-clip-text text-transparent">
            Getränke&shy;karte
          </h1>
          <p className="text-slate-400 text-base md:text-lg max-w-md mx-auto">
            Was darf&apos;s sein? Wir haben für jeden Durst das Richtige.
          </p>
        </div>*/}
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
              <Image
                src={LogoNeu}
                alt="Logo Neu"
                className="w-7 h-7"
                style={{ color: 'oklch(0.78 0.18 75)' }}
              />
              <span
                className="font-oswald text-sm tracking-[0.25em] uppercase font-sans"
                style={{ color: 'oklch(0.6 0.02 80)' }}
              >
                Rettungsanker Freiburg
              </span>
              <Image
                src={LogoNeu}
                alt="Logo Neu"
                className="w-7 h-7"
                style={{ color: 'oklch(0.78 0.18 75)' }}
              />
            </div>

            {/* Main title */}
            <h1
              className="font-bangers text-gold-shimmer headingA text-yellow-600"
              style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: 1.05 }}
            >
              getränkekarte
            </h1>

            {/* Subtitle */}
            <p
              className="font-body mt-2 text-base md:text-lg font-sans"
              style={{ color: 'oklch(0.6 0.02 80)' }}
            >
              Was darf es sein? Wir haben für jeden Durst das Richtige.
            </p>

            {/* Gold divider */}
            <div className="gold-divider mt-5 max-w-xs mx-auto">
              <Image src="/Assets/Svg/ankerIcon.svg" alt="anchor" width={16} height={16} className="shrink-0" />
            </div>
          </div>
        </header>

        {/* Category navigation grid */}
        <CategoryNavGrid onSelect={handleSelect} />
      </div>

      {/* ── Sticky nav bar ───────────────────────────────────────────────────── */}
      <StickyNav activeId={activeId} onSelect={handleSelect} />

      {/* ── Active section only ───────────────────────────────────────────────── */}
      <div id="getraenkekarte-section">
        <CategorySection
          key={activeId}
          cat={activeCat}
          items={byCategory[activeId] ?? []}
          sectionRef={() => {}}
        />
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <div className="bg-slate-950 py-10 text-center border-t border-white/5">
        <p className="text-slate-500 text-sm">
          Alle Preise inkl. MwSt. · Weitere Specials auf Anfrage!
        </p>
        <p className="text-slate-700 text-xs mt-1 italic">Prost 🍻 — Der Rettungsanker, Freiburg</p>
      </div>
    </div>
  )
}
