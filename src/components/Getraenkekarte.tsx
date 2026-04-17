'use client'

import React, { useRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────────────────

export type Kategorie =
  | 'biere'
  | 'weine'
  | 'cocktails-longdrinks'
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

// ── Hand-drawn SVG Illustrations ──────────────────────────────────────────────

const BeerMugSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 110 130" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Foam top */}
    <path
      d="M20 44 C24 22 36 27 46 19 C56 12 66 26 76 18 C84 12 92 30 88 44"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      fill="currentColor" fillOpacity="0.25"
    />
    {/* Mug body */}
    <path
      d="M20 46 L17 118 L88 120 L85 44"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      fill="currentColor" fillOpacity="0.08"
    />
    {/* Handle */}
    <path
      d="M85 60 C108 56 111 95 86 97"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
    />
    {/* Handle inner */}
    <path
      d="M85 70 C98 68 100 88 86 88"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeOpacity="0.4"
    />
    {/* Bubbles */}
    <circle cx="44" cy="76" r="4.5" stroke="currentColor" strokeWidth="1.5" fillOpacity="0" />
    <circle cx="63" cy="94" r="3" stroke="currentColor" strokeWidth="1.5" fillOpacity="0" />
    <circle cx="48" cy="106" r="2.5" stroke="currentColor" strokeWidth="1.5" fillOpacity="0" />
    <circle cx="68" cy="72" r="2" stroke="currentColor" strokeWidth="1.5" fillOpacity="0" />
    <circle cx="36" cy="96" r="2" stroke="currentColor" strokeWidth="1.2" fillOpacity="0" />
  </svg>
)

const WineGlassSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 140" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Bowl */}
    <path
      d="M18 14 C16 48 20 76 50 80 C80 76 84 48 82 14 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      fill="currentColor" fillOpacity="0.08"
    />
    {/* Wine level */}
    <path
      d="M22 52 C30 72 70 72 78 52"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
      fill="currentColor" fillOpacity="0.3"
    />
    {/* Filled wine */}
    <path
      d="M22 54 C24 76 40 80 50 80 C60 80 76 76 78 54 C70 72 30 72 22 54 Z"
      fill="currentColor" fillOpacity="0.22" stroke="none"
    />
    {/* Stem */}
    <line x1="50" y1="80" x2="50" y2="116" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Base */}
    <path
      d="M28 116 C30 122 70 122 72 116"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    />
    {/* Shine */}
    <path
      d="M28 30 C30 22 36 18 40 20"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"
    />
  </svg>
)

const CocktailSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 110 150" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Glass */}
    <path
      d="M14 16 L36 90 L74 90 L96 16 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      fill="currentColor" fillOpacity="0.08"
    />
    {/* Liquid */}
    <path
      d="M26 56 L37 90 L73 90 L84 56 Z"
      fill="currentColor" fillOpacity="0.28" stroke="none"
    />
    {/* Liquid top edge */}
    <line x1="26" y1="56" x2="84" y2="56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
    {/* Stem */}
    <line x1="55" y1="90" x2="55" y2="122" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Base */}
    <path
      d="M36 122 C38 128 72 128 74 122"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
    />
    {/* Straw */}
    <line x1="68" y1="14" x2="80" y2="92" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    {/* Umbrella top */}
    <path
      d="M54 18 C57 6 74 6 78 18 Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      fill="currentColor" fillOpacity="0.4"
    />
    {/* Umbrella handle */}
    <path d="M66 18 L66 26 C66 28 68 28 68 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    {/* Ice cube */}
    <rect
      x="34" y="64" width="14" height="12" rx="2"
      stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.18"
      transform="rotate(-8 41 70)"
    />
  </svg>
)

const SodaSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 90 140" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Cup body */}
    <path
      d="M14 36 L20 122 L70 122 L76 36 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      fill="currentColor" fillOpacity="0.08"
    />
    {/* Lid */}
    <path
      d="M11 34 C13 26 77 26 79 34 L76 38 L14 38 Z"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      fill="currentColor" fillOpacity="0.2"
    />
    {/* Straw hole bump */}
    <ellipse cx="60" cy="30" rx="5" ry="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
    {/* Straw */}
    <line x1="60" y1="6" x2="62" y2="32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    {/* Straw stripe */}
    <line x1="60" y1="10" x2="62" y2="18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />
    <line x1="60" y1="20" x2="62" y2="28" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeOpacity="0.4" />
    {/* Bubbles */}
    <circle cx="34" cy="68" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="52" cy="84" r="3" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="38" cy="96" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="58" cy="64" r="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="44" cy="108" r="2" stroke="currentColor" strokeWidth="1.2" />
    {/* Brand swoosh */}
    <path
      d="M26 80 C38 76 52 82 64 77"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.35"
    />
  </svg>
)

const CoffeeCupSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 132" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Steam 1 */}
    <path d="M34 56 C32 46 38 40 36 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Steam 2 */}
    <path d="M54 52 C52 42 58 36 56 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Steam 3 */}
    <path d="M74 56 C72 46 78 40 76 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Saucer */}
    <ellipse cx="55" cy="116" rx="44" ry="9" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
    {/* Cup */}
    <path
      d="M18 70 L24 106 L86 106 L92 70 Z"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      fill="currentColor" fillOpacity="0.08"
    />
    {/* Top rim ellipse */}
    <ellipse cx="55" cy="70" rx="37" ry="6" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.18" />
    {/* Handle */}
    <path
      d="M86 78 C108 74 110 100 87 100"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"
    />
  </svg>
)

const SnacksSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 130 120" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    {/* Plate */}
    <ellipse cx="65" cy="98" rx="52" ry="12" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.1" />
    <path d="M13 96 C13 72 117 72 117 96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Pretzel left loop */}
    <path
      d="M48 82 C40 68 44 54 54 58 C60 61 60 72 56 76 C50 82 38 78 38 68 C38 58 48 50 58 54 C68 58 70 72 66 80 C62 88 52 90 46 84"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
    />
    {/* Salt dots on pretzel */}
    <circle cx="50" cy="64" r="1.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="58" cy="60" r="1.5" fill="currentColor" fillOpacity="0.6" />
    <circle cx="46" cy="74" r="1.5" fill="currentColor" fillOpacity="0.6" />
    {/* Small snack bowl */}
    <path d="M80 78 C80 68 106 68 106 78 L104 90 L82 90 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
    {/* Chips / snack bits */}
    <ellipse cx="88" cy="72" rx="5" ry="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" transform="rotate(-15 88 72)" />
    <ellipse cx="98" cy="70" rx="5" ry="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" transform="rotate(10 98 70)" />
    <ellipse cx="93" cy="66" rx="4" ry="3" stroke="currentColor" strokeWidth="1.5" fill="currentColor" fillOpacity="0.2" transform="rotate(-5 93 66)" />
  </svg>
)

// ── Category Config ────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    id: 'biere' as Kategorie,
    label: 'Biere',
    emoji: '🍺',
    tagline: 'Frisch gezapft & eiskalt',
    colorClass: 'text-amber-400',
    sectionBg: 'bg-gradient-to-br from-amber-950/70 via-amber-900/40 to-slate-900/80',
    borderColor: 'border-amber-500/30',
    badgeClass: 'bg-amber-500/15 text-amber-300 border border-amber-500/25',
    priceColor: 'text-amber-400',
    dotColor: 'bg-amber-500',
    illustrationColor: 'text-amber-400',
    Illustration: BeerMugSVG,
    rotation: '-rotate-1',
    headerPattern: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(245,158,11,0.04) 8px, rgba(245,158,11,0.04) 9px)',
  },
  {
    id: 'weine' as Kategorie,
    label: 'Weine',
    emoji: '🍷',
    tagline: 'Regional & handverlesen',
    colorClass: 'text-rose-400',
    sectionBg: 'bg-gradient-to-br from-rose-950/70 via-rose-900/40 to-slate-900/80',
    borderColor: 'border-rose-500/30',
    badgeClass: 'bg-rose-500/15 text-rose-300 border border-rose-500/25',
    priceColor: 'text-rose-400',
    dotColor: 'bg-rose-500',
    illustrationColor: 'text-rose-400',
    Illustration: WineGlassSVG,
    rotation: 'rotate-1',
    headerPattern: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(244,63,94,0.04) 8px, rgba(244,63,94,0.04) 9px)',
  },
  {
    id: 'cocktails-longdrinks' as Kategorie,
    label: 'Cocktails & Longdrinks',
    emoji: '🍹',
    tagline: 'Gemixt mit Liebe & einer Prise Wahnsinn',
    colorClass: 'text-fuchsia-400',
    sectionBg: 'bg-gradient-to-br from-fuchsia-950/70 via-purple-900/40 to-slate-900/80',
    borderColor: 'border-fuchsia-500/30',
    badgeClass: 'bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/25',
    priceColor: 'text-fuchsia-400',
    dotColor: 'bg-fuchsia-500',
    illustrationColor: 'text-fuchsia-400',
    Illustration: CocktailSVG,
    rotation: '-rotate-1',
    headerPattern: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(217,70,239,0.04) 8px, rgba(217,70,239,0.04) 9px)',
  },
  {
    id: 'softdrinks' as Kategorie,
    label: 'Softdrinks',
    emoji: '🥤',
    tagline: 'Cool bleiben!',
    colorClass: 'text-cyan-400',
    sectionBg: 'bg-gradient-to-br from-cyan-950/70 via-blue-900/40 to-slate-900/80',
    borderColor: 'border-cyan-500/30',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/25',
    priceColor: 'text-cyan-400',
    dotColor: 'bg-cyan-500',
    illustrationColor: 'text-cyan-400',
    Illustration: SodaSVG,
    rotation: 'rotate-1',
    headerPattern: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(34,211,238,0.04) 8px, rgba(34,211,238,0.04) 9px)',
  },
  {
    id: 'kaffee-tee' as Kategorie,
    label: 'Kaffee & Tee',
    emoji: '☕',
    tagline: 'Warm ums Herz',
    colorClass: 'text-orange-400',
    sectionBg: 'bg-gradient-to-br from-orange-950/70 via-amber-900/40 to-slate-900/80',
    borderColor: 'border-orange-500/30',
    badgeClass: 'bg-orange-500/15 text-orange-300 border border-orange-500/25',
    priceColor: 'text-orange-400',
    dotColor: 'bg-orange-500',
    illustrationColor: 'text-orange-400',
    Illustration: CoffeeCupSVG,
    rotation: '-rotate-1',
    headerPattern: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(251,146,60,0.04) 8px, rgba(251,146,60,0.04) 9px)',
  },
  {
    id: 'snacks' as Kategorie,
    label: 'Snacks',
    emoji: '🥨',
    tagline: 'Klein aber oho',
    colorClass: 'text-lime-400',
    sectionBg: 'bg-gradient-to-br from-lime-950/70 via-green-900/40 to-slate-900/80',
    borderColor: 'border-lime-500/30',
    badgeClass: 'bg-lime-500/15 text-lime-300 border border-lime-500/25',
    priceColor: 'text-lime-400',
    dotColor: 'bg-lime-500',
    illustrationColor: 'text-lime-400',
    Illustration: SnacksSVG,
    rotation: 'rotate-1',
    headerPattern: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(163,230,53,0.04) 8px, rgba(163,230,53,0.04) 9px)',
  },
] as const

// ── Static values hoisted outside component (rendering-hoist-jsx) ─────────────

const FONT_STYLE: React.CSSProperties = {
  fontFamily: 'var(--font-sans, "Architects Daughter", cursive)',
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function GetraenkekarteComponent({ items }: { items: MenuItem[] }) {
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  const byCategory = CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = items
        .filter((item) => item.kategorie === cat.id)
        .sort((a, b) => (a.sortierung ?? 99) - (b.sortierung ?? 99))
      return acc
    },
    {} as Record<Kategorie, MenuItem[]>,
  )

  const scrollTo = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      className="min-h-screen text-white"
      style={FONT_STYLE}
    >
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-slate-950">
        {/* Chalk-grid background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative container mx-auto px-4 py-20 text-center">
          {/* Wobbly title badge */}
          <div className="inline-block mb-6 px-6 py-2 rounded-full border border-white/10 bg-white/5 text-sm tracking-widest text-gray-400 uppercase">
            Rettungsanker Freiburg
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-6 bg-linear-to-br from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            Getränke&shy;karte
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-xl mx-auto mb-10">
            Was darf&apos;s sein? Wir haben für jeden Durst das Richtige.
          </p>

          {/* Category quick-links */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg ${cat.badgeClass} cursor-pointer`}
              >
                <span className="mr-1.5">{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Category Nav ───────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/5 shadow-xl">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollTo(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all duration-150 hover:bg-white/10 cursor-pointer ${cat.colorClass}`}
              >
                <span>{cat.emoji}</span>
                <span className="hidden sm:inline">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Category Sections ─────────────────────────────────────────────────── */}
      <div className="bg-slate-950">
        {CATEGORIES.map((cat, catIndex) => {
          const catItems = byCategory[cat.id] ?? []
          const { Illustration } = cat
          const isEven = catIndex % 2 === 0

          return (
            <section
              key={cat.id}
              id={`cat-${cat.id}`}
              ref={(el) => {
                sectionRefs.current[cat.id] = el
              }}
              className={`relative overflow-hidden ${cat.sectionBg} border-b border-white/5`}
            >
              {/* Subtle diagonal pattern overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: cat.headerPattern }}
              />

              <div className="relative container mx-auto px-4 py-14 lg:py-20">
                {/* Section header */}
                <div
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 mb-12`}
                >
                  {/* Illustration circle */}
                  <div
                    className={`shrink-0 w-36 h-36 lg:w-44 lg:h-44 rounded-full flex items-center justify-center ${cat.illustrationColor} border-2 ${cat.borderColor} bg-black/20 shadow-2xl ${cat.rotation}`}
                    style={{ filter: 'drop-shadow(0 0 24px currentColor)' }}
                  >
                    <Illustration className="w-20 h-20 lg:w-28 lg:h-28" />
                  </div>

                  {/* Title block */}
                  <div className={`text-center ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                    <div
                      className={`inline-block text-xs tracking-widest uppercase mb-2 ${cat.badgeClass} px-3 py-1 rounded-full`}
                    >
                      {cat.emoji} Unsere Auswahl
                    </div>
                    <h2
                      className={`text-4xl md:text-5xl lg:text-6xl font-bold ${cat.colorClass} leading-tight`}
                    >
                      {cat.label}
                    </h2>
                    <p className="text-gray-400 mt-2 text-lg italic">{cat.tagline}</p>
                  </div>
                </div>

                {/* Items */}
                {catItems.length === 0 ? (
                  <div className="text-center py-16">
                    <p className="text-gray-600 text-xl italic">
                      Demnächst verfügbar — schau bald wieder vorbei! {cat.emoji}
                    </p>
                  </div>
                ) : (
                  <div className="max-w-3xl mx-auto space-y-3">
                    {catItems.map((item, i) => (
                      <div
                        key={item.id}
                        className={`group relative flex items-start gap-4 p-4 md:p-5 rounded-xl border ${cat.borderColor} bg-black/20 hover:bg-black/35 transition-all duration-200 hover:-translate-y-0.5`}
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        {/* Left dot / index */}
                        <div className={`shrink-0 w-2 h-2 rounded-full mt-2 ${cat.dotColor} opacity-70`} />

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <h3 className="text-lg md:text-xl font-bold text-white leading-tight">
                              {item.artikel}
                            </h3>
                            {item.volumen && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${cat.badgeClass}`}
                              >
                                {item.volumen}
                              </span>
                            )}
                          </div>
                          {item.beschreibung && (
                            <p className="text-gray-400 text-sm mt-1 leading-relaxed italic">
                              {item.beschreibung}
                            </p>
                          )}
                        </div>

                        {/* Price */}
                        <div className="shrink-0 text-right">
                          <div className={`text-2xl md:text-3xl font-bold ${cat.priceColor} leading-none`}>
                            {item.preis}
                          </div>
                          <div className="text-gray-500 text-xs mt-0.5">€</div>
                        </div>

                        {/* Hover accent line */}
                        <div
                          className={`absolute inset-y-0 left-0 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${cat.dotColor}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )
        })}
      </div>

      {/* ── Footer Note ───────────────────────────────────────────────────────── */}
      <div className="bg-slate-950 py-12 text-center border-t border-white/5">
        <p className="text-gray-500 text-sm">
          Alle Preise inkl. MwSt. · Weitere Specials auf Anfrage!
        </p>
        <p className="text-gray-700 text-xs mt-2 italic">
          Prost 🍻 — Der Rettungsanker, Freiburg
        </p>
      </div>
    </div>
  )
}
