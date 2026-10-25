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

// Kreisbahn für den umlaufenden Schriftzug (viewBox 0–100, Radius 38, Start oben)
const TEXT_RADIUS = 38
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
        {/* Runde Plakette nach Framer-Vorlage „Rotating Text Badge“: dunkle Scheibe mit grauem Ring,
            der Schriftzug kreist dauerhaft (auch ohne Maus auf Handy/Tablet), in der Mitte das
            aktuelle Produktbild aus dem CMS vor einem weichgezeichneten Farbschein desselben Bildes. */}
        <button
          type="button"
          onClick={openModal}
          aria-label={`Angebot des Monats: ${[productOfTheMonth.description, productOfTheMonth.price].filter(Boolean).join(', ')} – Details öffnen`}
          className="group relative block aspect-square w-36 cursor-pointer rounded-full transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow-500 md:w-44 lg:w-48 xl:w-56"
        >
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]" aria-hidden="true">
            <circle cx="50" cy="50" r="47" fill="#161616" stroke="#3b3b3b" strokeWidth="5" />
          </svg>

          {/* Bild in der Mitte: unscharfe, vergrößerte Kopie als Farbkugel, darüber das scharfe Bild */}
          <span aria-hidden="true" className="absolute inset-[25%] overflow-hidden rounded-full bg-[radial-gradient(circle_at_40%_65%,#c2410c,#7c2d12_75%)]">
            <Image src={productImage} alt="" fill sizes="120px" className="scale-[2.2] object-cover opacity-60 blur-md saturate-150" />
            <Image src={productImage} alt="" fill sizes="120px" className="object-contain p-[5%] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]" />
          </span>

          {/* Umlaufender Schriftzug; textLength verteilt ihn exakt auf den ganzen Kreis */}
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
            aria-hidden="true"
          >
            <defs>
              <path id={bahnId} d={TEXT_BAHN} />
            </defs>
            {/* Systemschrift statt font-sans: die ist hier auf die Handschrift Architects Daughter gesetzt */}
            <text className="fill-white font-[ui-sans-serif,system-ui,sans-serif] text-[6.4px] font-semibold uppercase">
              <textPath href={`#${bahnId}`} textLength={2 * Math.PI * TEXT_RADIUS - 2} lengthAdjust="spacing">
                Angebot des Monats ✦ Angebot des Monats ✦
              </textPath>
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
