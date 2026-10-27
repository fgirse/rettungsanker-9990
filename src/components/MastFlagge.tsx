'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { Flagge } from '@/components/Flaggen'
import { useSprache } from '@/i18n/SprachProvider'
import { findeSprache, STANDARD_SPRACHE } from '@/i18n/sprachen'

const ERSATZ_VIDEO = findeSprache(STANDARD_SPRACHE).video!
const POSTER = '/media/Mast_mit_Matrose_Poster.jpg'

// Ab 13,2 s blendet der Film ins Schwarze ab – vorher anhalten, damit die Flagge oben stehen bleibt
const ENDE = 13.0
// Erste 0,6 s blendet der Film aus Schwarz auf; die aufgelegte Flagge blendet mit
const AUFBLENDEN = 0.6

// Oberkante der deutschen Flagge im Film (Sekunde → Prozent der Bildhöhe), Bild für Bild ausgemessen.
// Daran wird die aufgelegte Landesflagge entlanggeführt.
const FLAGGEN_BAHN: [number, number][] = [
  [0, 60.8],
  [1.5, 60.3],
  [2, 56.7],
  [3, 50],
  [4, 43.1],
  [5, 38.3],
  [6, 32.2],
  [7, 26.1],
  [8, 19.4],
  [8.5, 16.1],
  [14, 16.6],
]

function flaggenHoehe(zeit: number) {
  for (let i = 1; i < FLAGGEN_BAHN.length; i++) {
    const [t1, y1] = FLAGGEN_BAHN[i]
    if (zeit <= t1) {
      const [t0, y0] = FLAGGEN_BAHN[i - 1]
      return y0 + ((zeit - t0) / (t1 - t0)) * (y1 - y0)
    }
  }
  return FLAGGEN_BAHN[FLAGGEN_BAHN.length - 1][1]
}

// Kleiner Ausschnitt mit Mast und Matrose für die Kopfzeile.
// Beim Sprachwechsel hisst der Matrose die Flagge der gewählten Sprache.
export function MastFlagge({ className }: { className?: string }) {
  const { sprache, gewechselt } = useSprache()
  const aktuelle = findeSprache(sprache)
  // Sprachen ohne eigenen Film nutzen den deutschen und bekommen ihre Flagge aufgelegt
  const mitAuflage = !aktuelle.video
  const videoSrc = aktuelle.video ?? ERSATZ_VIDEO

  const videoRef = useRef<HTMLVideoElement>(null)
  const auflageRef = useRef<HTMLDivElement>(null)

  // Setzt die aufgelegte Flagge an die Stelle, an der im Film gerade die deutsche hängt
  const fuehreFlagge = (zeit: number) => {
    const auflage = auflageRef.current
    if (!auflage) return
    auflage.style.top = `${flaggenHoehe(zeit) - 0.6}%`
    auflage.style.opacity = String(Math.min(1, zeit / AUFBLENDEN))
  }

  // Ohne Wechsel (erster Besuch / gespeicherte Sprache): Flagge steht bereits oben
  useEffect(() => {
    if (!gewechselt) fuehreFlagge(ENDE)
  }, [gewechselt, mitAuflage])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !gewechselt) return

    // Wer reduzierte Bewegung eingestellt hat, bekommt die Flagge ohne Film direkt oben
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fuehreFlagge(ENDE)
      return
    }

    let frame = 0
    const schritt = () => {
      if (video.currentTime >= ENDE) {
        video.pause()
        fuehreFlagge(ENDE)
        return
      }
      fuehreFlagge(video.currentTime)
      frame = requestAnimationFrame(schritt)
    }

    fuehreFlagge(0)
    video.currentTime = 0
    video
      .play()
      .then(() => {
        frame = requestAnimationFrame(schritt)
      })
      // Abspielen verweigert (z. B. Stromsparmodus): Flagge trotzdem oben zeigen
      .catch(() => fuehreFlagge(ENDE))

    return () => cancelAnimationFrame(frame)
  }, [sprache, gewechselt, videoSrc])

  return (
    <div
      aria-hidden="true"
      className={cn(
        // Hochkant-Ausschnitt um den Mast herum; der 16:9-Film darin bleibt mittig
        'relative aspect-[9/10] overflow-hidden rounded-lg border-2 border-yellow-600/80 shadow-md shadow-black/50',
        className,
      )}
    >
      <div className="absolute top-0 left-1/2 h-full aspect-video -translate-x-1/2">
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          poster={POSTER}
          muted
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
        {mitAuflage && (
          <div
            ref={auflageRef}
            style={{ top: `${flaggenHoehe(ENDE) - 0.6}%` }}
            className="pointer-events-none absolute left-[51.6%] w-[13%] h-[18.5%]"
          >
            <Flagge code={sprache} preserveAspectRatio="none" className="flagge-wehen h-full w-full" />
          </div>
        )}
      </div>
    </div>
  )
}
