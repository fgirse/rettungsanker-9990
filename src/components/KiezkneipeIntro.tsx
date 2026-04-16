'use client'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'

export default function KietzkneipeIntro({ onDone }: { onDone?: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const [skip, setSkip] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const canvas = ref.current
    const W = canvas.clientWidth,
      H = canvas.clientHeight

    /* ── Renderer: transparent background ── */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(devicePixelRatio)
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0) // transparent

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
    camera.position.set(0, 0, 8)

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x1a1f2e, 1.5))
    const key = new THREE.DirectionalLight(0xfff4d9, 3.5)
    key.position.set(3, 4, 6)
    scene.add(key)
    const rim = new THREE.SpotLight(0x4466ff, 8, 20, Math.PI / 5, 0.6)
    rim.position.set(-5, 2, 4)
    scene.add(rim)

    /* ── Materials ── */
    const matCreme = new THREE.MeshStandardMaterial({
      color: 0xf5edcf,
      roughness: 0.45,
      emissive: new THREE.Color(0xf5edcf),
      emissiveIntensity: 0.3,
    })
    const matDarkGrey = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.2,
    })
    const matDarkRed = new THREE.MeshStandardMaterial({
      color: 0x4e0e22,
      roughness: 0.35,
      emissive: new THREE.Color(0xcc1515),
      emissiveIntensity: 0.4,
    })
    const matWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })

    const clock = new THREE.Clock()
    let dieGroup: THREE.Group | null = null
    let kietzGroup: THREE.Group | null = null
    let animId: number

    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    const cl = (t: number) => Math.max(0, Math.min(1, t))

    /* ── Font load ── */
    const loader = new FontLoader()
    loader.load('/fonts/BowlbyOneSC/bowlby-one-sc.typeface.json', (font) => {
      const makeText = (
        text: string,
        matFill: THREE.Material,
        matStroke: THREE.Material,
        size: number,
      ) => {
        const g = new THREE.Group()
        // Stroke (larger, behind)
        const sGeo = new TextGeometry(text, {
          font,
          size: size * 1.05,
          depth: 0.06,
          bevelEnabled: true,
          bevelSize: 0.025,
          bevelThickness: 0.015,
        })
        sGeo.center()
        const strokeMesh = new THREE.Mesh(sGeo, matStroke)
        strokeMesh.position.set(0, 0, -0.02)
        g.add(strokeMesh)
        // Fill
        const fGeo = new TextGeometry(text, {
          font,
          size,
          depth: 0.1,
          bevelEnabled: true,
          bevelSize: 0.01,
          bevelThickness: 0.01,
        })
        fGeo.center()
        g.add(new THREE.Mesh(fGeo, matFill))
        return g
      }

      // No Z tilt
      dieGroup = makeText('DIE', matCreme, matDarkGrey, 1.3)
      dieGroup.position.set(0, 0.9, 0)
      dieGroup.rotation.set(0, 0, 0)
      dieGroup.scale.setScalar(0.01)
      scene.add(dieGroup)

      kietzGroup = makeText('KIETZKNEIPE', matDarkRed, matWhite, 0.82)
      kietzGroup.position.set(0, -0.7, 0)
      kietzGroup.rotation.set(0, 0, 0)
      kietzGroup.scale.setScalar(0.01)
      scene.add(kietzGroup)
    })

    /* ── Animation loop ─────────────────────────────────────────
       Timeline:
         0.0–1.6s  "die"  blends in + Y-spin
         2.1–3.7s  "kietzkneipe" blends in + Y-spin (delayed)
         3.7s+     ambient float
    ── */
    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      if (dieGroup) {
        const p = ease(cl((t - 0) / 1.6))
        dieGroup.scale.setScalar(p)
        dieGroup.position.x = (1 - p) * -6
        dieGroup.rotation.y = (1 - p) * Math.PI * 1.5
      }
      if (kietzGroup) {
        const p = ease(cl((t - 2.1) / 1.6))
        kietzGroup.scale.setScalar(p)
        kietzGroup.position.x = (1 - p) * 6
        kietzGroup.rotation.y = -(1 - p) * Math.PI * 1.5
      }
      if (t > 3.7) {
        const ft = t - 3.7
        if (dieGroup) dieGroup.position.y = 0.9 + Math.sin(ft * 0.7) * 0.04
        if (kietzGroup) kietzGroup.position.y = -0.7 + Math.sin(ft * 0.7 + 1) * 0.04
        rim.intensity = 7 + Math.sin(ft * 1.2) * 1.5
      }
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      const w = canvas.clientWidth,
        h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', onResize)
    const skipTimer = setTimeout(() => setSkip(true), 1500)
    const autoTimer = setTimeout(() => onDone?.(), 8000)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      clearTimeout(skipTimer)
      clearTimeout(autoTimer)
      renderer.dispose()
    }
  }, [onDone])

  if (skip && false) return null // controlled by parent via onDone

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'transparent' }}>
      <canvas ref={ref} style={{ width: '100%', height: '100%', background: 'transparent' }} />
      {skip && (
        <button
          onClick={onDone}
          style={{
            position: 'absolute',
            bottom: 28,
            right: 28,
            background: 'transparent',
            border: '1px solid rgba(212,168,32,0.6)',
            color: 'rgba(212,168,32,0.9)',
            padding: '7px 18px',
            fontFamily: '"Bowlby One SC", sans-serif',
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          SKIP ›
        </button>
      )}
    </div>
  )
}
