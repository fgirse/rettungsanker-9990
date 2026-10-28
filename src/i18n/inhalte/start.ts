import type { SprachCode } from '../sprachen'

// Feste Texte der Startseite (Hero, Über uns, Angebot, Fußball, Galerie, Team, Wohin).
// Deutsch ist die Vorlage; die anderen Sprachen müssen dieselben Schlüssel haben.
const de = {
  hero: {
    logoAlt: 'Rettungsanker Logo',
    filmAb: 'film ab!',
    filmTitel: 'Rettungsanker – Weltraumflug mit Layla',
    filmAbspielen: 'Film abspielen',
    filmSchliessen: 'Film schließen',
    schliessen: 'Schließen',
  },
  angebot: {
    rundschrift: 'Angebot des Monats ★',
    titel: 'Angebot des Monats',
    detailsOeffnen: 'Details öffnen',
    schliessen: 'Schließen',
  },
  about: {
    ueberschrift: '| about us',
    leuchtturmAlt: 'Leuchtturm',
    portraitAlt: 'Portrait Michael Schreck',
    und: 'und',
    team: 'das Team des Rettungsankers',
    weiter: 'scrolling down',
    pfeilAlt: 'Pfeil nach unten',
  },
  bento: {
    philosophie: 'gastlichkeit ist unsere philosophie',
    angebot: 'unser angebot',
    einleitung:
      'Erleben Sie norddeutsche Gastfreundschaft mit netten Gästen und unvergesslichen Momenten.',
    highlight: 'Highlight',
    kacheln: {
      bier: {
        title: 'bier vom fass',
        content:
          'Flensburger Pils - das kühle Blonde von der Waterkant. Astra-Pils - das Kultbier natürlich direkt vom Kiez !',
        imageAlt: 'Frisch gezapftes Flensburger Bier',
      },
      weine: {
        title: 'regionale weine',
        content:
          'Qualitativ hochwertige Weine aus der Region Kaiserstuhl und dem Markgräflerland. Hauslieferant Weingut Heinemann Scherzingen.',
        imageAlt: 'Bunte Weinflaschen in Aquarell-Stil',
      },
      cocktails: {
        title: 'cocktails & longdrinks',
        content:
          'Zahlreiche internationale Longdrinks und Cocktails - alles was das Herz begehrt. Zahlreiche "Kurze" für jeden Geschmack.',
        imageAlt: 'Cocktailglas Illustration',
      },
      fussball: {
        title: 'fussball live-tv',
        content:
          'Jeden Samstag-Spieltag der laufenden Bundesliga-Saison Live TV Event in unserer Sportarena natürlich mit Schwerpunkt unseres SC Freiburgs. Wann immer möglich auch Spiele der Champions League und natürlich der grossen Turniere von EM und WM. Bei Topspielen des SC Freiburg mit grosser Publikumsnachfrage sind Reservierungen über unser Booking-Tool zu empfehlen - Unten folgender Button und Du bist direkt dabei !',
        imageAlt: 'Fußball Illustration',
        buttonLabel: 'Reservierung Live-TV',
      },
      party: {
        title: 'party & events',
        content:
          'Der Rettungsanker ist die ideale Location für Ihren privaten oder Business Event. Im Rahmen einer "geschlossenen Gesellschaft" stehen Ihnen die Räumlichkeiten des Rettungsankers zur Verfügung. Auf Wunsch Catering durch unseren Kooperationspartner möglich ! Sprechen Sie uns an oder kontaktieren Sie uns per E-Mail.',
        imageAlt: 'Party Crowd in Aquarell-Stil',
      },
      albers: {
        title: 'hans albers',
        content:
          " Hans Phillip August Albers (* 22.September 1891 in Hamburg , 24. Juli 1960 in Berg, Bayern) war ein deutscher Schauspieler und Sänger, der als 'blonder Hans' Volksidol wurde. Zu den bekanntesten Spielfilmen in denen er mitwirkte gehören 'der Mann, der Sherlock Holmes war' (1937), 'Münchhausen' (1943), 'die grosse Freiheit Nr.7' (1943) sowie 'Auf der Reeperbahn Nachts um halb eins'",
        imageAlt: 'Hans Albers Illustration als Seemann',
      },
      logoNeu: {
        title: 'neues logo',
        content:
          ' Unser neues Logo symbolisiert die Verbindung von Tradition und Moderne. Das alte Rettungsanker Logo ist im oberen Drittel erhalten geblieben. Das mittlere Drittel beschreibt den Rettungsanker als Treffpunkt für Jung und Alt. Das untere Drittel zeigt eine Silhouette der Stadt Freiburg. Wir freuen uns, Sie unter unserem neuen Zeichen willkommen zu heißen!',
        imageAlt: 'Neues Logo Illustration',
      },
    },
  },
  liveTv: {
    zeile1: 'Fussball',
    zeile2: 'live tv',
    text: 'Jeden Bundesligaspieltag: live TV die Spiele unseres SC Freiburg. Alle Euro-League Spiele des SC Freiburg! Ausgewählte Spiele der Champions-League und Spiele der grossen Turniere von UEFA EM- und FIFA WM Turnieren.',
    reservierung: 'Reservierung Live TV',
    spieltag: 'Spieltag',
    rang: 'Rang',
    punkte: 'Punkte',
    tore: 'Tore',
    // Kürzel für Siege, Unentschieden, Niederlagen
    s: 'S',
    u: 'U',
    n: 'N',
  },
  galerie: {
    titel: 'galerie',
  },
  team: {
    titel: 'unser team',
    text: 'Wir sind eine dynamische, bunte Crew, welche mit Leidenschaft Gastro lebt und sich schon jetzt auf Deinen Besuch im Rettungsanker freut!',
    rollen: {
      captain: 'Captain',
      obermaat: 'Obermaat',
      offizierin1: 'I. Offizierin',
      offizierin2: 'II. Offizierin',
      offizier2: 'II. Offizier',
      steward: 'Steward',
      funker: 'Funker',
    },
  },
  wohin: {
    titel: 'Wohin ?',
    text: 'Sie finden die genaue Lage unseres Rettungsankers in der Kartenillustration der Altstadt Freiburg oder ganz professionell in Open-Street-Map',
    karteAltstadt: 'Karte Altstadt',
    karteAltstadtTipp: 'öffne Kartenillustration Alt-Freiburg !!!',
    karteAltstadtAlt: 'Illustration Altstadt',
    karteAltstadtUnterschrift: 'Illustration Altstadt Freiburg',
    osm: 'Openstreet Map',
    osmTipp: 'Click zu Karte Openstreet!!!',
    zurueck: 'zurück',
    haltestelle: 'Haltestelle:',
    linien: 'Linie 1, 3 und 5',
  },
}

export type StartTexte = typeof de

export const START: Record<SprachCode, StartTexte> = {
  de,
  en: {
    hero: {
      logoAlt: 'Rettungsanker logo',
      filmAb: 'roll film!',
      filmTitel: 'Rettungsanker – space flight with Layla',
      filmAbspielen: 'Play film',
      filmSchliessen: 'Close film',
      schliessen: 'Close',
    },
    angebot: {
      rundschrift: 'Offer of the month ★',
      titel: 'Offer of the month',
      detailsOeffnen: 'open details',
      schliessen: 'Close',
    },
    about: {
      ueberschrift: '| about us',
      leuchtturmAlt: 'Lighthouse',
      portraitAlt: 'Portrait of Michael Schreck',
      und: 'and',
      team: 'the Rettungsanker team',
      weiter: 'scroll down',
      pfeilAlt: 'Arrow pointing down',
    },
    bento: {
      philosophie: 'hospitality is our philosophy',
      angebot: 'what we offer',
      einleitung:
        'Enjoy northern German hospitality with friendly guests and unforgettable moments.',
      highlight: 'Highlight',
      kacheln: {
        bier: {
          title: 'beer on tap',
          content:
            'Flensburger Pils – the cool blonde from the North Sea coast. Astra Pils – the cult beer, straight from Hamburg’s Kiez, of course!',
          imageAlt: 'Freshly tapped Flensburger beer',
        },
        weine: {
          title: 'regional wines',
          content:
            'High-quality wines from the Kaiserstuhl and Markgräflerland regions. Our house supplier is the Heinemann winery in Scherzingen.',
          imageAlt: 'Colourful wine bottles in watercolour style',
        },
        cocktails: {
          title: 'cocktails & long drinks',
          content:
            'Plenty of international long drinks and cocktails – everything your heart desires. And lots of shots for every taste.',
          imageAlt: 'Cocktail glass illustration',
        },
        fussball: {
          title: 'live football on tv',
          content:
            'Every Saturday matchday of the current Bundesliga season is a live TV event in our sports arena – with a focus on our SC Freiburg, of course. Whenever possible we also show Champions League matches and the big tournaments, the Euros and the World Cup. For SC Freiburg’s top matches with high demand we recommend booking via our reservation tool – use the button below and you’re in!',
          imageAlt: 'Football illustration',
          buttonLabel: 'Book live TV',
        },
        party: {
          title: 'parties & events',
          content:
            'The Rettungsanker is the ideal location for your private or business event. As a “private party” the whole Rettungsanker is yours. Catering by our partner is available on request! Talk to us or contact us by email.',
          imageAlt: 'Party crowd in watercolour style',
        },
        albers: {
          title: 'hans albers',
          content:
            "Hans Philipp August Albers (born 22 September 1891 in Hamburg, died 24 July 1960 in Berg, Bavaria) was a German actor and singer who became a popular idol as 'blond Hans'. His best-known films include 'The Man Who Was Sherlock Holmes' (1937), 'Münchhausen' (1943), 'Große Freiheit Nr. 7' (1943) and 'Auf der Reeperbahn nachts um halb eins'.",
          imageAlt: 'Illustration of Hans Albers as a sailor',
        },
        logoNeu: {
          title: 'our new logo',
          content:
            'Our new logo stands for the link between tradition and modernity. The top third keeps the old Rettungsanker logo. The middle third shows the Rettungsanker as a meeting place for young and old. The bottom third shows the silhouette of Freiburg. We look forward to welcoming you under our new sign!',
          imageAlt: 'New logo illustration',
        },
      },
    },
    liveTv: {
      zeile1: 'football',
      zeile2: 'live tv',
      text: 'Every Bundesliga matchday: our SC Freiburg live on TV. All of SC Freiburg’s Europa League matches! Selected Champions League matches and the big tournaments – the UEFA Euros and the FIFA World Cup.',
      reservierung: 'Book live TV',
      spieltag: 'Matchday',
      rang: 'Rank',
      punkte: 'Points',
      tore: 'Goals',
      s: 'W',
      u: 'D',
      n: 'L',
    },
    galerie: { titel: 'gallery' },
    team: {
      titel: 'our team',
      text: 'We are a lively, colourful crew who live hospitality with passion and are already looking forward to your visit to the Rettungsanker!',
      rollen: {
        captain: 'Captain',
        obermaat: 'Bosun',
        offizierin1: 'First Officer',
        offizierin2: 'Second Officer',
        offizier2: 'Second Officer',
        steward: 'Steward',
        funker: 'Radio Operator',
      },
    },
    wohin: {
      titel: 'Find us',
      text: 'You can find the exact location of our Rettungsanker on the illustrated map of Freiburg’s old town – or, the professional way, on OpenStreetMap.',
      karteAltstadt: 'Old town map',
      karteAltstadtTipp: 'open the illustrated map of old Freiburg!',
      karteAltstadtAlt: 'Illustrated map of the old town',
      karteAltstadtUnterschrift: 'Illustrated map of Freiburg’s old town',
      osm: 'OpenStreetMap',
      osmTipp: 'Click for OpenStreetMap!',
      zurueck: 'back',
      haltestelle: 'Tram stop:',
      linien: 'Lines 1, 3 and 5',
    },
  },
  fr: {
    hero: {
      logoAlt: 'Logo du Rettungsanker',
      filmAb: 'moteur !',
      filmTitel: 'Rettungsanker – vol spatial avec Layla',
      filmAbspielen: 'Lancer le film',
      filmSchliessen: 'Fermer le film',
      schliessen: 'Fermer',
    },
    angebot: {
      rundschrift: 'Offre du mois ★',
      titel: 'Offre du mois',
      detailsOeffnen: 'voir les détails',
      schliessen: 'Fermer',
    },
    about: {
      ueberschrift: '| à propos',
      leuchtturmAlt: 'Phare',
      portraitAlt: 'Portrait de Michael Schreck',
      und: 'et',
      team: 'l’équipe du Rettungsanker',
      weiter: 'faites défiler',
      pfeilAlt: 'Flèche vers le bas',
    },
    bento: {
      philosophie: 'l’hospitalité est notre philosophie',
      angebot: 'notre offre',
      einleitung:
        'Découvrez l’hospitalité du nord de l’Allemagne, avec des clients sympathiques et des moments inoubliables.',
      highlight: 'À ne pas manquer',
      kacheln: {
        bier: {
          title: 'bière pression',
          content:
            'Flensburger Pils – la blonde rafraîchissante de la côte nord. Astra Pils – la bière culte, tout droit venue du Kiez de Hambourg !',
          imageAlt: 'Bière Flensburger fraîchement tirée',
        },
        weine: {
          title: 'vins régionaux',
          content:
            'Des vins de grande qualité du Kaiserstuhl et du Markgräflerland. Notre fournisseur attitré : le domaine Heinemann à Scherzingen.',
          imageAlt: 'Bouteilles de vin colorées à l’aquarelle',
        },
        cocktails: {
          title: 'cocktails & long drinks',
          content:
            'De nombreux long drinks et cocktails internationaux – tout ce dont vous rêvez. Et plein de petits shots pour tous les goûts.',
          imageAlt: 'Illustration d’un verre à cocktail',
        },
        fussball: {
          title: 'football en direct',
          content:
            'Chaque samedi de Bundesliga, retransmission en direct dans notre arène sportive – avec, bien sûr, notre SC Fribourg à l’honneur. Dès que possible, nous diffusons aussi la Ligue des champions et les grands tournois, l’Euro et la Coupe du monde. Pour les grands matchs du SC Fribourg très demandés, nous conseillons de réserver via notre outil de réservation – cliquez sur le bouton ci-dessous !',
          imageAlt: 'Illustration de football',
          buttonLabel: 'Réserver pour le match',
        },
        party: {
          title: 'fêtes & événements',
          content:
            'Le Rettungsanker est le lieu idéal pour vos événements privés ou professionnels. En « soirée privée », tout le Rettungsanker est à vous. Traiteur possible sur demande grâce à notre partenaire ! Parlez-nous-en ou contactez-nous par e-mail.',
          imageAlt: 'Foule en fête à l’aquarelle',
        },
        albers: {
          title: 'hans albers',
          content:
            "Hans Philipp August Albers (né le 22 septembre 1891 à Hambourg, mort le 24 juillet 1960 à Berg, en Bavière) était un acteur et chanteur allemand, devenu une idole populaire sous le surnom de « Hans le blond ». Parmi ses films les plus connus : 'Der Mann, der Sherlock Holmes war' (1937), 'Les Aventures fantastiques du baron Münchhausen' (1943), 'La Paloma (Große Freiheit Nr. 7)' (1943) et 'Auf der Reeperbahn nachts um halb eins'.",
          imageAlt: 'Illustration de Hans Albers en marin',
        },
        logoNeu: {
          title: 'notre nouveau logo',
          content:
            'Notre nouveau logo symbolise le lien entre tradition et modernité. Le tiers supérieur reprend l’ancien logo du Rettungsanker. Le tiers central présente le Rettungsanker comme lieu de rencontre pour jeunes et moins jeunes. Le tiers inférieur montre la silhouette de Fribourg. Nous avons hâte de vous accueillir sous notre nouvelle enseigne !',
          imageAlt: 'Illustration du nouveau logo',
        },
      },
    },
    liveTv: {
      zeile1: 'football',
      zeile2: 'en direct',
      text: 'Chaque journée de Bundesliga : les matchs de notre SC Fribourg en direct. Tous les matchs de Ligue Europa du SC Fribourg ! Une sélection de matchs de Ligue des champions et les grands tournois : l’Euro UEFA et la Coupe du monde FIFA.',
      reservierung: 'Réserver pour le match',
      spieltag: 'Journée',
      rang: 'Rang',
      punkte: 'Points',
      tore: 'Buts',
      s: 'V',
      u: 'N',
      n: 'D',
    },
    galerie: { titel: 'galerie' },
    team: {
      titel: 'notre équipe',
      text: 'Nous sommes un équipage dynamique et haut en couleur, passionné par l’accueil, et nous nous réjouissons déjà de votre visite au Rettungsanker !',
      rollen: {
        captain: 'Capitaine',
        obermaat: 'Maître d’équipage',
        offizierin1: 'Première officière',
        offizierin2: 'Deuxième officière',
        offizier2: 'Deuxième officier',
        steward: 'Steward',
        funker: 'Opérateur radio',
      },
    },
    wohin: {
      titel: 'Où nous trouver ?',
      text: 'Vous trouverez l’emplacement exact du Rettungsanker sur la carte illustrée de la vieille ville de Fribourg – ou, plus sérieusement, sur OpenStreetMap.',
      karteAltstadt: 'Plan vieille ville',
      karteAltstadtTipp: 'ouvrir la carte illustrée du vieux Fribourg !',
      karteAltstadtAlt: 'Carte illustrée de la vieille ville',
      karteAltstadtUnterschrift: 'Carte illustrée de la vieille ville de Fribourg',
      osm: 'OpenStreetMap',
      osmTipp: 'Cliquez pour OpenStreetMap !',
      zurueck: 'retour',
      haltestelle: 'Arrêt :',
      linien: 'Lignes 1, 3 et 5',
    },
  },
  it: {
    hero: {
      logoAlt: 'Logo del Rettungsanker',
      filmAb: 'si gira!',
      filmTitel: 'Rettungsanker – volo spaziale con Layla',
      filmAbspielen: 'Avvia il film',
      filmSchliessen: 'Chiudi il film',
      schliessen: 'Chiudi',
    },
    angebot: {
      rundschrift: 'Offerta del mese ★',
      titel: 'Offerta del mese',
      detailsOeffnen: 'apri i dettagli',
      schliessen: 'Chiudi',
    },
    about: {
      ueberschrift: '| chi siamo',
      leuchtturmAlt: 'Faro',
      portraitAlt: 'Ritratto di Michael Schreck',
      und: 'e',
      team: 'il team del Rettungsanker',
      weiter: 'scorri in basso',
      pfeilAlt: 'Freccia verso il basso',
    },
    bento: {
      philosophie: 'l’ospitalità è la nostra filosofia',
      angebot: 'la nostra offerta',
      einleitung:
        'Vivi l’ospitalità del nord della Germania, tra ospiti simpatici e momenti indimenticabili.',
      highlight: 'Da non perdere',
      kacheln: {
        bier: {
          title: 'birra alla spina',
          content:
            'Flensburger Pils – la bionda fresca della costa del Nord. Astra Pils – la birra di culto, direttamente dal Kiez di Amburgo!',
          imageAlt: 'Birra Flensburger appena spillata',
        },
        weine: {
          title: 'vini regionali',
          content:
            'Vini di alta qualità dal Kaiserstuhl e dal Markgräflerland. Il nostro fornitore di fiducia è la cantina Heinemann di Scherzingen.',
          imageAlt: 'Bottiglie di vino colorate ad acquerello',
        },
        cocktails: {
          title: 'cocktail & long drink',
          content:
            'Tanti long drink e cocktail internazionali – tutto ciò che il cuore desidera. E tanti shottini per tutti i gusti.',
          imageAlt: 'Illustrazione di un bicchiere da cocktail',
        },
        fussball: {
          title: 'calcio in diretta tv',
          content:
            'Ogni sabato di Bundesliga trasmettiamo le partite in diretta nella nostra arena sportiva – naturalmente con un occhio di riguardo per il nostro SC Friburgo. Quando possibile anche la Champions League e i grandi tornei, Europei e Mondiali. Per i big match dell’SC Friburgo molto richiesti consigliamo di prenotare con il nostro strumento di prenotazione – clicca il pulsante qui sotto e sei dei nostri!',
          imageAlt: 'Illustrazione di calcio',
          buttonLabel: 'Prenota per la partita',
        },
        party: {
          title: 'feste & eventi',
          content:
            'Il Rettungsanker è la location ideale per il tuo evento privato o aziendale. Come “festa privata”, tutto il Rettungsanker è a tua disposizione. Su richiesta, catering tramite il nostro partner! Parlane con noi o scrivici un’e-mail.',
          imageAlt: 'Folla in festa ad acquerello',
        },
        albers: {
          title: 'hans albers',
          content:
            "Hans Philipp August Albers (nato il 22 settembre 1891 ad Amburgo, morto il 24 luglio 1960 a Berg, in Baviera) è stato un attore e cantante tedesco, diventato un idolo popolare come 'Hans il biondo'. Tra i suoi film più noti: 'Der Mann, der Sherlock Holmes war' (1937), 'Il barone di Münchhausen' (1943), 'Große Freiheit Nr. 7' (1943) e 'Auf der Reeperbahn nachts um halb eins'.",
          imageAlt: 'Illustrazione di Hans Albers vestito da marinaio',
        },
        logoNeu: {
          title: 'il nostro nuovo logo',
          content:
            'Il nostro nuovo logo simboleggia l’unione tra tradizione e modernità. Nel terzo superiore resta il vecchio logo del Rettungsanker. Il terzo centrale rappresenta il Rettungsanker come punto d’incontro per giovani e meno giovani. Il terzo inferiore mostra la silhouette di Friburgo. Non vediamo l’ora di darti il benvenuto sotto la nostra nuova insegna!',
          imageAlt: 'Illustrazione del nuovo logo',
        },
      },
    },
    liveTv: {
      zeile1: 'calcio',
      zeile2: 'in diretta',
      text: 'Ogni giornata di Bundesliga: le partite del nostro SC Friburgo in diretta. Tutte le partite di Europa League dell’SC Friburgo! Partite selezionate di Champions League e i grandi tornei: Europei UEFA e Mondiali FIFA.',
      reservierung: 'Prenota per la partita',
      spieltag: 'Giornata',
      rang: 'Posizione',
      punkte: 'Punti',
      tore: 'Gol',
      s: 'V',
      u: 'N',
      n: 'P',
    },
    galerie: { titel: 'galleria' },
    team: {
      titel: 'il nostro team',
      text: 'Siamo un equipaggio dinamico e variopinto che vive l’ospitalità con passione e non vede l’ora di accoglierti al Rettungsanker!',
      rollen: {
        captain: 'Capitano',
        obermaat: 'Nostromo',
        offizierin1: 'Prima ufficiale',
        offizierin2: 'Seconda ufficiale',
        offizier2: 'Secondo ufficiale',
        steward: 'Steward',
        funker: 'Marconista',
      },
    },
    wohin: {
      titel: 'Dove siamo?',
      text: 'Trovi la posizione esatta del Rettungsanker sulla mappa illustrata del centro storico di Friburgo – oppure, più professionalmente, su OpenStreetMap.',
      karteAltstadt: 'Mappa centro storico',
      karteAltstadtTipp: 'apri la mappa illustrata della vecchia Friburgo!',
      karteAltstadtAlt: 'Mappa illustrata del centro storico',
      karteAltstadtUnterschrift: 'Mappa illustrata del centro storico di Friburgo',
      osm: 'OpenStreetMap',
      osmTipp: 'Clicca per OpenStreetMap!',
      zurueck: 'indietro',
      haltestelle: 'Fermata:',
      linien: 'Linee 1, 3 e 5',
    },
  },
  ru: {
    hero: {
      logoAlt: 'Логотип Rettungsanker',
      filmAb: 'мотор!',
      filmTitel: 'Rettungsanker – космический полёт с Лайлой',
      filmAbspielen: 'Смотреть фильм',
      filmSchliessen: 'Закрыть фильм',
      schliessen: 'Закрыть',
    },
    angebot: {
      rundschrift: 'Предложение месяца ★',
      titel: 'Предложение месяца',
      detailsOeffnen: 'подробнее',
      schliessen: 'Закрыть',
    },
    about: {
      ueberschrift: '| о нас',
      leuchtturmAlt: 'Маяк',
      portraitAlt: 'Портрет Михаэля Шрека',
      und: 'и',
      team: 'команда Rettungsanker',
      weiter: 'листайте вниз',
      pfeilAlt: 'Стрелка вниз',
    },
    bento: {
      philosophie: 'гостеприимство – наша философия',
      angebot: 'что мы предлагаем',
      einleitung:
        'Северогерманское гостеприимство, приятные гости и незабываемые моменты.',
      highlight: 'Хит',
      kacheln: {
        bier: {
          title: 'разливное пиво',
          content:
            'Flensburger Pils – прохладное светлое с северного побережья. Astra Pils – культовое пиво прямо из гамбургского квартала Киц!',
          imageAlt: 'Свежеразлитое пиво Flensburger',
        },
        weine: {
          title: 'местные вина',
          content:
            'Высококачественные вина из регионов Кайзерштуль и Маркгрефлерланд. Наш постоянный поставщик – винодельня Heinemann в Шерцингене.',
          imageAlt: 'Разноцветные бутылки вина в стиле акварели',
        },
        cocktails: {
          title: 'коктейли и лонг-дринки',
          content:
            'Множество международных лонг-дринков и коктейлей – всё, что душе угодно. И много шотов на любой вкус.',
          imageAlt: 'Иллюстрация коктейльного бокала',
        },
        fussball: {
          title: 'футбол в прямом эфире',
          content:
            'Каждый субботний тур Бундеслиги – прямая трансляция в нашей спорт-арене, конечно же с акцентом на наш «Фрайбург». По возможности показываем и Лигу чемпионов, и крупные турниры – чемпионаты Европы и мира. На топ-матчи «Фрайбурга» с большим спросом советуем бронировать места через нашу форму – кнопка ниже, и вы с нами!',
          imageAlt: 'Футбольная иллюстрация',
          buttonLabel: 'Забронировать',
        },
        party: {
          title: 'вечеринки и события',
          content:
            'Rettungsanker – идеальное место для частного или корпоративного мероприятия. В формате закрытой вечеринки весь Rettungsanker в вашем распоряжении. По желанию – кейтеринг от нашего партнёра! Обращайтесь к нам лично или пишите на e-mail.',
          imageAlt: 'Толпа на вечеринке в стиле акварели',
        },
        albers: {
          title: 'ганс альберс',
          content:
            'Ганс Филипп Август Альберс (род. 22 сентября 1891 в Гамбурге, ум. 24 июля 1960 в Берге, Бавария) – немецкий актёр и певец, ставший народным кумиром «блондином Гансом». Среди самых известных фильмов с его участием – «Человек, который был Шерлоком Холмсом» (1937), «Мюнхгаузен» (1943), «Große Freiheit Nr. 7» (1943) и «Auf der Reeperbahn nachts um halb eins».',
          imageAlt: 'Иллюстрация: Ганс Альберс в образе моряка',
        },
        logoNeu: {
          title: 'наш новый логотип',
          content:
            'Наш новый логотип символизирует связь традиций и современности. В верхней трети сохранён старый логотип Rettungsanker. Средняя треть показывает Rettungsanker как место встречи для молодых и не очень. Нижняя треть – силуэт Фрайбурга. Будем рады приветствовать вас под нашим новым знаком!',
          imageAlt: 'Иллюстрация нового логотипа',
        },
      },
    },
    liveTv: {
      zeile1: 'футбол',
      zeile2: 'live tv',
      text: 'Каждый тур Бундеслиги: матчи нашего «Фрайбурга» в прямом эфире. Все матчи «Фрайбурга» в Лиге Европы! Избранные матчи Лиги чемпионов и крупные турниры – чемпионат Европы УЕФА и чемпионат мира ФИФА.',
      reservierung: 'Забронировать',
      spieltag: 'Тур',
      rang: 'Место',
      punkte: 'Очки',
      tore: 'Голы',
      s: 'В',
      u: 'Н',
      n: 'П',
    },
    galerie: { titel: 'галерея' },
    team: {
      titel: 'наша команда',
      text: 'Мы – энергичная и пёстрая команда, которая живёт гастрономией со страстью и уже ждёт вас в Rettungsanker!',
      rollen: {
        captain: 'Капитан',
        obermaat: 'Боцман',
        offizierin1: 'Старший помощник',
        offizierin2: 'Второй помощник',
        offizier2: 'Второй помощник',
        steward: 'Стюард',
        funker: 'Радист',
      },
    },
    wohin: {
      titel: 'Как добраться?',
      text: 'Точное расположение Rettungsanker вы найдёте на иллюстрированной карте старого города Фрайбурга – или, по-профессиональному, на OpenStreetMap.',
      karteAltstadt: 'Карта старого города',
      karteAltstadtTipp: 'открыть иллюстрированную карту старого Фрайбурга!',
      karteAltstadtAlt: 'Иллюстрированная карта старого города',
      karteAltstadtUnterschrift: 'Иллюстрированная карта старого города Фрайбурга',
      osm: 'OpenStreetMap',
      osmTipp: 'Нажмите, чтобы открыть OpenStreetMap!',
      zurueck: 'назад',
      haltestelle: 'Остановка:',
      linien: 'Трамвай 1, 3 и 5',
    },
  },
}
