'use client'

import React from 'react'
import Image from 'next/image'
import { Beer, Droplet, Waves } from 'lucide-react'
import { useSprache } from '@/i18n/SprachProvider'
import { SEITEN, type SeitenTexte } from '@/i18n/inhalte/seiten'

type BiereTexte = SeitenTexte['biere']

// art und beschreibung verweisen auf übersetzte Texte in SEITEN.biere;
// volume und price stehen mit deutschem Komma und werden für Englisch umgestellt
interface BeerItem {
  id: number
  name: string
  art: 'vomFass' | 'flasche' | 'gemischt'
  volume: string
  price: string
  beschreibung: keyof BiereTexte['beschreibungen']
  color: string
  logo: string
  isFromTap?: boolean
}

const beers: BeerItem[] = [
  {
    id: 1,
    name: 'Flensburger Pils',
    art: 'vomFass',
    volume: '0,5',
    price: '4,90',
    beschreibung: 'flensPils',
    color: 'from-amber-400 to-yellow-600',
    logo: '/Assets/Img/FLENS_SPORT_LOGO_WEISS_AUF_BLAU_500_1502-1-1024x307.webp',
    isFromTap: true,
  },
  {
    id: 2,
    name: 'Astra Bier',
    art: 'flasche',
    volume: '0,33',
    price: '4,50',
    beschreibung: 'astra',
    color: 'from-yellow-500 to-amber-500',
    logo: '/Assets/Img/Astra.webp',
  },
  {
    id: 3,
    name: 'Ganter Hefeweizen',
    art: 'vomFass',
    volume: '0,5',
    price: '4,90',
    beschreibung: 'ganter',
    color: 'from-orange-400 to-amber-600',
    logo: '/Assets/Img/vomFass3.png',
    isFromTap: true,
  },
  {
    id: 4,
    name: 'Radler',
    art: 'gemischt',
    volume: '0,5',
    price: '4,50',
    beschreibung: 'radler',
    color: 'from-lime-400 to-yellow-500',
    logo: '/Assets/Img/frisch-gezapftes-flens.webp',
  },
  {
    id: 5,
    name: 'Flensburger Dunkel',
    art: 'flasche',
    volume: '0,33',
    price: '4,90',
    beschreibung: 'flensDunkel',
    color: 'from-amber-700 to-amber-900',
    logo: '/Assets/Img/flensburger-dunkel.webp',
  },
]

const Biere = () => {
  const { sprache } = useSprache()
  const t = SEITEN[sprache].biere
  // Englisch schreibt Dezimalpunkt statt Komma
  const zahl = (wert: string) => (sprache === 'en' ? wert.replace(',', '.') : wert)
  return (
    <div className="min-h-screen font-sans bg-[url('/Assets/Svg/friesenland.svg')] bg-cover bg-center bg-no-repeat bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-yellow-500/10 to-amber-500/10" />
        <div className="container mx-auto px-4 py-16 lg:py-24 relative">
          <div className="text-center space-y-6">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Beer className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-500 animate-bounce" />
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-linear-to-r from-yellow-400 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                {t.titel}
              </h1>
              <Beer className="w-12 h-12 lg:w-16 lg:h-16 text-yellow-500 animate-bounce delay-150" />
            </div>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              {t.untertitel}
            </p>
          </div>
        </div>
      </div>

      {/* Beer Cards Grid */}
      <div className="container mx-auto px-4 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {beers.map((beer, index) => (
            <div
              key={beer.id}
              className="group relative bg-linear-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Tap Badge */}
              {beer.isFromTap && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-linear-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Droplet className="w-3 h-3" />
                    {t.vomFass}
                  </div>
                </div>
              )}

              {/* Color Header with Wave Effect */}
              <div className={`relative h-40 bg-linear-to-r ${beer.color} overflow-hidden`}>
                <div className="absolute inset-0 opacity-30">
                  <Waves className="w-full h-full text-white/20" />
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 gap-2">
                  {/* Brewery Logo */}
                  <div className="bg-white/95 rounded-lg p-2 shadow-xl backdrop-blur-sm">
                    <Image
                      src={beer.logo}
                      alt={`${beer.name} Logo`}
                      width={120}
                      height={60}
                      className="object-contain h-12 w-auto"
                    />
                  </div>
                  <Beer className="w-12 h-12 text-white/80 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Beer Name */}
                <div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-yellow-400 mb-1">
                    {beer.name}
                  </h3>
                  <p className="text-sm text-gray-400 italic">{t[beer.art]}</p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed min-h-20">
                  {t.beschreibungen[beer.beschreibung]}
                </p>

                {/* Volume and Price */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="bg-slate-700 rounded-lg px-3 py-2">
                      <p className="text-xs text-gray-400">{t.volumen}</p>
                      <p className="text-lg font-bold text-white">
                        {zahl(beer.volume)} {t.liter}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400 mb-1">{t.preis}</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold bg-linear-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        {zahl(beer.price)}
                      </span>
                      <span className="text-xl text-gray-400">€</span>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-500/50 rounded-2xl transition-colors duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center space-y-4">
          <div className="inline-block bg-linear-to-r from-slate-800 to-slate-700 rounded-xl p-6 shadow-xl">
            <p className="text-gray-300 text-lg mb-2">
              <span className="text-yellow-400 font-bold">{t.hinweis}</span> {t.preiseInkl}
            </p>
            <p className="text-gray-400 text-sm">
              {t.weitere}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-yellow-500/20">
              <p className="text-gray-300">
                <Beer className="inline w-5 h-5 mr-2 text-yellow-500" />
                {t.frischGezapft}
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-yellow-500/20">
              <p className="text-gray-300">
                <Droplet className="inline w-5 h-5 mr-2 text-blue-400" />
                {t.eiskalt}
              </p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-yellow-500/20">
              <p className="text-gray-300">
                <Waves className="inline w-5 h-5 mr-2 text-cyan-400" />
                {t.qualitaet}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Biere
