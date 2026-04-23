import React from 'react'
import * as Separator from '@radix-ui/react-separator'
import Link from 'next/link'

// ─── Nav structure ─────────────────────────────────────────────────────────────

const sections = [
  { id: 'verantwortliche', label: '1. Verantwortliche Stelle' },
  {
    id: 'datenerfassung',
    label: '2. Datenerfassung',
    children: [
      { id: 'server-logs', label: '2.1 Server-Log-Dateien' },
      { id: 'kontaktformular', label: '2.2 Kontaktformular' },
      { id: 'cookies', label: '2.3 Cookies' },
      { id: 'spam-schutz', label: '2.4 Spam-Schutz' },
    ],
  },
  { id: 'ihre-rechte', label: '3. Ihre Rechte' },
  { id: 'speicherdauer', label: '4. Speicherdauer' },
  { id: 'ssl', label: '5. SSL/TLS-Verschlüsselung' },
  { id: 'weitergabe', label: '6. Weitergabe an Dritte' },
  { id: 'soziale-medien', label: '7. Soziale Medien' },
  { id: 'aenderungen', label: '8. Änderungen' },
]

// ─── Rights data ───────────────────────────────────────────────────────────────

const rights = [
  {
    title: 'Recht auf Auskunft',
    article: 'Art. 15 DSGVO',
    text: 'Sie haben das Recht, Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen.',
  },
  {
    title: 'Recht auf Berichtigung',
    article: 'Art. 16 DSGVO',
    text: 'Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen.',
  },
  {
    title: 'Recht auf Löschung',
    article: 'Art. 17 DSGVO',
    text: 'Sie haben das Recht, die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die weitere Verarbeitung erforderlich ist.',
  },
  {
    title: 'Recht auf Einschränkung',
    article: 'Art. 18 DSGVO',
    text: 'Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.',
  },
  {
    title: 'Recht auf Datenübertragbarkeit',
    article: 'Art. 20 DSGVO',
    text: 'Sie haben das Recht, Ihre personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.',
  },
  {
    title: 'Widerspruchsrecht',
    article: 'Art. 21 DSGVO',
    text: 'Sie haben das Recht, jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten Widerspruch einzulegen.',
  },
  {
    title: 'Recht auf Widerruf',
    article: 'Art. 7 Abs. 3 DSGVO',
    text: 'Sie haben das Recht, Ihre erteilte Einwilligung jederzeit zu widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.',
  },
  {
    title: 'Beschwerderecht',
    article: 'Art. 77 DSGVO',
    text: 'Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren, wenn Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen geltendes Recht verstößt.',
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="headingB text-xl md:text-2xl text-yellow-400 mb-4 tracking-wide">
      {children}
    </h2>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-base font-semibold text-yellow-300/80 mb-3 font-mono uppercase tracking-wider">
      {children}
    </h3>
  )
}

function SectionCard({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 bg-zinc-900/50 border border-zinc-700/40 rounded-xl p-6 md:p-8"
    >
      {children}
    </section>
  )
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-zinc-800/60 border border-zinc-700/40 rounded-lg px-5 py-4 space-y-1">
      {children}
    </div>
  )
}

function SidebarNav() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-5">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-mono">
          Inhalt
        </p>
        <nav>
          <ul className="space-y-0.5">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="group flex items-center gap-2 text-sm text-zinc-400 hover:text-yellow-400 py-1.5 px-2 rounded-lg hover:bg-zinc-800/60 transition-all duration-200"
                >
                  <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover:bg-yellow-400 transition-colors duration-200 shrink-0" />
                  <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                    {section.label}
                  </span>
                </a>
                {section.children && (
                  <ul className="ml-5 mt-0.5 space-y-0.5 border-l border-zinc-800 pl-3">
                    {section.children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          className="group flex items-center gap-2 text-xs text-zinc-500 hover:text-yellow-400/80 py-1 px-2 rounded-md hover:bg-zinc-800/40 transition-all duration-200"
                        >
                          <span className="group-hover:translate-x-0.5 transition-transform duration-200">
                            {child.label}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const Datenschutz = () => {
  const currentDate = new Date().toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="min-h-screen bg-[#0d1117] text-zinc-200">
      {/* Page Header */}
      <header className="relative border-b border-zinc-800 bg-[#1a252d]/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 md:py-20">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-yellow-400 transition-colors duration-200 mb-8"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Zurück
          </Link>
          <h1 className="headingA text-5xl md:text-7xl text-white m-0">
            Datenschutz&shy;erklärung
          </h1>
          <div className="mt-4 w-16 h-1 bg-yellow-400 rounded-full" />
          <p className="mt-5 text-zinc-400 text-sm font-mono">
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß
            DSGVO
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 xl:gap-12">
          {/* Sidebar */}
          <SidebarNav />

          {/* Content */}
          <div className="space-y-6">
            {/* Intro */}
            <div className="text-zinc-400 text-sm leading-relaxed px-1">
              <p>
                Wir freuen uns über Ihr Interesse an unserem Unternehmen. Der
                Schutz Ihrer personenbezogenen Daten ist uns ein wichtiges
                Anliegen. Im Folgenden informieren wir Sie ausführlich über den
                Umgang mit Ihren Daten.
              </p>
            </div>

            {/* 1. Verantwortliche Stelle */}
            <SectionCard id="verantwortliche">
              <SectionHeading>1. Verantwortliche Stelle</SectionHeading>
              <div className="text-zinc-300 space-y-4 text-sm">
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website
                  ist:
                </p>
                <InfoBox>
                  <p className="font-semibold text-white">
                    Rettungsanker Freiburg GbR
                  </p>
                  <p className="text-zinc-400">Michael Schreck</p>
                  <p className="text-zinc-400">Adelhauserstraße 16</p>
                  <p className="text-zinc-400">79098 Freiburg im Breisgau</p>
                  <Separator.Root
                    decorative
                    className="my-3 h-px bg-zinc-700/60"
                  />
                  <p>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mr-2">
                      Tel
                    </span>
                    <a
                      href="tel:+497612076620"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                    >
                      +49 (0) 761 207 66 20
                    </a>
                  </p>
                  <p>
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 mr-2">
                      Mail
                    </span>
                    <a
                      href="mailto:info@rettungsanker-freiburg.de"
                      className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
                    >
                      info@rettungsanker-freiburg.de
                    </a>
                  </p>
                </InfoBox>
                <p>
                  Der Verantwortliche entscheidet allein oder gemeinsam mit
                  anderen über die Zwecke und Mittel der Verarbeitung von
                  personenbezogenen Daten (z.B. Namen, Kontaktdaten o. Ä.).
                </p>
              </div>
            </SectionCard>

            {/* 2. Datenerfassung */}
            <SectionCard id="datenerfassung">
              <SectionHeading>2. Datenerfassung auf dieser Website</SectionHeading>

              {/* 2.1 Server-Log-Dateien */}
              <div id="server-logs" className="scroll-mt-24 mb-8">
                <SubHeading>2.1 Server-Log-Dateien</SubHeading>
                <div className="text-zinc-300 space-y-3 text-sm leading-relaxed">
                  <p>
                    Der Provider der Seiten erhebt und speichert automatisch
                    Informationen in so genannten Server-Log-Dateien, die Ihr
                    Browser automatisch an uns übermittelt. Dies sind:
                  </p>
                  <ul className="space-y-1.5 pl-4">
                    {[
                      'Browsertyp und Browserversion',
                      'Verwendetes Betriebssystem',
                      'Referrer URL',
                      'Hostname des zugreifenden Rechners',
                      'Uhrzeit der Serveranfrage',
                      'IP-Adresse',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500/50 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p>
                    Eine Zusammenführung dieser Daten mit anderen Datenquellen
                    wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt
                    auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
                    Websitebetreiber hat ein berechtigtes Interesse an der
                    technisch fehlerfreien Darstellung und der Optimierung
                    seiner Website – hierzu müssen die Server-Log-Files erfasst
                    werden.
                  </p>
                </div>
              </div>

              <Separator.Root decorative className="h-px bg-zinc-800 mb-8" />

              {/* 2.2 Kontaktformular */}
              <div id="kontaktformular" className="scroll-mt-24 mb-8">
                <SubHeading>2.2 Kontaktformular und E-Mail-Kontakt</SubHeading>
                <div className="text-zinc-300 space-y-3 text-sm leading-relaxed">
                  <p>
                    Wenn Sie uns per Kontaktformular oder E-Mail Anfragen
                    zukommen lassen, werden Ihre Angaben aus dem
                    Anfrageformular inklusive der von Ihnen dort angegebenen
                    Kontaktdaten zwecks Bearbeitung der Anfrage und für den
                    Fall von Anschlussfragen bei uns gespeichert.
                  </p>
                  <p>
                    Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                    Die Verarbeitung dieser Daten erfolgt auf Grundlage von
                    Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der
                    Erfüllung eines Vertrags zusammenhängt oder zur
                    Durchführung vorvertraglicher Maßnahmen erforderlich ist.
                    In allen übrigen Fällen beruht die Verarbeitung auf unserem
                    berechtigten Interesse an der effektiven Bearbeitung der an
                    uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder
                    auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
                  </p>
                  <p>
                    Die von Ihnen im Kontaktformular eingegebenen Daten
                    verbleiben bei uns, bis Sie uns zur Löschung auffordern,
                    Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
                    für die Datenspeicherung entfällt. Zwingende gesetzliche
                    Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben
                    unberührt.
                  </p>
                </div>
              </div>

              <Separator.Root decorative className="h-px bg-zinc-800 mb-8" />

              {/* 2.3 Cookies */}
              <div id="cookies" className="scroll-mt-24 mb-8">
                <SubHeading>2.3 Cookies</SubHeading>
                <div className="text-zinc-300 space-y-3 text-sm leading-relaxed">
                  <p>
                    Unsere Website verwendet Cookies. Bei Cookies handelt es
                    sich um kleine Textdateien, die auf Ihrem Endgerät (Laptop,
                    Tablet, Smartphone o.ä.) gespeichert werden, wenn Sie
                    unsere Webseite besuchen.
                  </p>
                  <p>
                    Sie können Ihren Browser so einstellen, dass Sie über das
                    Setzen von Cookies informiert werden und einzeln über deren
                    Annahme entscheiden oder die Annahme von Cookies für
                    bestimmte Fälle oder generell ausschließen können. Bei der
                    Nichtannahme von Cookies kann die Funktionalität unserer
                    Website eingeschränkt sein.
                  </p>
                  <p>
                    Cookies, die zur Durchführung des elektronischen
                    Kommunikationsvorgangs oder zur Bereitstellung bestimmter,
                    von Ihnen erwünschter Funktionen erforderlich sind, werden
                    auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert.
                  </p>
                </div>
              </div>

              <Separator.Root decorative className="h-px bg-zinc-800 mb-8" />

              {/* 2.4 Spam-Schutz */}
              <div id="spam-schutz" className="scroll-mt-24">
                <SubHeading>2.4 Spam-Schutz (Cloudflare Turnstile und Upstash)</SubHeading>
                <div className="text-zinc-300 space-y-3 text-sm leading-relaxed">
                  <p>
                    Zum Schutz unseres Kontaktformulars vor automatisierten
                    Eingaben setzen wir Cloudflare Turnstile ein. Hierbei kann
                    es zur Verarbeitung technischer Daten wie IP-Adresse,
                    Browser-Informationen und Interaktionsmerkmalen kommen.
                  </p>
                  <p>
                    Zur Begrenzung missbräuchlicher Mehrfachanfragen nutzen wir
                    zusätzlich ein serverseitiges Rate-Limiting mit Upstash
                    Redis. Dabei werden Anfragen pro IP-Adresse innerhalb eines
                    kurzen Zeitfensters gezählt.
                  </p>
                  <p>
                    Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1
                    lit. f DSGVO (berechtigtes Interesse an der Sicherheit und
                    Stabilität unserer Website).
                  </p>
                </div>
              </div>
            </SectionCard>

            {/* 3. Ihre Rechte */}
            <SectionCard id="ihre-rechte">
              <SectionHeading>3. Ihre Rechte als betroffene Person</SectionHeading>
              <p className="text-zinc-400 text-sm mb-6">
                Nach der DSGVO stehen Ihnen folgende Rechte zu:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rights.map((right) => (
                  <div
                    key={right.article}
                    className="bg-zinc-800/50 border border-zinc-700/30 rounded-lg p-4 space-y-1.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {right.title}
                      </h4>
                      <span className="text-xs font-mono text-yellow-500/60 shrink-0 mt-0.5">
                        {right.article}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{right.text}</p>
                  </div>
                ))}
              </div>

              {/* Aufsichtsbehörde */}
              <div className="mt-6 pt-6 border-t border-zinc-800">
                <p className="text-sm text-zinc-400 mb-3">
                  Zuständige Aufsichtsbehörde:
                </p>
                <InfoBox>
                  <p className="font-semibold text-white text-sm">
                    Der Landesbeauftragte für den Datenschutz und die
                    Informationsfreiheit Baden-Württemberg
                  </p>
                  <p className="text-zinc-400 text-sm">Postfach 10 29 32</p>
                  <p className="text-zinc-400 text-sm">70025 Stuttgart</p>
                  <Separator.Root
                    decorative
                    className="my-3 h-px bg-zinc-700/60"
                  />
                  <a
                    href="https://www.baden-wuerttemberg.datenschutz.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-yellow-400 hover:text-yellow-300 underline underline-offset-4 transition-colors duration-200"
                  >
                    www.baden-wuerttemberg.datenschutz.de
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </InfoBox>
              </div>
            </SectionCard>

            {/* 4. Speicherdauer */}
            <SectionCard id="speicherdauer">
              <SectionHeading>4. Speicherdauer</SectionHeading>
              <div className="text-zinc-300 text-sm leading-relaxed">
                <p>
                  Soweit innerhalb dieser Datenschutzerklärung keine
                  speziellere Speicherdauer genannt wurde, verbleiben Ihre
                  personenbezogenen Daten bei uns, bis der Zweck für die
                  Datenverarbeitung entfällt. Wenn Sie ein berechtigtes
                  Löschersuchen geltend machen oder eine Einwilligung zur
                  Datenverarbeitung widerrufen, werden Ihre Daten gelöscht,
                  sofern wir keine anderen rechtlich zulässigen Gründe für die
                  Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer-
                  oder handelsrechtliche Aufbewahrungsfristen); im
                  letztgenannten Fall erfolgt die Löschung nach Fortfall dieser
                  Gründe.
                </p>
              </div>
            </SectionCard>

            {/* 5. SSL/TLS */}
            <SectionCard id="ssl">
              <SectionHeading>5. SSL- bzw. TLS-Verschlüsselung</SectionHeading>
              <div className="text-zinc-300 space-y-3 text-sm leading-relaxed">
                <p>
                  Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
                  Übertragung vertraulicher Inhalte, wie zum Beispiel Anfragen,
                  die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
                  TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
                  Sie daran, dass die Adresszeile des Browsers von
                  &quot;http://&quot; auf &quot;https://&quot; wechselt und an
                  dem Schloss-Symbol in Ihrer Browserzeile.
                </p>
                <p>
                  Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können
                  die Daten, die Sie an uns übermitteln, nicht von Dritten
                  mitgelesen werden.
                </p>
              </div>
            </SectionCard>

            {/* 6. Weitergabe */}
            <SectionCard id="weitergabe">
              <SectionHeading>6. Weitergabe von Daten an Dritte</SectionHeading>
              <div className="text-zinc-300 space-y-4 text-sm leading-relaxed">
                <p>
                  Eine Übermittlung Ihrer persönlichen Daten an Dritte zu
                  anderen als den im Folgenden aufgeführten Zwecken findet
                  nicht statt. Wir geben Ihre persönlichen Daten nur an Dritte
                  weiter, wenn:
                </p>
                <ul className="space-y-2.5 pl-2">
                  {[
                    'Sie Ihre ausdrückliche Einwilligung dazu erteilt haben (Art. 6 Abs. 1 lit. a DSGVO),',
                    'die Weitergabe zur Erfüllung unserer rechtlichen Verpflichtungen erforderlich ist (Art. 6 Abs. 1 lit. c DSGVO),',
                    'die Weitergabe zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben (Art. 6 Abs. 1 lit. f DSGVO).',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-500/50 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </SectionCard>

            {/* 7. Soziale Medien */}
            <SectionCard id="soziale-medien">
              <SectionHeading>7. Online-Präsenzen in sozialen Medien</SectionHeading>
              <div className="text-zinc-300 space-y-3 text-sm leading-relaxed">
                <p>
                  Wir unterhalten Online-Präsenzen innerhalb sozialer
                  Netzwerke, um mit den dort aktiven Kunden, Interessenten und
                  Nutzern zu kommunizieren und sie dort über unsere Leistungen
                  zu informieren.
                </p>
                <p>
                  Wir weisen darauf hin, dass dabei Nutzerdaten außerhalb des
                  Raumes der Europäischen Union verarbeitet werden können.
                  Hierdurch können sich Risiken für die Nutzer ergeben, weil so
                  z.B. die Durchsetzung der Rechte der Nutzer erschwert werden
                  könnte.
                </p>
                <p>
                  Ferner werden die Daten der Nutzer innerhalb sozialer
                  Netzwerke im Regelfall für Marktforschungs- und Werbezwecke
                  verarbeitet. Die Verarbeitung der personenbezogenen Daten der
                  Nutzer erfolgt auf Grundlage unserer berechtigten Interessen
                  an einer effektiven Information der Nutzer und Kommunikation
                  mit den Nutzern gem. Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              </div>
            </SectionCard>

            {/* 8. Änderungen */}
            <SectionCard id="aenderungen">
              <SectionHeading>8. Änderung der Datenschutzerklärung</SectionHeading>
              <div className="text-zinc-300 text-sm leading-relaxed">
                <p>
                  Wir behalten uns vor, diese Datenschutzerklärung anzupassen,
                  damit sie stets den aktuellen rechtlichen Anforderungen
                  entspricht oder um Änderungen unserer Leistungen in der
                  Datenschutzerklärung umzusetzen, z.B. bei der Einführung
                  neuer Services. Für Ihren erneuten Besuch gilt dann die neue
                  Datenschutzerklärung.
                </p>
              </div>
            </SectionCard>

            {/* Footer Note */}
            <div className="pt-4 mt-2 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-zinc-500 font-mono">
              <p>Stand: {currentDate}</p>
              <p>
                Quelle:{' '}
                <a
                  href="https://www.e-recht24.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-500/70 hover:text-yellow-400 transition-colors duration-200"
                >
                  e-recht24.de
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Datenschutz
