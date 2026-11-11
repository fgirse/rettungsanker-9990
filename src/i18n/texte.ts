import type { SprachCode } from './sprachen'

// Feste Oberflächentexte, die nicht im CMS gepflegt werden (Knöpfe, Bildschirmleser-Hinweise).
// Menüpunkte selbst kommen übersetzt aus dem Navigations-Global in Payload.
const TEXTE = {
  de: {
    blogLesen: 'Blog lesen!',
    blog: 'Blog',
    kontakt: 'Kontakt',
    spracheWaehlen: 'Sprache wählen, aktuell',
    menueOeffnen: 'Menü öffnen',
    menueSchliessen: 'Menü schließen',
    mobileNavigation: 'Navigation',
  },
  en: {
    blogLesen: 'Read the blog!',
    blog: 'Blog',
    kontakt: 'Contact',
    spracheWaehlen: 'Choose language, current',
    menueOeffnen: 'Open menu',
    menueSchliessen: 'Close menu',
    mobileNavigation: 'Navigation',
  },
  fr: {
    blogLesen: 'Lire le blog !',
    blog: 'Blog',
    kontakt: 'Contact',
    spracheWaehlen: 'Choisir la langue, actuelle',
    menueOeffnen: 'Ouvrir le menu',
    menueSchliessen: 'Fermer le menu',
    mobileNavigation: 'Navigation',
  },
  it: {
    blogLesen: 'Leggi il blog!',
    blog: 'Blog',
    kontakt: 'Contatti',
    spracheWaehlen: 'Scegli la lingua, attuale',
    menueOeffnen: 'Apri il menu',
    menueSchliessen: 'Chiudi il menu',
    mobileNavigation: 'Navigazione',
  },
  ru: {
    blogLesen: 'Читать блог!',
    blog: 'Блог',
    kontakt: 'Контакты',
    spracheWaehlen: 'Выбрать язык, текущий',
    menueOeffnen: 'Открыть меню',
    menueSchliessen: 'Закрыть меню',
    mobileNavigation: 'Навигация',
  },
} satisfies Record<SprachCode, Record<string, string>>

export type TextSchluessel = keyof (typeof TEXTE)['de']

export const texte = (sprache: SprachCode) => TEXTE[sprache]
