'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * KiezkneipeTitle
 * ─────────────────────────────────────────────────────────────────────────────
 * Cinematic 3-D text reveal that mirrors the Blender animation:
 *   • Line 1 "die"        → slides in from RIGHT  + fades in  (0 s)
 *   • Line 2 "kiezkneipe" → slides in from LEFT   + fades in  (2 s delay)
 *
 * Usage
 * ─────
 *   import KiezkneipeTitle from "@/components/KiezkneipeTitle";
 *   <KiezkneipeTitle />
 *
 * Props
 * ─────
 *   autoPlay?      boolean   Start animation on mount (default: true)
 *   loop?          boolean   Loop the animation (default: false)
 *   className?     string    Extra classes on the wrapper
 *
 * To use your Blender-rendered PNG sequence instead of the CSS version,
 * set  USE_BLENDER_VIDEO = true  and point  videoSrc  to your exported
 * WebM/MP4 with alpha channel.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Toggle: pure-CSS (default) vs. Blender video ───────────────────────────
const USE_BLENDER_VIDEO = false
const VIDEO_SRC = '/kiezkneipe.webm' // replace with your exported video path

// ─── Design tokens ───────────────────────────────────────────────────────────
const CREAM = '#F5EDD0'
const DARKGREY = '#262626'
const DARKRED = '#7F0808'
const WHITE = '#FFFFFF'

interface Props {
  autoPlay?: boolean
  loop?: boolean
  className?: string
}

export default function KiezkneipeTitle({ autoPlay = true, loop = false, className = '' }: Props) {
  const [playing, setPlaying] = useState(autoPlay)
  const [key, setKey] = useState(0) // bump to replay
  const containerRef = useRef<HTMLDivElement>(null)

  const replay = () => {
    setPlaying(false)
    setTimeout(() => {
      setKey((k) => k + 1)
      setPlaying(true)
    }, 50)
  }

  // If loop is enabled, restart after the last animation ends (line2: 2s delay + 1.1s anim = ~3.1s + buffer)
  useEffect(() => {
    if (!loop || !playing) return
    const t = setTimeout(replay, 5200)
    return () => clearTimeout(t)
  }, [playing, key, loop])

  if (USE_BLENDER_VIDEO) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <video
          key={key}
          src={VIDEO_SRC}
          autoPlay={playing}
          muted
          playsInline
          loop={loop}
          className="w-full h-auto"
          style={{ background: 'transparent' }}
        />
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bowlby+One+SC&display=swap');

        /* ── Shared 3-D text style ── */
        .kk-text {
          font-family: 'Bowlby One SC', sans-serif;
          line-height: 1;
          letter-spacing: 0.02em;
          display: block;
          will-change: transform, opacity;
          transform-style: preserve-3d;
        }

        /* ── DIE: slides from right ── */
        @keyframes slideFromRight {
          0%   { opacity: 0; transform: translateX(120px) translateZ(-60px) rotateY(-18deg) rotateZ(10deg); }
          60%  { opacity: 1; transform: translateX(-8px)  translateZ(4px)   rotateY(2deg)  rotateZ(-1deg); }
          80%  { transform: translateX(4px)  translateZ(0px)   rotateY(-1deg) rotateZ(0.5deg); }
          100% { opacity: 1; transform: translateX(0)     translateZ(0)     rotateY(0deg)  rotateZ(0deg);  }
        }

        /* ── KIEZKNEIPE: slides from left ── */
        @keyframes slideFromLeft {
          0%   { opacity: 0; transform: translateX(-120px) translateZ(-60px) rotateY(18deg)  rotateZ(-10deg); }
          60%  { opacity: 1; transform: translateX(8px)    translateZ(4px)   rotateY(-2deg)  rotateZ(1deg);  }
          80%  { transform: translateX(-4px)   translateZ(0px)   rotateY(1deg)   rotateZ(-0.5deg); }
          100% { opacity: 1; transform: translateX(0)      translateZ(0)     rotateY(0deg)   rotateZ(0deg);  }
        }

        .kk-line1 {
          opacity: 0;
          animation: none;
        }
        .kk-line1.playing {
          animation: slideFromRight 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .kk-line2 {
          opacity: 0;
          animation: none;
        }
        .kk-line2.playing {
          animation: slideFromLeft 1.1s cubic-bezier(0.16, 1, 0.3, 1) 2s forwards;
        }

        /* ── 3-D extrusion via layered text-shadow ── */
        .kk-die-text {
          color: ${CREAM};
          -webkit-text-stroke: 3px ${DARKGREY};
          text-shadow:
            0  1px 0 ${DARKGREY},
            0  2px 0 ${DARKGREY},
            0  3px 0 ${DARKGREY},
            0  4px 0 ${DARKGREY},
            0  5px 0 ${DARKGREY},
            0  6px 0 ${DARKGREY},
            0  7px 0 ${DARKGREY},
            0  8px 0 #111,
            0 12px 20px rgba(0,0,0,0.5),
            0 20px 40px rgba(0,0,0,0.25);
        }

        .kk-kk-text {
          color: ${DARKRED};
          -webkit-text-stroke: 3px ${WHITE};
          text-shadow:
            0  1px 0 ${WHITE},
            0  2px 0 #ccc,
            0  3px 0 #aaa,
            0  4px 0 #888,
            0  5px 0 #666,
            0  6px 0 #444,
            0  7px 0 #222,
            0  8px 0 #111,
            0 12px 20px rgba(0,0,0,0.5),
            0 20px 40px rgba(0,0,0,0.25);
        }

        /* ── Cinematic light sweep on line1 ── */
        @keyframes lightSweep {
          0%   { background-position: -200% center; }
          100% { background-position: 300% center; }
        }
        .kk-die-text.playing {
          background-image: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.35) 50%,
            transparent 60%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          animation:
            slideFromRight 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            lightSweep 1.4s ease-out 0.3s forwards;
        }
        .kk-kk-text.playing {
          background-image: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.2) 50%,
            transparent 60%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          animation:
            slideFromLeft 1.1s cubic-bezier(0.16, 1, 0.3, 1) 2s forwards,
            lightSweep 1.4s ease-out 2.3s forwards;
        }

        /* ── Replay button ── */
        .kk-replay {
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .kk-replay:hover { opacity: 1; }
      `}</style>

      <div
        key={key}
        className="flex flex-col items-center gap-2 px-8"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Line 1 — "die" */}
        <span
          className={`kk-text kk-die-text kk-line1 ${playing ? 'playing' : ''}`}
          style={{ fontSize: 'clamp(9rem, 64vw, 29rem)' }}
          aria-label="die"
        >
          die
        </span>

        {/* Line 2 — "kiezkneipe" */}
        <span
          className={`kk-text kk-kk-text kk-line2 ${playing ? 'playing' : ''}`}
          style={{ fontSize: 'clamp(4rem, 14vw, 8rem)', marginTop: '-6rem' }}
          aria-label="kiezkneipe"
        >
          kiezkneipe
        </span>
      </div>

      {/* Replay trigger */}
      <button
        onClick={replay}
        className="kk-replay absolute bottom-2 right-4 text-xs font-mono tracking-widest uppercase"
        style={{ color: DARKGREY, background: 'none', border: 'none', cursor: 'pointer' }}
        aria-label="Replay animation"
      >
        ↺ replay
      </button>
    </div>
  )
}
