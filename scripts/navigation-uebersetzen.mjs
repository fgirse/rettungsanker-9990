/**
 * Einmalige Umstellung des Navigations-Globals auf mehrsprachige Texte.
 *
 * Vorher steht in der Datenbank z. B.  label: "Impressum"
 * nachher                               label: { de: "Impressum", en: "Legal notice", … }
 *
 * Erst ausführen, wenn der Code mit `localized: true` live ist – die alte Version
 * kann mit den Sprach-Objekten nichts anfangen.
 * Bereits umgestellte Einträge werden übersprungen, das Skript kann also mehrfach laufen.
 *
 * Aufruf:  node --env-file=.env scripts/navigation-uebersetzen.mjs          (nur anzeigen)
 *          node --env-file=.env scripts/navigation-uebersetzen.mjs --schreiben
 */
import mongoose from 'mongoose'

// Deutscher Text → Übersetzungen. Unbekannte Texte behalten nur Deutsch (Payload zeigt dann überall Deutsch).
const UEBERSETZUNGEN = {
  start: { en: 'home', fr: 'accueil', it: 'home', ru: 'главная' },
  'über uns': { en: 'about us', fr: 'à propos', it: 'chi siamo', ru: 'о нас' },
  Geschichte: { en: 'History', fr: 'Histoire', it: 'Storia', ru: 'История' },
  'Geschichte des Rettungsanker seit der Eröffnung in 2017': {
    en: 'The story of the Rettungsanker since it opened in 2017',
    fr: "L'histoire du Rettungsanker depuis son ouverture en 2017",
    it: "La storia del Rettungsanker dall'apertura nel 2017",
    ru: 'История «Реттунгсанкера» с открытия в 2017 году',
  },
  'Das Team': { en: 'The team', fr: "L'équipe", it: 'Il team', ru: 'Команда' },
  'Das Team des Rettungsankers stellt sich vor!': {
    en: 'Meet the Rettungsanker team!',
    fr: "Découvrez l'équipe du Rettungsanker !",
    it: 'Il team del Rettungsanker si presenta!',
    ru: 'Знакомьтесь с командой «Реттунгсанкера»!',
  },
  angebot: { en: 'offers', fr: 'offre', it: 'offerta', ru: 'предложения' },
  'Getränke und Snacks': {
    en: 'Drinks & snacks',
    fr: 'Boissons et snacks',
    it: 'Bevande e snack',
    ru: 'Напитки и закуски',
  },
  'Für jeden Durst das Richtige und etwas für den kleinen Hunger': {
    en: 'The right drink for every thirst and a bite for when you’re peckish',
    fr: 'De quoi étancher toutes les soifs et de quoi grignoter',
    it: 'Qualcosa per ogni sete e uno spuntino per la fame',
    ru: 'Напитки на любой вкус и закуски к ним',
  },
  'Fussball Live-TV': {
    en: 'Live football on TV',
    fr: 'Football en direct',
    it: 'Calcio in diretta',
    ru: 'Футбол в прямом эфире',
  },
  'Fussball Live-TV: Jeden Samstag Bundesliga SC Freiburg': {
    en: 'Every Saturday: Bundesliga with SC Freiburg, live',
    fr: 'Chaque samedi : la Bundesliga avec le SC Fribourg en direct',
    it: "Ogni sabato: la Bundesliga con l'SC Friburgo in diretta",
    ru: 'Каждую субботу: Бундеслига, «Фрайбург» в прямом эфире',
  },
  kontakt: { en: 'contact', fr: 'contact', it: 'contatti', ru: 'контакты' },
  'wohin ?': { en: 'find us', fr: 'nous trouver', it: 'dove siamo', ru: 'как добраться' },
  info: { en: 'info', fr: 'infos', it: 'info', ru: 'инфо' },
  Impressum: { en: 'Legal notice', fr: 'Mentions légales', it: 'Note legali', ru: 'Выходные данные' },
  'Alles rechtliche': {
    en: 'All the legal details',
    fr: 'Toutes les informations légales',
    it: 'Tutte le informazioni legali',
    ru: 'Вся юридическая информация',
  },
  Datenschutz: { en: 'Privacy policy', fr: 'Confidentialité', it: 'Privacy', ru: 'Конфиденциальность' },
  'Alles was den Datenschutz betrifft': {
    en: 'Everything about data protection',
    fr: 'Tout sur la protection des données',
    it: 'Tutto sulla protezione dei dati',
    ru: 'Всё о защите данных',
  },
}

const schreiben = process.argv.includes('--schreiben')
const fehlend = []

// Macht aus einem einfachen Text ein Sprach-Objekt; schon umgestellte Werte bleiben, wie sie sind
function lokalisiere(wert) {
  if (typeof wert !== 'string') return wert
  if (!UEBERSETZUNGEN[wert]) fehlend.push(wert)
  return { de: wert, ...UEBERSETZUNGEN[wert] }
}

await mongoose.connect(process.env.DATABASE_URL)
const globals = mongoose.connection.db.collection('globals')
const doc = await globals.findOne({ globalType: 'navigation' })
if (!doc) throw new Error('Navigations-Global nicht gefunden')

const menuItems = (doc.menuItems ?? []).map((item) => ({
  ...item,
  label: lokalisiere(item.label),
  subItems: (item.subItems ?? []).map((sub) => ({
    ...sub,
    label: lokalisiere(sub.label),
    ...(sub.description != null && { description: lokalisiere(sub.description) }),
  })),
}))

console.log(JSON.stringify(menuItems, null, 1))
if (fehlend.length) console.warn('\nOhne Übersetzung (bleibt Deutsch):', fehlend)

if (schreiben) {
  await globals.updateOne({ _id: doc._id }, { $set: { menuItems } })
  console.log('\nGespeichert.')
} else {
  console.log('\nNur Vorschau. Mit --schreiben wird gespeichert.')
}

await mongoose.disconnect()
