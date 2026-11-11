import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import type { BlogBilder } from '@/payload-types'

// Liefert Payload und das angemeldete Konto (Mitglied oder Team) aus dem Login-Cookie.
// Alle Abfragen im Blog laufen mit diesem Konto und overrideAccess: false,
// damit die Zugriffsregeln der Sammlungen auch hier gelten.
export async function blogKontext() {
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: await headers() })
  return { payload, user }
}

export type BlogNutzer = NonNullable<Awaited<ReturnType<typeof blogKontext>>['user']>

// Wählt die passende Bildgröße; SVGs und kleine Bilder haben keine verkleinerte Fassung
export function bildUrl(bild: unknown, groesse: 'karte' | 'gross' = 'karte') {
  if (!bild || typeof bild !== 'object') return null
  const b = bild as BlogBilder
  return b.sizes?.[groesse]?.url || b.url || null
}
