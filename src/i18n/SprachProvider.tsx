'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { istSprachCode, STANDARD_SPRACHE, type SprachCode } from './sprachen'

// Speicherort der Wahl: localStorage für den Browser, Cookie damit der Server
// später (bei echten Übersetzungen) die Sprache schon beim Rendern kennt.
const SPEICHER_SCHLUESSEL = 'sprache'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

interface SprachKontextWert {
  sprache: SprachCode
  // true, sobald der Besucher aktiv gewählt hat – nur dann wird die Flagge animiert gehisst
  gewechselt: boolean
  setzeSprache: (code: SprachCode) => void
}

const SprachKontext = createContext<SprachKontextWert | null>(null)

export function SprachProvider({ children }: { children: React.ReactNode }) {
  const [sprache, setSprache] = useState<SprachCode>(STANDARD_SPRACHE)
  const [gewechselt, setGewechselt] = useState(false)

  // Gespeicherte Wahl erst nach dem Mounten lesen, sonst weicht das Server-HTML ab
  useEffect(() => {
    try {
      const gespeichert = localStorage.getItem(SPEICHER_SCHLUESSEL)
      if (istSprachCode(gespeichert)) setSprache(gespeichert)
    } catch {
      // Privater Modus o. ä.: dann bleibt es bei Deutsch
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = sprache
  }, [sprache])

  const setzeSprache = useCallback((code: SprachCode) => {
    setSprache(code)
    setGewechselt(true)
    try {
      localStorage.setItem(SPEICHER_SCHLUESSEL, code)
    } catch {}
    document.cookie = `${SPEICHER_SCHLUESSEL}=${code}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`
  }, [])

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
