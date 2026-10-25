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

// Gewellter Rand eines Bierdeckels (viewBox 0–100): Kreis mit 28 sanften Zacken
const DECKEL_RAND =
  Array.from({ length: 361 }, (_, i) => {
    const w = (i * Math.PI) / 180
    const r = 47 + 1.6 * Math.cos(28 * w)
    return `${i ? 'L' : 'M'}${(50 + r * Math.cos(w)).toFixed(2)},${(50 + r * Math.sin(w)).toFixed(2)}`
  }).join(' ') + ' Z'

// Deckel-Fläche mit angeknabberter Ecke oben rechts (per Maske ausgeschnitten)
function DeckelFlaeche({ id, fill, ring }: { id: string; fill: string; ring: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 h-full w-full drop-shadow-[0_6px_8px_rgba(0,0,0,0.55)]"
      aria-hidden="true"
    >
      <defs>
        <mask id={id}>
          <rect width="100" height="100" fill="white" />
          <circle cx="84" cy="20" r="6" fill="black" />
          <circle cx="90" cy="29" r="4.5" fill="black" />
          <circle cx="76" cy="13" r="4.5" fill="black" />
        </mask>
      </defs>
      <g mask={`url(#${id})`}>
        <path d={DECKEL_RAND} fill={fill} />
        <circle cx="50" cy="50" r="40" fill="none" stroke={ring} strokeWidth="1.6" />
        <circle cx="50" cy="50" r="37" fill="none" stroke={ring} strokeWidth="0.6" strokeDasharray="2 1.6" />
      </g>
    </svg>
  )
}

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
  // Doppelpunkte aus useId entfernen, sie stören in url(#…)
  const maskId = `deckel${useId().replace(/[^a-zA-Z0-9]/g, '')}`

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        {/* Bierdeckel, der schräg auf dem Tresen liegt und sich alle paar Sekunden umdreht:
            vorne der Schriftzug, hinten Produkt und Preis. Läuft von selbst, damit es auch ohne Maus
            (Handy/Tablet) wirkt; Hover hebt ihn nur leicht an. */}
        <button
          type="button"
          onClick={openModal}
          aria-label={`Angebot des Monats: ${[productOfTheMonth.description, productOfTheMonth.price].filter(Boolean).join(', ')} – Details öffnen`}
          className="group relative block aspect-square w-36 -rotate-12 cursor-pointer perspective-[900px] transition-transform duration-300 hover:scale-110 hover:-rotate-6 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-500 md:w-44 lg:w-48 xl:w-56"
        >
          <span aria-hidden="true" className="bierdeckel-flip relative block h-full w-full transform-3d">
            {/* Vorderseite */}
            <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 backface-hidden">
              <DeckelFlaeche id={`${maskId}v`} fill="#f5ecd7" ring="#9f0712" />
              {productOfTheMonth.badge && (
                <span className="relative font-sans text-[0.55rem] font-black uppercase leading-none tracking-[0.3em] text-red-800 md:text-xs">
                  ★ {productOfTheMonth.badge} ★
                </span>
              )}
              <span className="relative text-center font-mono text-base leading-[1.05] text-red-800 uppercase md:text-xl lg:text-[1.35rem] xl:text-2xl">
                Angebot
                <br />
                <span className="text-[0.6em]">des</span>
                <br />
                Monats
              </span>
            </span>
            {/* Rückseite */}
            <span className="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center gap-1 backface-hidden">
              <DeckelFlaeche id={`${maskId}r`} fill="#1a252d" ring="#f0b100" />
              <span className="relative h-[42%] w-[30%]">
                <Image
                  src={productImage}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                />
              </span>
              {productOfTheMonth.price && (
                <span className="relative font-mono text-sm leading-none text-yellow-500 md:text-base lg:text-lg xl:text-xl">
                  {productOfTheMonth.price}
                </span>
              )}
            </span>
          </span>
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

                  <div className="relative overflow-hidden rounded-2xl bg-lime-400 p-8">
                    {/* Badge */}
                    {productOfTheMonth.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-red-600 text-white px-4 py-2 text-base font-bold uppercase">
                          {productOfTheMonth.badge}
                        </Badge>
                      </div>
                    )}

                    {/* Content */}
                    <div className="space-y-6">
                      {/* Subtitle */}
                      {productOfTheMonth.subtitle && (
                        <div className="text-center">
                          <p className="text-3xl text-yellow-500 headingA font-medium">
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
                        <h3 className="text-2xl font-bold text-gray-50 uppercase font-sans">
                          {productOfTheMonth.title}
                        </h3>

                        {productOfTheMonth.description && (
                          <p className="text-base font-black font-sans text-gray-800 leading-relaxed">
                            {productOfTheMonth.description}
                          </p>
                        )}

                        {productOfTheMonth.price && (
                          <div className="pt-3">
                            <span className="text-4xl font-sans font-black text-yellow-600">
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
                      className="inline-flex justify-center rounded-lg border border-transparent bg-lime-500 px-6 py-3 text-base font-semibold text-white hover:bg-lime-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2"
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
