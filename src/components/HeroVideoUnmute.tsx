'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function HeroVideoUnmute() {
  const [muted, setMuted] = useState(true)
  const hasInteracted = useRef(false)

  const getActiveVideo = (): HTMLVideoElement | null => {
    if (typeof window === 'undefined') return null
    // desktop video is visible when lg breakpoint is active
    const desktop = document.getElementById('hero-video-desktop') as HTMLVideoElement | null
    const mobile = document.getElementById('hero-video-mobile') as HTMLVideoElement | null
    if (desktop && getComputedStyle(desktop).display !== 'none') return desktop
    return mobile
  }

  const getAllVideos = (): HTMLVideoElement[] => {
    if (typeof window === 'undefined') return []
    const ids = ['hero-video-desktop', 'hero-video-mobile']
    return ids
      .map((id) => document.getElementById(id) as HTMLVideoElement | null)
      .filter(Boolean) as HTMLVideoElement[]
  }

  const toggle = () => {
    const videos = getAllVideos()
    const next = !muted

    videos.forEach((v) => {
      v.muted = next
      // First unmute requires explicit play() due to autoplay policy
      if (!next && !hasInteracted.current) {
        hasInteracted.current = true
        v.play().catch(() => {
          v.muted = true
          setMuted(true)
        })
      }
    })

    setMuted(next)
  }

  // Sync state if videos were somehow muted externally
  useEffect(() => {
    const video = getActiveVideo()
    if (video) setMuted(video.muted)
  }, [])

  return (
    <button
      onClick={toggle}
      aria-label={muted ? 'Ton einschalten' : 'Ton ausschalten'}
      className="absolute bottom-6 right-6 z-20 flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
    >
      {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
      <span className="text-sm font-medium">{muted ? 'Ton an' : 'Ton aus'}</span>
    </button>
  )
}
