// Zentrale Liste der wählbaren Sprachen.
// video: eigener Flaggenfilm für diese Sprache. Fehlt er, läuft der deutsche Film
// und die Landesflagge wird passgenau über die deutsche Flagge gelegt (siehe MastFlagge).
export type SprachCode = 'de' | 'en' | 'fr' | 'it' | 'ru'

export interface Sprache {
  code: SprachCode
  // Name in der eigenen Sprache, so findet jeder Besucher seine Sprache sofort
  name: string
  // Land, dessen Flagge gehisst wird
  land: string
  video?: string
}

export const STANDARD_SPRACHE: SprachCode = 'de'

export const SPRACHEN: Sprache[] = [
  { code: 'de', name: 'Deutsch', land: 'Deutschland', video: '/media/Mast_mit_Matrose_klein.mp4' },
  { code: 'en', name: 'English', land: 'USA' },
  { code: 'fr', name: 'Français', land: 'Frankreich' },
  { code: 'it', name: 'Italiano', land: 'Italien' },
  { code: 'ru', name: 'Русский', land: 'Russland' },
]

export const istSprachCode = (wert: unknown): wert is SprachCode =>
  SPRACHEN.some((s) => s.code === wert)

export const findeSprache = (code: SprachCode): Sprache =>
  SPRACHEN.find((s) => s.code === code) ?? SPRACHEN[0]

export const SPRACH_CODES = SPRACHEN.map((s) => s.code)

// Name des Cookies, in dem die Wahl des Besuchers liegt (liest auch die Middleware)
export const SPRACH_COOKIE = 'sprache'

// Liest die Sprache aus dem ersten Pfadteil, z. B. "/fr/impressum" → "fr".
// Pfade ohne Sprachkürzel gehören zur Standardsprache Deutsch.
export function spracheAusPfad(pfad: string): SprachCode {
  const erster = pfad.split('/')[1]
  return istSprachCode(erster) ? erster : STANDARD_SPRACHE
}

// Entfernt ein vorhandenes Sprachkürzel: "/fr/impressum" → "/impressum"
export function pfadOhneSprache(pfad: string): string {
  const teile = pfad.split('/')
  if (!istSprachCode(teile[1])) return pfad || '/'
  return '/' + teile.slice(2).join('/')
}

// Baut den Link für eine Sprache. Deutsch bleibt ohne Kürzel ("/impressum"),
// alle anderen bekommen es vorangestellt ("/en/impressum").
// Externe Links, reine Anker ("#…") und mailto/tel bleiben unverändert.
export function lokalisierterPfad(url: string | undefined, sprache: SprachCode): string | undefined {
  if (!url || !url.startsWith('/') || url.startsWith('//')) return url
  const ohne = pfadOhneSprache(url)
  if (sprache === STANDARD_SPRACHE) return ohne
  // "/#kontakt" → "/en#kontakt" statt "/en/#kontakt", damit Next nicht erst umleitet
  return ohne === '/' || ohne.startsWith('/#') ? `/${sprache}${ohne.slice(1)}` : `/${sprache}${ohne}`
}

// Seiten bekommen die Sprache als Teil der Adresse (/[locale]/…); ungültige Werte fallen auf Deutsch zurück
export type SprachParams = Promise<{ locale: string }>

export async function spracheAusParams(params: SprachParams): Promise<SprachCode> {
  const { locale } = await params
  return istSprachCode(locale) ? locale : STANDARD_SPRACHE
}
