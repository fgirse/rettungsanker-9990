'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment, useId, useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { Media } from '@/payload-types'

// Gewellter Rand eines Bierdeckels (viewBox 0–100): Kreis mit 32 sanften Zacken
const DECKEL_RAND =
  Array.from({ length: 361 }, (_, i) => {
    const w = (i * Math.PI) / 180
    const r = 47 + 1.4 * Math.cos(32 * w)
    return `${i ? 'L' : 'M'}${(50 + r * Math.cos(w)).toFixed(2)},${(50 + r * Math.sin(w)).toFixed(2)}`
  }).join(' ') + ' Z'

// Kreisbahn für den umlaufenden Schriftzug (viewBox 0–100, Radius 37, Start oben)
const TEXT_RADIUS = 37
const TEXT_BAHN = `M 50,${50 - TEXT_RADIUS} a ${TEXT_RADIUS},${TEXT_RADIUS} 0 1,1 0,${2 * TEXT_RADIUS} a ${TEXT_RADIUS},${TEXT_RADIUS} 0 1,1 0,-${2 * TEXT_RADIUS}`

interface AngebotModalProps {
  productOfTheMonth: {
    title?: string | null
    subtitle?: string | null
    description?: string | null
    price?: string | null
    badge?: string | null
    image?: string | Media | null
    isActive?: boolean | null
  }
  productImage: string
}

export default function AngebotModal({ productOfTheMonth, productImage }: AngebotModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  // Doppelpunkte aus useId entfernen, sie stören in href="#…"
  const bahnId = `angebot${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        {/* Hellgelber Bierdeckel (yellow-50) mit gewelltem Rand und roten Ringen (red-800), leicht schräg hingelegt.
            Der rote Schriftzug kreist dauerhaft (auch ohne Maus auf Handy/Tablet),
            in der Mitte das aktuelle Produktbild aus dem CMS. Am Desktop größer, damit der Schriftzug
            mehr Umfang hat und weiter gesperrt wirkt. */}
        <button
          type="button"
          onClick={openModal}
          aria-label={`Angebot des Monats: ${[productOfTheMonth.description, productOfTheMonth.price].filter(Boolean).join(', ')} – Details öffnen`}
          className="group relative block aspect-square w-36 -rotate-6 cursor-pointer rounded-full transition-transform duration-300 hover:scale-105 hover:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-500 md:w-44 lg:w-56 xl:w-64"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[0_8px_12px_rgba(0,0,0,0.55)]" aria-hidden="true">
            <defs>
              {/* Zum Rand hin leicht abgedunkelt, wirkt wie gepresste Pappe */}
              <radialGradient id={`${bahnId}pappe`}>
                <stop offset="70%" stopColor="#fefce8" />
                <stop offset="100%" stopColor="#fef9c2" />
              </radialGradient>
            </defs>
            <path d={DECKEL_RAND} fill={`url(#${bahnId}pappe)`} stroke="#e2d796" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="44.5" fill="none" stroke="#9f0712" strokeWidth="1.4" />
            <circle cx="50" cy="50" r="35.5" fill="none" stroke="#9f0712" strokeWidth="1.4" />
            <circle cx="50" cy="50" r="33.8" fill="none" stroke="#9f0712" strokeWidth="0.4" strokeDasharray="1.2 1" />
          </svg>

          {/* Produktbild in der Mitte, so groß wie innerhalb der Ringe möglich. object-cover mit Ausschnitt weit unten (78 %)
              zeigt das Flaschenetikett formatfüllend statt der ganzen, schmalen Flasche. */}
          <span aria-hidden="true" className="absolute inset-[18%] overflow-hidden rounded-full bg-yellow-50">
            <Image src={productImage} alt="" fill sizes="160px" className="object-cover object-[50%_78%]" />
          </span>

          {/* Umlaufender Schriftzug in der Bowlby-Schrift, einmal rundherum; auf Handy und Desktop verteilt textLength ihn
              mit weitem Buchstabenabstand exakt auf den ganzen Kreis */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
            aria-hidden="true"
          >
            <defs>
              <path id={bahnId} d={TEXT_BAHN} />
            </defs>
            <text className="fill-red-800 font-mono text-[9px] uppercase md:hidden lg:block">
              <textPath href={`#${bahnId}`} textLength={2 * Math.PI * TEXT_RADIUS - 2} lengthAdjust="spacing">
                Angebot des Monats ★
              </textPath>
            </text>
            {/* Tablet: enger gesetzt, reicht nur über rund drei Viertel des Kreises; die Lücke kreist mit */}
            <text className="hidden fill-red-800 font-mono text-[9px] uppercase tracking-[2.5px] md:block lg:hidden">
              <textPath href={`#${bahnId}`}>Angebot des Monats ★</textPath>
            </text>
          </svg>
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-900 p-8 text-left align-middle shadow-2xl transition-all">
                  <DialogTitle
                    as="h3"
                    className="text-3xl font-bold text-gray-900 mb-6 text-center uppercase tracking-wide"
                  >
                    Angebot des Monats
                  </DialogTitle>

                  <div className="relative overflow-hidden rounded-2xl bg-linear-to-b from-orange-300 to-orange-100 p-8">
                    {/* Badge */}
                    {productOfTheMonth.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-yellow-600 text-white px-4 py-2 text-base font-bold uppercase">
                          {productOfTheMonth.badge}
                        </Badge>
                      </div>
                    )}

                    {/* Content */}
                    <div className="space-y-6">
                      {/* Subtitle */}
                      {productOfTheMonth.subtitle && (
                        <div className="text-center">
                          <p className="text-3xl text-red-800 headingA font-medium">
                            {productOfTheMonth.subtitle}
                          </p>
                        </div>
                      )}

                      {/* Product Image */}
                      <div className="relative h-64 w-full rounded-xl overflow-hidden bg-white/30">
                        <Image
                          src={productImage}
                          alt={productOfTheMonth.title || 'Product of the Month'}
                          fill
                          className="object-contain p-6"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3 text-center">
                        <h3 className="text-2xl font-bold text-red-800 uppercase font-sans">
                          {productOfTheMonth.title}
                        </h3>

                        {productOfTheMonth.description && (
                          <p className="text-base font-black font-sans text-gray-800 leading-relaxed">
                            {productOfTheMonth.description}
                          </p>
                        )}

                        {productOfTheMonth.price && (
                          <div className="pt-3">
                            <span className="text-4xl font-sans font-black text-red-800">
                              {productOfTheMonth.price}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center gap-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-lg border border-transparent bg-red-800 px-6 py-3 text-base font-semibold text-white hover:bg-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-800 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Schließen
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
