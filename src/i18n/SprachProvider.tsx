'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { lokalisierterPfad, SPRACH_COOKIE, type SprachCode } from './sprachen'

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365
// Merkt sich über den Seitenwechsel hinweg, dass gerade aktiv gewählt wurde.
// Nach dem Wechsel wird das Layout neu aufgebaut und hätte den Zustand sonst vergessen.
const WECHSEL_SCHLUESSEL = 'spracheGewechselt'

interface SprachKontextWert {
  sprache: SprachCode
  // true, sobald der Besucher aktiv gewählt hat – nur dann wird die Flagge animiert gehisst
  gewechselt: boolean
  setzeSprache: (code: SprachCode) => void
}

const SprachKontext = createContext<SprachKontextWert | null>(null)

// Die Sprache steckt in der Adresse (/en/…, /fr/…); der Server gibt sie hier herein.
export function SprachProvider({
  sprache,
  children,
}: {
  sprache: SprachCode
  children: React.ReactNode
}) {
  const router = useRouter()
  const pfad = usePathname()
  const [gewechselt, setGewechselt] = useState(false)

  useEffect(() => {
    try {
      if (sessionStorage.getItem(WECHSEL_SCHLUESSEL) === sprache) {
        sessionStorage.removeItem(WECHSEL_SCHLUESSEL)
        setGewechselt(true)
      }
    } catch {
      // Privater Modus o. ä.: Flagge steht dann ohne Animation oben
    }
  }, [sprache])

  const setzeSprache = useCallback(
    (code: SprachCode) => {
      if (code === sprache) return
      // Cookie zuerst: die Middleware leitet Adressen ohne Kürzel danach in die gewählte Sprache
      document.cookie = `${SPRACH_COOKIE}=${code}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`
      try {
        sessionStorage.setItem(WECHSEL_SCHLUESSEL, code)
      } catch {}
      // Gleiche Seite in der neuen Sprache, Sprungmarke (#…) bleibt erhalten
      router.push(`${lokalisierterPfad(pfad, code)}${window.location.hash}`)
    },
    [sprache, pfad, router],
  )

  return (
    <SprachKontext.Provider value={{ sprache, gewechselt, setzeSprache }}>
      {children}
    </SprachKontext.Provider>
  )
}

export function useSprache() {
  const wert = useContext(SprachKontext)
  if (!wert) throw new Error('useSprache muss innerhalb von <SprachProvider> verwendet werden')
  return wert
}
