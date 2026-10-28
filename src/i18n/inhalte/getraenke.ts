import type { SprachCode } from '../sprachen'

// Rubriken und Rahmentexte der Getränkekarte. Die einzelnen Getränke kommen übersetzt aus Payload.
const de = {
  kategorien: {
    biere_vom_fass: { label: 'Biere vom Fass', tagline: 'Frisch gezapft & nordisch herb' },
    biere_in_flaschen: { label: 'Flaschenpost', tagline: 'Vielfältig & für jeden Geschmack' },
    weine: { label: 'Weine', tagline: 'Regional & handverlesen' },
    'cocktails-longdrinks': {
      label: 'Cocktails & Longdrinks',
      tagline: 'Gemixt mit Liebe & einer Prise Wahnsinn',
    },
    'kurze-brände': { label: 'Kurze & Brände', tagline: 'Elztal · Heinemann · Steiger' },
    softdrinks: { label: 'Softdrinks', tagline: 'Cool bleiben!' },
    'kaffee-tee': { label: 'Kaffee & Tee', tagline: 'Warm ums Herz' },
    snacks: { label: 'Snacks', tagline: 'Klein aber oho' },
  },
  auswahl: 'Unsere Auswahl',
  demnaechst: 'Demnächst verfügbar — schau bald wieder vorbei!',
  titel: 'getränkekarte',
  untertitel: 'Was darf es sein? Wir haben für jeden Durst das Richtige.',
  preiseSpecials: 'Alle Preise inkl. MwSt. · Weitere Specials auf Anfrage!',
  prost: 'Prost 🍻 — Der Rettungsanker, Freiburg',
  ganzeKarte: 'Zur ganzen Getränkekarte',
  preise: 'Alle Preise inkl. MwSt.',
}

export type GetraenkeTexte = typeof de

export const GETRAENKE: Record<SprachCode, GetraenkeTexte> = {
  de,
  en: {
    kategorien: {
      biere_vom_fass: { label: 'Beer on tap', tagline: 'Freshly tapped & northern-style bitter' },
      biere_in_flaschen: { label: 'Bottled beers', tagline: 'Plenty of choice for every taste' },
      weine: { label: 'Wines', tagline: 'Regional & hand-picked' },
      'cocktails-longdrinks': {
        label: 'Cocktails & long drinks',
        tagline: 'Mixed with love & a pinch of madness',
      },
      'kurze-brände': { label: 'Shots & spirits', tagline: 'Elztal · Heinemann · Steiger' },
      softdrinks: { label: 'Soft drinks', tagline: 'Stay cool!' },
      'kaffee-tee': { label: 'Coffee & tea', tagline: 'Warms the heart' },
      snacks: { label: 'Snacks', tagline: 'Small but mighty' },
    },
    auswahl: 'Our selection',
    demnaechst: 'Coming soon — check back again!',
    titel: 'drinks menu',
    untertitel: 'What can we get you? We have the right drink for every thirst.',
    preiseSpecials: 'All prices incl. VAT · More specials on request!',
    prost: 'Cheers 🍻 — The Rettungsanker, Freiburg',
    ganzeKarte: 'See the full drinks menu',
    preise: 'All prices incl. VAT',
  },
  fr: {
    kategorien: {
      biere_vom_fass: { label: 'Bières pression', tagline: 'Fraîchement tirées & amères du Nord' },
      biere_in_flaschen: { label: 'Bières en bouteille', tagline: 'Variées & pour tous les goûts' },
      weine: { label: 'Vins', tagline: 'Régionaux & choisis avec soin' },
      'cocktails-longdrinks': {
        label: 'Cocktails & long drinks',
        tagline: 'Mélangés avec amour & une pointe de folie',
      },
      'kurze-brände': { label: 'Shots & eaux-de-vie', tagline: 'Elztal · Heinemann · Steiger' },
      softdrinks: { label: 'Boissons fraîches', tagline: 'Restez cool !' },
      'kaffee-tee': { label: 'Café & thé', tagline: 'Ça réchauffe le cœur' },
      snacks: { label: 'Snacks', tagline: 'Petits mais costauds' },
    },
    auswahl: 'Notre sélection',
    demnaechst: 'Bientôt disponible — revenez vite !',
    titel: 'carte des boissons',
    untertitel: 'Qu’est-ce qui vous ferait plaisir ? Nous avons de quoi étancher toutes les soifs.',
    preiseSpecials: 'Tous les prix TTC · Autres spécialités sur demande !',
    prost: 'Santé 🍻 — Le Rettungsanker, Fribourg',
    ganzeKarte: 'Voir toute la carte',
    preise: 'Tous les prix TTC',
  },
  it: {
    kategorien: {
      biere_vom_fass: { label: 'Birre alla spina', tagline: 'Appena spillate & amare del Nord' },
      biere_in_flaschen: { label: 'Birre in bottiglia', tagline: 'Tante scelte per tutti i gusti' },
      weine: { label: 'Vini', tagline: 'Regionali & selezionati a mano' },
      'cocktails-longdrinks': {
        label: 'Cocktail & long drink',
        tagline: 'Miscelati con amore & un pizzico di follia',
      },
      'kurze-brände': { label: 'Shot & distillati', tagline: 'Elztal · Heinemann · Steiger' },
      softdrinks: { label: 'Bibite', tagline: 'Resta fresco!' },
      'kaffee-tee': { label: 'Caffè & tè', tagline: 'Scaldano il cuore' },
      snacks: { label: 'Snack', tagline: 'Piccoli ma buoni' },
    },
    auswahl: 'La nostra selezione',
    demnaechst: 'Presto disponibile — torna a trovarci!',
    titel: 'carta delle bevande',
    untertitel: 'Cosa ti portiamo? Abbiamo la bevanda giusta per ogni sete.',
    preiseSpecials: 'Tutti i prezzi IVA inclusa · Altre specialità su richiesta!',
    prost: 'Salute 🍻 — Il Rettungsanker, Friburgo',
    ganzeKarte: 'Vai alla carta completa',
    preise: 'Tutti i prezzi IVA inclusa',
  },
  ru: {
    kategorien: {
      biere_vom_fass: { label: 'Разливное пиво', tagline: 'Свежее & по-северному горькое' },
      biere_in_flaschen: { label: 'Бутылочное пиво', tagline: 'Большой выбор на любой вкус' },
      weine: { label: 'Вина', tagline: 'Местные & отобранные вручную' },
      'cocktails-longdrinks': {
        label: 'Коктейли и лонг-дринки',
        tagline: 'Смешаны с любовью и щепоткой безумия',
      },
      'kurze-brände': { label: 'Шоты и крепкое', tagline: 'Elztal · Heinemann · Steiger' },
      softdrinks: { label: 'Безалкогольные напитки', tagline: 'Не теряй хладнокровия!' },
      'kaffee-tee': { label: 'Кофе и чай', tagline: 'Согревает душу' },
      snacks: { label: 'Закуски', tagline: 'Маленькие, да удаленькие' },
    },
    auswahl: 'Наш выбор',
    demnaechst: 'Скоро в меню — заглядывайте!',
    titel: 'меню напитков',
    untertitel: 'Что вам предложить? У нас найдётся напиток для любой жажды.',
    preiseSpecials: 'Все цены с НДС · Другие спецпредложения по запросу!',
    prost: 'Будем здоровы 🍻 — Rettungsanker, Фрайбург',
    ganzeKarte: 'Всё меню напитков',
    preise: 'Все цены с НДС',
  },
}
