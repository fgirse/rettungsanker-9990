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
