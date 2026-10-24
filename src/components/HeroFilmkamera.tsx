'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
// Symbol „film-projector“ von Delapouite, game-icons.net (CC BY 3.0, Namensnennung im Impressum)
import Filmkamera from '../../public/Assets/Svg/filmkamera.svg'

const VIDEO_SRC = '/media/rettungsanker-weltraumflug-layla.mp4'
const POSTER_SRC = '/media/rettungsanker-weltraumflug-layla-poster.jpg'

// Filmkamera im Hero: Klick spielt den Weltraumflug-Film sofort im Vollbild ab.
// Nach dem Ende (oder bei Esc/Schließen) geht es zurück an die vorherige Scrollposition.
export default function HeroFilmkamera() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrollYRef = useRef(0)
  const [open, setOpen] = useState(false)
  // Portal erst nach dem Mounten, auf dem Server gibt es kein document
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const close = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setOpen(false)
    // Erst nach dem Verlassen des Vollbilds zurückscrollen, sonst setzt der Browser die Position danach wieder
    const restore = () =>
      requestAnimationFrame(() => window.scrollTo({ top: scrollYRef.current, behavior: 'instant' }))
    if (document.fullscreenElement) document.exitFullscreen().then(restore, restore)
    else restore()
  }

  const start = () => {
    const overlay = overlayRef.current
    const video = videoRef.current
    if (!overlay || !video) return
    scrollYRef.current = window.scrollY
    setOpen(true)
    // Vollbild und play() müssen direkt im Klick passieren, sonst blockiert der Browser beides.
    // Das Overlay ist dafür immer im DOM, nur unsichtbar.
    overlay.requestFullscreen?.().catch(() => {})
    video.play().catch(() => {})
  }

  // Verlässt jemand das Vollbild selbst (Esc), wird auch der Film beendet
  useEffect(() => {
    if (!open) return
    const onFullscreenChange = () => {
      if (!document.fullscreenElement) close()
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange)
      window.removeEventListener('keydown', onKey)
    }
    // close greift nur auf Refs zu, daher reicht open als Abhängigkeit
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={start}
        aria-label="Film abspielen: Rettungsanker – Weltraumflug mit Layla"
        className="group flex cursor-pointer flex-col items-center gap-2 focus-visible:outline-2 focus-visible:outline-yellow-500"
      >
        <Image
          src={Filmkamera}
          alt=""
          // Dunkle Kachel wie in der Getränkekarte, sonst geht das gelbe Symbol im bunten Hintergrund unter
          className="w-28! xl:w-36! rounded-2xl border border-yellow-500/40 bg-[#1a252d] p-4 shadow-[0_0_40px_rgba(234,179,8,0.25)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
          priority={false}
        />
        <span className="headingA text-lg xl:text-2xl text-yellow-500 group-hover:text-yellow-300">
          film ab!
        </span>
      </button>

      {/* Per Portal an body, weil der verschobene (translate) Eltern-Container fixed sonst einsperrt.
          Bleibt gerendert (statt display:none), damit requestFullscreen sofort greifen kann. */}
      {mounted &&
        createPortal(
          <div
            ref={overlayRef}
            className={`fixed inset-0 z-200 flex items-center justify-center bg-black transition-opacity duration-300 ${
              open ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!open}
            aria-label="Rettungsanker – Weltraumflug mit Layla"
          >
            <video
              ref={videoRef}
              className="h-full w-full object-contain"
              playsInline
              preload="none"
              poster={POSTER_SRC}
              onEnded={close}
            >
              <source src={VIDEO_SRC} type="video/mp4" />
            </video>
            <button
              type="button"
              onClick={close}
              aria-label="Film schließen"
              className="absolute top-6 right-6 rounded-full bg-black/60 px-4 py-2 font-sans text-white transition hover:bg-yellow-600"
            >
              ✕ Schließen
            </button>
          </div>,
          document.body,
        )}
    </>
  )
}
