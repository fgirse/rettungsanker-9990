/**
 * Einmalige Umstellung der CMS-Inhalte auf mehrsprachige Felder:
 * „Über uns“, Angebot des Monats und alle Einträge der Getränkekarte.
 *
 * Vorher steht in der Datenbank z. B.  beschreibung: "alkoholfrei"
 * nachher                               beschreibung: { de: "alkoholfrei", en: "alcohol-free", … }
 *
 * Erst ausführen, wenn der Code mit `localized: true` live ist (wie beim Navigations-Skript).
 * Unbekannte Texte bekommen nur Deutsch; Payload zeigt dann in allen Sprachen den deutschen Text.
 * Bereits umgestellte Felder werden übersprungen, das Skript kann also mehrfach laufen.
 *
 * Aufruf:  node --env-file=.env scripts/inhalte-uebersetzen.mjs          (nur anzeigen)
 *          node --env-file=.env scripts/inhalte-uebersetzen.mjs --schreiben
 */
import mongoose from 'mongoose'

const SPRACHEN = ['en', 'fr', 'it', 'ru']

// ── Getränkekarte: Namen (nur allgemeine Bezeichnungen, Marken bleiben) ─────────
const ARTIKEL = {
  Kaffee: { en: 'Coffee', fr: 'Café', it: 'Caffè', ru: 'Кофе' },
  Tee: { en: 'Tea', fr: 'Thé', it: 'Tè', ru: 'Чай' },
  'Elsässer Flammkuchen': {
    en: 'Alsatian tarte flambée',
    fr: 'Tarte flambée alsacienne',
    it: 'Flammkuchen alsaziana',
    ru: 'Эльзасский тарт фламбе',
  },
  'Weinschorle vom Gutedel': {
    en: 'Gutedel wine spritzer',
    fr: 'Gutedel coupé d’eau gazeuse',
    it: 'Spritz di Gutedel',
    ru: 'Винный шорле из Гутэделя',
  },
  'Weinschorle vom Burgunder': {
    en: 'Pinot wine spritzer',
    fr: 'Pinot coupé d’eau gazeuse',
    it: 'Spritz di Pinot',
    ru: 'Винный шорле из Пино',
  },
  'Weisser Burgunder Sekt': {
    en: 'Pinot Blanc sparkling wine',
    fr: 'Mousseux de Pinot blanc',
    it: 'Spumante di Pinot bianco',
    ru: 'Игристое Пино Блан',
  },
  Tafelwasser: { en: 'Table water', fr: 'Eau de table', it: 'Acqua da tavola', ru: 'Столовая вода' },
  'Saft Schorle': {
    en: 'Juice spritzer',
    fr: 'Jus coupé d’eau gazeuse',
    it: 'Succo con acqua frizzante',
    ru: 'Сок с газированной водой',
  },
  'Energy Drink': { en: 'Energy drink', fr: 'Boisson énergisante', it: 'Energy drink', ru: 'Энергетик' },
  'Treibholz mit Bier': {
    en: 'Driftwood board with beer',
    fr: 'Planche « bois flotté » avec bière',
    it: 'Tavola «legno di mare» con birra',
    ru: '«Плавник» с пивом',
  },
  'Eierlikör mit Zimt': {
    en: 'Egg liqueur with cinnamon',
    fr: 'Liqueur aux œufs à la cannelle',
    it: 'Liquore all’uovo con cannella',
    ru: 'Яичный ликёр с корицей',
  },
}

// ── Getränkekarte: Beschreibungen ──────────────────────────────────────────────
const WEINGUT = {
  en: 'Heinemann winery, Scherzingen',
  fr: 'Domaine Heinemann, Scherzingen',
  it: 'Cantina Heinemann, Scherzingen',
  ru: 'Винодельня Heinemann, Шерцинген',
}
const OHNE_FILTER = {
  en: 'unfiltered: the rustic beer from the Black Forest',
  fr: 'non filtrée : la bière authentique de la Forêt-Noire',
  it: 'non filtrata: la birra genuina della Foresta Nera',
  ru: 'без фильтрации: самобытное пиво из Шварцвальда',
}
const ALKOHOLFREI = { en: 'alcohol-free', fr: 'sans alcool', it: 'analcolica', ru: 'безалкогольное' }
const ALKOHOLFREIE_LONGDRINKS = {
  en: 'Alcohol-free long drink',
  fr: 'Long drink sans alcool',
  it: 'Long drink analcolico',
  ru: 'Безалкогольный лонг-дринк',
}

const BESCHREIBUNG = {
  'Das kühle,herbe Blonde von der Waterkant': {
    en: 'The cool, bitter blonde from the North Sea coast',
    fr: 'La blonde fraîche et amère de la côte nord',
    it: 'La bionda fresca e amara della costa del Nord',
    ru: 'Прохладное горьковатое светлое с северного побережья',
  },
  'ohne Filter: das Urige aus dem Schwarzwald': OHNE_FILTER,
  'ohne Filter - das Urige Bier vom Schwarzwald': OHNE_FILTER,
  'earl gray - pfefferminz - hagebutte': {
    en: 'Earl Grey – peppermint – rosehip',
    fr: 'Earl Grey – menthe poivrée – églantier',
    it: 'Earl Grey – menta piperita – rosa canina',
    ru: 'эрл грей – мята перечная – шиповник',
  },
  'Das Kultbier vom Kiez': {
    en: 'The cult beer from Hamburg’s Kiez',
    fr: 'La bière culte du Kiez de Hambourg',
    it: 'La birra di culto del Kiez di Amburgo',
    ru: 'Культовое пиво из гамбургского квартала Киц',
  },
  alkoholfrei: ALKOHOLFREI,
  klassich: { en: 'classic', fr: 'classique', it: 'classica', ru: 'классический' },
  'Waterkant (mit Lachs)': {
    en: 'Waterkant (with salmon)',
    fr: 'Waterkant (au saumon)',
    it: 'Waterkant (con salmone)',
    ru: 'Waterkant (с лососем)',
  },
  vegetarisch: { en: 'vegetarian', fr: 'végétarienne', it: 'vegetariana', ru: 'вегетарианский' },
  'Weingut Heinemann, Scherzingen': WEINGUT,
  'Weingut Heinemann, Scherzigen': WEINGUT,
  'Weingut Heinemann Scherzingen': WEINGUT,
  'Gutedel und Mineralwasser': {
    en: 'Gutedel and sparkling water',
    fr: 'Gutedel et eau minérale',
    it: 'Gutedel e acqua minerale',
    ru: 'Гутэдель и минеральная вода',
  },
  'Aperol/ Guedel/ Mineralwasser': {
    en: 'Aperol / Gutedel / sparkling water',
    fr: 'Aperol / Gutedel / eau minérale',
    it: 'Aperol / Gutedel / acqua minerale',
    ru: 'Апероль / Гутэдель / минеральная вода',
  },
  '6 x 0.33 Liter mit Bier nach Wahl': {
    en: '6 × 0.33 l with the beer of your choice',
    fr: '6 × 0,33 l avec la bière de votre choix',
    it: '6 × 0,33 l con birra a scelta',
    ru: '6 × 0,33 л пива на выбор',
  },
  'weiss, grau, rosé oder rot': {
    en: 'white, grey, rosé or red',
    fr: 'blanc, gris, rosé ou rouge',
    it: 'bianco, grigio, rosato o rosso',
    ru: 'белое, серое, розовое или красное',
  },
  'Wodka Soda': { en: 'Vodka soda', fr: 'Vodka soda', it: 'Vodka soda', ru: 'Водка с содовой' },
  'Alkoholfreie Longdrinks': ALKOHOLFREIE_LONGDRINKS,
}

// ── Getränkekarte: Mengenangaben – nur die Einheit wird übersetzt ──────────────
const EINHEIT = {
  Liter: { en: 'l', fr: 'l', it: 'l', ru: 'л' },
  Tasse: { en: 'cup', fr: 'tasse', it: 'tazza', ru: 'чашка' },
}
function volumenUebersetzung(text) {
  const ergebnis = {}
  for (const sprache of SPRACHEN) {
    let neu = text
    for (const [wort, uebersetzt] of Object.entries(EINHEIT)) {
      neu = neu.replace(new RegExp(`\\b${wort}\\b`, 'g'), uebersetzt[sprache])
    }
    // Englisch schreibt den Dezimalpunkt, die anderen Sprachen das Komma
    neu = sprache === 'en' ? neu : neu.replace(/(\d)\.(\d)/g, '$1,$2')
    if (neu !== text) ergebnis[sprache] = neu
  }
  return ergebnis
}

// ── Über uns ───────────────────────────────────────────────────────────────────
const ABOUT_TEXT = {
  en: 'In homage to a typical Kiez pub in Hamburg’s St. Pauli, we opened a bar in the heart of Freiburg that you probably won’t find a second time south of the Elbe. Fitted out like a ship’s hull and located in the middle of the old town, the Rettungsanker Freiburg is the ideal place to unwind after work and meet nice people. We are proud of our colourful, international crowd. Our Rettungsanker is also the ideal location for your private or business event. Talk to us here at the bar or send us an email. We look forward to welcoming you to the Rettungsanker.',
  fr: 'En hommage à un bar de quartier typique de St. Pauli à Hambourg, nous avons ouvert au cœur de Fribourg un lieu comme il n’en existe sans doute nulle part ailleurs au sud de l’Elbe. Aménagé comme une coque de navire et situé au centre de la vieille ville, le Rettungsanker Fribourg est l’endroit idéal pour se détendre après le travail et faire de belles rencontres. Nous sommes fiers de notre public bigarré et international. Le Rettungsanker est aussi le lieu idéal pour vos événements privés ou professionnels. Parlez-nous-en sur place ou écrivez-nous un e-mail. Nous nous réjouissons de vous accueillir au Rettungsanker.',
  it: 'In omaggio a un tipico pub di quartiere di St. Pauli ad Amburgo, abbiamo aperto nel cuore di Friburgo un locale che probabilmente non troverai una seconda volta a sud dell’Elba. Arredato come lo scafo di una nave e situato nel centro del centro storico, il Rettungsanker Friburgo è il posto ideale per rilassarsi dopo il lavoro e conoscere gente simpatica. Siamo orgogliosi del nostro pubblico variopinto e internazionale. Il Rettungsanker è anche la location ideale per il tuo evento privato o aziendale. Parlane con noi sul posto o scrivici un’e-mail. Saremo felici di darti il benvenuto al Rettungsanker.',
  ru: 'В честь типичного пивного бара в гамбургском квартале Санкт-Паули мы открыли в самом сердце Фрайбурга заведение, второго такого к югу от Эльбы, пожалуй, не найти. Оформленный как корпус корабля и расположенный в центре старого города, Rettungsanker Freiburg – идеальное место, чтобы расслабиться после работы и познакомиться с приятными людьми. Мы гордимся нашей пёстрой интернациональной публикой. Rettungsanker – также идеальное место для вашего частного или корпоративного мероприятия. Обращайтесь к нам на месте или пишите на e-mail. Будем рады видеть вас в Rettungsanker.',
}

// ── Angebot des Monats ─────────────────────────────────────────────────────────
const ANGEBOT = {
  'Unser November Hit': {
    en: 'Our November hit',
    fr: 'Notre coup de cœur de novembre',
    it: 'Il nostro hit di novembre',
    ru: 'Наш хит ноября',
  },
  'Bier des Monats': {
    en: 'Beer of the month',
    fr: 'Bière du mois',
    it: 'Birra del mese',
    ru: 'Пиво месяца',
  },
}

// ── Hilfsfunktionen ────────────────────────────────────────────────────────────
const schreiben = process.argv.includes('--schreiben')
const ohneUebersetzung = new Set()

// Schon umgestellt = Objekt mit Sprachschlüssel "de"
const istLokalisiert = (wert) =>
  wert !== null && typeof wert === 'object' && !Array.isArray(wert) && 'de' in wert

// Text → { de, en, … } anhand einer Tabelle; fehlt der Eintrag, bleibt nur Deutsch
function textFeld(wert, tabelle) {
  if (wert == null || wert === '' || istLokalisiert(wert)) return undefined
  const uebersetzt = typeof tabelle === 'function' ? tabelle(wert) : tabelle[wert]
  if (!uebersetzt || !Object.keys(uebersetzt).length) ohneUebersetzung.add(wert)
  return { de: wert, ...uebersetzt }
}

// Richtext (Lexical) mit genau einem Textknoten: Struktur kopieren, nur den Text tauschen
function richTextFeld(wert, uebersetzungen) {
  if (wert == null || istLokalisiert(wert)) return undefined
  const ergebnis = { de: wert }
  for (const [sprache, text] of Object.entries(uebersetzungen)) {
    const kopie = structuredClone(wert)
    const knoten = []
    const sammle = (k) => {
      if (k?.type === 'text') knoten.push(k)
      ;(k?.children ?? []).forEach(sammle)
    }
    sammle(kopie.root)
    if (knoten.length !== 1) throw new Error(`Über-uns-Text hat ${knoten.length} Textknoten, erwartet 1`)
    knoten[0].text = text
    ergebnis[sprache] = kopie
  }
  return ergebnis
}

// Nur geänderte Felder ins $set übernehmen
function aenderungen(felder) {
  return Object.fromEntries(Object.entries(felder).filter(([, wert]) => wert !== undefined))
}

// ── Ablauf ─────────────────────────────────────────────────────────────────────
await mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection.db
const plan = []

for (const doc of await db.collection('abouts').find().toArray()) {
  const set = aenderungen({
    title_about: textFeld(doc.title_about, () => ({})),
    content_about: richTextFeld(doc.content_about, ABOUT_TEXT),
  })
  if (Object.keys(set).length) plan.push({ sammlung: 'abouts', _id: doc._id, set })
}

const angebot = await db.collection('globals').findOne({ globalType: 'productOfTheMonth' })
if (angebot) {
  const set = aenderungen({
    title: textFeld(angebot.title, ANGEBOT),
    subtitle: textFeld(angebot.subtitle, ANGEBOT),
    description: textFeld(angebot.description, () => ({})),
    badge: textFeld(angebot.badge, () => ({})),
  })
  if (Object.keys(set).length) plan.push({ sammlung: 'globals', _id: angebot._id, set })
}

for (const doc of await db.collection('getraenkekartes').find().toArray()) {
  const set = aenderungen({
    artikel: textFeld(doc.artikel, (w) => ARTIKEL[w] ?? {}),
    beschreibung: textFeld(doc.beschreibung, BESCHREIBUNG),
    volumen: textFeld(doc.volumen, volumenUebersetzung),
  })
  if (Object.keys(set).length) plan.push({ sammlung: 'getraenkekartes', _id: doc._id, set })
}

// Kurze Vorschau: pro Dokument die deutschen Werte und die englische Fassung
for (const { sammlung, set } of plan) {
  const zeile = Object.entries(set)
    .map(([feld, wert]) =>
      typeof wert.de === 'string' ? `${feld}: "${wert.de}" → "${wert.en ?? '(de)'}"` : `${feld}: Richtext`,
    )
    .join(' | ')
  console.log(`${sammlung}: ${zeile}`)
}
console.log(`\n${plan.length} Dokumente zu ändern.`)
// Namen und Mengen ohne Übersetzung sind meist Marken („Astra“) oder Zahlen („2 cl“) – gewollt
console.log('Ohne Übersetzung (bleibt deutsch):', [...ohneUebersetzung].join(' · '))

if (schreiben) {
  for (const { sammlung, _id, set } of plan) {
    await db.collection(sammlung).updateOne({ _id }, { $set: set })
  }
  console.log('\nGespeichert.')
} else {
  console.log('\nNur Vorschau. Mit --schreiben wird gespeichert.')
}

await mongoose.disconnect()
