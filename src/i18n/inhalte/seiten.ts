import type { SprachCode } from '../sprachen'

// Footer, Seitentitel (Browser-Tab und Suchmaschinen), Unterseiten und der Hinweis auf den Rechtsseiten
const de = {
  meta: {
    titel: 'Rettungsanker-Freiburg',
    beschreibung: 'Die Kiezkneipe',
    getraenkekarte: {
      titel: 'Getränkekarte – Rettungsanker Freiburg',
      beschreibung: 'Unsere Biere, Weine, Cocktails, Softdrinks, Kaffee & Snacks.',
    },
    cocktails: {
      titel: 'Cocktails & Longdrinks – Rettungsanker Freiburg',
      beschreibung: 'Cocktails und Longdrinks im Rettungsanker Freiburg.',
    },
    weine: {
      titel: 'Weine – Rettungsanker Freiburg',
      beschreibung: 'Regionale Weine im Rettungsanker Freiburg.',
    },
    fussball: {
      titel: 'Fußball live – Rettungsanker Freiburg',
      beschreibung: 'SC Freiburg, Europa League und große Turniere live im Rettungsanker.',
    },
  },
  footer: {
    sitemap: 'Sitemap',
    ueberblick: 'Alles Wichtige auf einen Blick',
    ueberUns: 'Über uns',
    getraenkekarte: 'Getränkekarte',
    galerie: 'Galerie',
    team: 'Team',
    kontakt: 'Kontakt',
    anfahrt: 'Anfahrt',
    website: 'Website',
    email: 'E-Mail',
    impressum: 'Impressum',
    datenschutz: 'Datenschutz',
    rechte: 'All rights reserved.',
  },
  geschichte: {
    titel: 'Geschichte des Rettungsankers',
  },
  recht: {
    zurueck: 'Zurück',
    impressum: 'Impressum',
    // Weiches Trennzeichen (\u00AD), damit das lange Wort auf dem Handy sauber umbricht
    datenschutz: 'Datenschutz\u00ADerklärung',
    // Nur in den Fremdsprachen sichtbar: der Rechtstext selbst bleibt deutsch
    hinweis: '',
  },
  biere: {
    titel: 'Unsere Biere',
    untertitel: 'Frisch gezapft und kalt serviert – Prost! 🍺',
    vomFass: 'vom Fass',
    flasche: 'Flasche',
    gemischt: 'Gemischt',
    liter: 'Liter',
    volumen: 'Volumen',
    preis: 'Preis',
    hinweis: 'Hinweis:',
    preiseInkl: 'Alle Preise verstehen sich inkl. MwSt.',
    weitere: 'Weitere Biersorten und Getränke auf Anfrage erhältlich',
    frischGezapft: 'Frisch gezapft',
    eiskalt: 'Eiskalt serviert',
    qualitaet: 'Premium Qualität',
    beschreibungen: {
      flensPils:
        'Frisch gezapftes, hopfenbetontes Pilsener mit der typisch herben Note. Ein Klassiker aus dem hohen Norden!',
      astra:
        'Das Kultbier von der Reeperbahn! Kiezig, herb und mit einem Augenzwinkern. "Was dagegen?"',
      ganter:
        'Naturtrübes Weizenbier aus Freiburg. Spritzig-fruchtig mit feiner Hefenote. Badische Braukunst!',
      radler:
        'Die perfekte Erfrischung! Helles Bier mit naturtrüber Zitronenlimonade. Ideal für heiße Tage.',
      flensDunkel:
        'Malzbetontes, vollmundiges Dunkelbier mit einer leichten Karamellnote. Für Genießer!',
    },
  },
}

export type SeitenTexte = typeof de

export const SEITEN: Record<SprachCode, SeitenTexte> = {
  de,
  en: {
    meta: {
      titel: 'Rettungsanker Freiburg',
      beschreibung: 'The Kiez pub in Freiburg',
      getraenkekarte: {
        titel: 'Drinks menu – Rettungsanker Freiburg',
        beschreibung: 'Our beers, wines, cocktails, soft drinks, coffee & snacks.',
      },
      cocktails: {
        titel: 'Cocktails & long drinks – Rettungsanker Freiburg',
        beschreibung: 'Cocktails and long drinks at the Rettungsanker Freiburg.',
      },
      weine: {
        titel: 'Wines – Rettungsanker Freiburg',
        beschreibung: 'Regional wines at the Rettungsanker Freiburg.',
      },
      fussball: {
        titel: 'Live football – Rettungsanker Freiburg',
        beschreibung: 'SC Freiburg, Europa League and big tournaments live at the Rettungsanker.',
      },
    },
    footer: {
      sitemap: 'Sitemap',
      ueberblick: 'Everything important at a glance',
      ueberUns: 'About us',
      getraenkekarte: 'Drinks menu',
      galerie: 'Gallery',
      team: 'Team',
      kontakt: 'Contact',
      anfahrt: 'Directions',
      website: 'Website',
      email: 'Email',
      impressum: 'Legal notice',
      datenschutz: 'Privacy policy',
      rechte: 'All rights reserved.',
    },
    geschichte: { titel: 'The story of the Rettungsanker' },
    recht: {
      zurueck: 'Back',
      impressum: 'Legal notice',
      datenschutz: 'Privacy policy',
      hinweis:
        'This page is only available in German, as only the German version is legally binding.',
    },
    biere: {
      titel: 'Our beers',
      untertitel: 'Freshly tapped and served cold – cheers! 🍺',
      vomFass: 'on tap',
      flasche: 'bottle',
      gemischt: 'mixed',
      liter: 'litres',
      volumen: 'Volume',
      preis: 'Price',
      hinweis: 'Note:',
      preiseInkl: 'All prices include VAT.',
      weitere: 'More beers and drinks available on request',
      frischGezapft: 'Freshly tapped',
      eiskalt: 'Served ice-cold',
      qualitaet: 'Premium quality',
      beschreibungen: {
        flensPils:
          'Freshly tapped, hoppy pilsner with that typical bitter note. A classic from the far north!',
        astra:
          'The cult beer from the Reeperbahn! Gritty, bitter and with a wink. "Was dagegen?" ("Any objections?")',
        ganter:
          'Cloudy wheat beer from Freiburg. Lively and fruity with a delicate yeast note. Baden brewing at its best!',
        radler:
          'The perfect refresher! Lager mixed with cloudy lemonade. Ideal for hot days.',
        flensDunkel: 'Malty, full-bodied dark beer with a light caramel note. For connoisseurs!',
      },
    },
  },
  fr: {
    meta: {
      titel: 'Rettungsanker Fribourg',
      beschreibung: 'Le bar de quartier à la hambourgeoise',
      getraenkekarte: {
        titel: 'Carte des boissons – Rettungsanker Fribourg',
        beschreibung: 'Nos bières, vins, cocktails, boissons fraîches, cafés & snacks.',
      },
      cocktails: {
        titel: 'Cocktails & long drinks – Rettungsanker Fribourg',
        beschreibung: 'Cocktails et long drinks au Rettungsanker de Fribourg.',
      },
      weine: {
        titel: 'Vins – Rettungsanker Fribourg',
        beschreibung: 'Vins régionaux au Rettungsanker de Fribourg.',
      },
      fussball: {
        titel: 'Football en direct – Rettungsanker Fribourg',
        beschreibung: 'SC Fribourg, Ligue Europa et grands tournois en direct au Rettungsanker.',
      },
    },
    footer: {
      sitemap: 'Plan du site',
      ueberblick: 'L’essentiel en un coup d’œil',
      ueberUns: 'À propos',
      getraenkekarte: 'Carte des boissons',
      galerie: 'Galerie',
      team: 'Équipe',
      kontakt: 'Contact',
      anfahrt: 'Accès',
      website: 'Site web',
      email: 'E-mail',
      impressum: 'Mentions légales',
      datenschutz: 'Confidentialité',
      rechte: 'Tous droits réservés.',
    },
    geschichte: { titel: 'L’histoire du Rettungsanker' },
    recht: {
      zurueck: 'Retour',
      impressum: 'Mentions légales',
      datenschutz: 'Politique de confidentialité',
      hinweis:
        'Cette page n’est disponible qu’en allemand, car seule la version allemande fait juridiquement foi.',
    },
    biere: {
      titel: 'Nos bières',
      untertitel: 'Fraîchement tirées et servies bien froides – santé ! 🍺',
      vomFass: 'pression',
      flasche: 'bouteille',
      gemischt: 'panaché',
      liter: 'litre',
      volumen: 'Volume',
      preis: 'Prix',
      hinweis: 'Remarque :',
      preiseInkl: 'Tous les prix s’entendent TTC.',
      weitere: 'Autres bières et boissons disponibles sur demande',
      frischGezapft: 'Fraîchement tirée',
      eiskalt: 'Servie glacée',
      qualitaet: 'Qualité premium',
      beschreibungen: {
        flensPils:
          'Pils fraîchement tirée, bien houblonnée, avec sa note amère typique. Un classique du Grand Nord !',
        astra:
          'La bière culte de la Reeperbahn ! Canaille, amère et pleine de malice. « Was dagegen ? » (« Une objection ? »)',
        ganter:
          'Bière blanche non filtrée de Fribourg. Pétillante et fruitée, avec une fine note de levure. Le savoir-faire badois !',
        radler:
          'Le rafraîchissement parfait ! Bière blonde et limonade citron trouble. Idéal par temps chaud.',
        flensDunkel: 'Bière brune maltée et ronde, avec une légère note de caramel. Pour les connaisseurs !',
      },
    },
  },
  it: {
    meta: {
      titel: 'Rettungsanker Friburgo',
      beschreibung: 'Il pub di quartiere in stile amburghese',
      getraenkekarte: {
        titel: 'Carta delle bevande – Rettungsanker Friburgo',
        beschreibung: 'Le nostre birre, vini, cocktail, bibite, caffè & snack.',
      },
      cocktails: {
        titel: 'Cocktail & long drink – Rettungsanker Friburgo',
        beschreibung: 'Cocktail e long drink al Rettungsanker di Friburgo.',
      },
      weine: {
        titel: 'Vini – Rettungsanker Friburgo',
        beschreibung: 'Vini regionali al Rettungsanker di Friburgo.',
      },
      fussball: {
        titel: 'Calcio in diretta – Rettungsanker Friburgo',
        beschreibung: 'SC Friburgo, Europa League e grandi tornei in diretta al Rettungsanker.',
      },
    },
    footer: {
      sitemap: 'Mappa del sito',
      ueberblick: 'Tutto l’essenziale a colpo d’occhio',
      ueberUns: 'Chi siamo',
      getraenkekarte: 'Carta delle bevande',
      galerie: 'Galleria',
      team: 'Team',
      kontakt: 'Contatti',
      anfahrt: 'Come arrivare',
      website: 'Sito web',
      email: 'E-mail',
      impressum: 'Note legali',
      datenschutz: 'Privacy',
      rechte: 'Tutti i diritti riservati.',
    },
    geschichte: { titel: 'La storia del Rettungsanker' },
    recht: {
      zurueck: 'Indietro',
      impressum: 'Note legali',
      datenschutz: 'Informativa sulla privacy',
      hinweis:
        'Questa pagina è disponibile solo in tedesco, perché solo la versione tedesca è giuridicamente vincolante.',
    },
    biere: {
      titel: 'Le nostre birre',
      untertitel: 'Appena spillate e servite fredde – salute! 🍺',
      vomFass: 'alla spina',
      flasche: 'bottiglia',
      gemischt: 'mista',
      liter: 'litri',
      volumen: 'Quantità',
      preis: 'Prezzo',
      hinweis: 'Nota:',
      preiseInkl: 'Tutti i prezzi sono IVA inclusa.',
      weitere: 'Altre birre e bevande disponibili su richiesta',
      frischGezapft: 'Appena spillata',
      eiskalt: 'Servita ghiacciata',
      qualitaet: 'Qualità premium',
      beschreibungen: {
        flensPils:
          'Pils appena spillata, luppolata, con la tipica nota amara. Un classico del profondo Nord!',
        astra:
          'La birra di culto della Reeperbahn! Sfrontata, amara e con l’occhiolino. «Was dagegen?» («Qualcosa in contrario?»)',
        ganter:
          'Birra di frumento non filtrata di Friburgo. Frizzante e fruttata, con una delicata nota di lievito. L’arte birraia del Baden!',
        radler:
          'Il rinfresco perfetto! Birra chiara con limonata torbida al limone. Ideale nelle giornate calde.',
        flensDunkel: 'Birra scura maltata e corposa, con una leggera nota di caramello. Per intenditori!',
      },
    },
  },
  ru: {
    meta: {
      titel: 'Rettungsanker Фрайбург',
      beschreibung: 'Пивной бар в гамбургском стиле',
      getraenkekarte: {
        titel: 'Меню напитков – Rettungsanker Фрайбург',
        beschreibung: 'Наше пиво, вина, коктейли, безалкогольные напитки, кофе и закуски.',
      },
      cocktails: {
        titel: 'Коктейли и лонг-дринки – Rettungsanker Фрайбург',
        beschreibung: 'Коктейли и лонг-дринки в Rettungsanker во Фрайбурге.',
      },
      weine: {
        titel: 'Вина – Rettungsanker Фрайбург',
        beschreibung: 'Местные вина в Rettungsanker во Фрайбурге.',
      },
      fussball: {
        titel: 'Футбол в прямом эфире – Rettungsanker Фрайбург',
        beschreibung: '«Фрайбург», Лига Европы и крупные турниры в прямом эфире в Rettungsanker.',
      },
    },
    footer: {
      sitemap: 'Карта сайта',
      ueberblick: 'Всё важное с первого взгляда',
      ueberUns: 'О нас',
      getraenkekarte: 'Меню напитков',
      galerie: 'Галерея',
      team: 'Команда',
      kontakt: 'Контакты',
      anfahrt: 'Как добраться',
      website: 'Сайт',
      email: 'E-mail',
      impressum: 'Выходные данные',
      datenschutz: 'Конфиденциальность',
      rechte: 'Все права защищены.',
    },
    geschichte: { titel: 'История Rettungsanker' },
    recht: {
      zurueck: 'Назад',
      impressum: 'Выходные данные',
      datenschutz: 'Политика конфиденциальности',
      hinweis:
        'Эта страница доступна только на немецком языке, так как юридическую силу имеет только немецкая версия.',
    },
    biere: {
      titel: 'Наше пиво',
      untertitel: 'Свежее и холодное – будем здоровы! 🍺',
      vomFass: 'разливное',
      flasche: 'бутылка',
      gemischt: 'смешанное',
      liter: 'л',
      volumen: 'Объём',
      preis: 'Цена',
      hinweis: 'Примечание:',
      preiseInkl: 'Все цены указаны с НДС.',
      weitere: 'Другие сорта пива и напитки – по запросу',
      frischGezapft: 'Свежий розлив',
      eiskalt: 'Подаётся ледяным',
      qualitaet: 'Премиум-качество',
      beschreibungen: {
        flensPils:
          'Свежий хмелевой пилснер с типичной горчинкой. Классика с крайнего севера!',
        astra:
          'Культовое пиво с Репербана! Дерзкое, горькое и с подмигиванием. «Was dagegen?» («Есть возражения?»)',
        ganter:
          'Нефильтрованное пшеничное пиво из Фрайбурга. Игристое и фруктовое, с тонкой дрожжевой ноткой. Баденское пивоварение!',
        radler:
          'Идеальное освежение! Светлое пиво с мутным лимонадом. Лучше всего в жаркие дни.',
        flensDunkel: 'Солодовое насыщенное тёмное пиво с лёгкой карамельной ноткой. Для ценителей!',
      },
    },
  },
}
