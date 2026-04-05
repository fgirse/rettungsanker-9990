'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import type { Media } from '@/payload-types'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

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
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Blend in/out animation with GSAP
  useGSAP(() => {
    if (buttonRef.current) {
      const tl = gsap.timeline({ repeat: -1, yoyo: true })

      tl.to(buttonRef.current, {
        opacity: 0.3,
        scale: 0.95,
        duration: 2,
        ease: 'power1.inOut',
      }).to(buttonRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: 'power1.inOut',
      })

      return () => {
        tl.kill()
      }
    }
  }, [])

  // Hover animation
  const handleMouseEnter = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        borderColor: 'rgba(132, 204, 22, 0.8)',
        backgroundColor: 'rgba(132, 204, 22, 0.3)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        scale: 1,
        borderColor: 'rgba(132, 204, 22, 0.3)',
        backgroundColor: 'rgba(132, 204, 22, 0.1)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="flex items-center justify-center">
        <button
          ref={buttonRef}
          type="button"
          onClick={openModal}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="rounded-lg border-2 border-lime-500/30 bg-lime-500/10 px-6 py-3 text-lg font-medium font-sans text-lime-700 rotate-30 translate-x-[25vw] backdrop-blur-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-lime-500/50 focus-visible:ring-offset-2"
        >
          Angebot des Monats
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
