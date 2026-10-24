'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
// Symbol „film-projector“ von Delapouite, game-icons.net (CC BY 3.0, Namensnennung im Impressum)
import Filmkamera from '../../public/Assets/Svg/filmkamera.svg'

const VIDEO_SRC = '/media/rettungsanker-weltraumflug-layla.mp4'
const POSTER_SRC = '/media/rettungsanker-weltraumflug-layla-poster.jpg'

// Filmkamera (Hero und Geschichte-Seite): Klick spielt den Weltraumflug-Film sofort im Vollbild ab.
// Nach dem Ende (oder bei Esc/Schließen) geht es zurück an die vorherige Scrollposition.
export default function HeroFilmkamera() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoHostRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const scrollYRef = useRef(0)
  const [open, setOpen] = useState(false)
  // Portal erst nach dem Mounten, auf dem Server gibt es kein document
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const close = () => {
    // Video ganz entfernen, damit außerhalb des Films kein zweites Video im DOM liegt
    // (iPhone-Safari stoppte sonst das Sturmwellen-Video im Hero)
    const video = videoRef.current
    if (video) {
      video.pause()
      video.removeAttribute('src')
      video.load()
      video.remove()
      videoRef.current = null
    }
    overlayRef.current?.classList.replace('flex', 'hidden')
    setOpen(false)
    // Erst nach dem Verlassen des Vollbilds zurückscrollen, sonst setzt der Browser die Position danach wieder
    const restore = () =>
      requestAnimationFrame(() => window.scrollTo({ top: scrollYRef.current, behavior: 'instant' }))
    if (document.fullscreenElement) document.exitFullscreen().then(restore, restore)
    else restore()
  }

  const start = () => {
    const overlay = overlayRef.current
    const host = videoHostRef.current
    if (!overlay || !host) return
    scrollYRef.current = window.scrollY

    // Vollbild und play() müssen direkt im Klick passieren, sonst blockiert der Browser beides.
    // Deshalb Overlay sofort sichtbar schalten und das Video hier erzeugen statt über React-State.
    overlay.classList.replace('hidden', 'flex')
    const video = document.createElement('video')
    video.className = 'h-full w-full object-contain'
    video.playsInline = true
    video.poster = POSTER_SRC
    video.src = VIDEO_SRC
    video.addEventListener('ended', close)
    host.replaceChildren(video)
    videoRef.current = video

    setOpen(true)
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
          className="w-20! md:w-24! lg:w-28! xl:w-36! rounded-xl md:rounded-2xl border border-yellow-500/40 bg-[#1a252d] p-3 md:p-4 shadow-[0_0_40px_rgba(234,179,8,0.25)] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
          priority={false}
        />
        {/* Schwarze Schrift mit weißer Kontur; die gestaffelten Grautöne nach rechts unten
            ergeben die 3D-Kante, der weiche Schatten am Ende hebt den Schriftzug vom Hintergrund ab */}
        <span className="headingA text-base text-black [text-shadow:-1px_-1px_0_#fff,1px_-1px_0_#fff,-1px_1px_0_#fff,1px_1px_0_#fff,2px_2px_0_#d4d4d4,3px_3px_0_#a3a3a3,4px_4px_0_#737373,5px_5px_0_#404040,6px_7px_6px_rgba(0,0,0,0.6)] md:text-lg xl:text-2xl">
          film ab!
        </span>
      </button>

      {/* Per Portal an body, weil der verschobene (translate) Eltern-Container fixed sonst einsperrt.
          Geschlossen per display:none; start() schaltet direkt auf flex, damit requestFullscreen greift. */}
      {mounted &&
        createPortal(
          <div
            ref={overlayRef}
            className={`fixed inset-0 z-200 items-center justify-center bg-black ${open ? 'flex' : 'hidden'}`}
            role="dialog"
            aria-modal="true"
            aria-hidden={!open}
            aria-label="Rettungsanker – Weltraumflug mit Layla"
          >
            {/* Platzhalter, in den start() das Video einsetzt */}
            <div ref={videoHostRef} className="contents" />
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
