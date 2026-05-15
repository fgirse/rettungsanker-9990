import React from 'react'
import * as Separator from '@radix-ui/react-separator'
import Link from 'next/link'

// ─── Data ────────────────────────────────────────────────────────────────────

const sections = [
  { id: 'angaben', label: 'Angaben gemäß § 5 TMG' },
  { id: 'vertreten', label: 'Vertreten durch' },
  { id: 'kontakt', label: 'Kontakt' },
  { id: 'umsatzsteuer', label: 'Umsatzsteuer-ID' },
  { id: 'eu-streit', label: 'EU-Streitschlichtung' },
  { id: 'verbraucher', label: 'Verbraucherstreitbeilegung' },
  { id: 'haftung-inhalte', label: 'Haftung für Inhalte' },
  { id: 'haftung-links', label: 'Haftung für Links' },
  { id: 'urheberrecht', label: 'Urheberrecht' },
  { id: 'bildnachweise', label: 'Bildnachweise' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="headingB text-xl md:text-2xl text-yellow-400 mb-4 tracking-wide">
      {children}
    </h2>
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

function SidebarNav() {
  return (
    <aside className="hidden lg:block">
      <div className="sticky top-24 bg-zinc-900/60 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-5">
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4 font-mono">
          Inhalt
        </p>
        <nav>
          <ul className="space-y-1">
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
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

const Impressum = () => {
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
            Impressum
          </h1>
          <div className="mt-4 w-16 h-1 bg-yellow-400 rounded-full" />
          <p className="mt-5 text-zinc-400 text-sm font-mono">
            Rechtliche Informationen gemäß § 5 TMG
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
            {/* Angaben gemäß § 5 TMG */}
            <SectionCard id="angaben">
              <SectionHeading>Angaben gemäß § 5 TMG</SectionHeading>
              <div className="space-y-1 text-zinc-300">
                <p className="text-base font-semibold text-white">
                  Rettungsanker Freiburg GbR
                </p>
                <p>Adelhauserstraße 16</p>
                <p>79098 Freiburg im Breisgau</p>
                <p>Deutschland</p>
              </div>
            </SectionCard>

            {/* Vertreten durch */}
            <SectionCard id="vertreten">
              <SectionHeading>Vertreten durch</SectionHeading>
              <div className="text-zinc-300">
                <p className="text-base text-white font-medium">Michael Schreck</p>
                <p className="text-sm text-zinc-500 mt-1 font-mono uppercase tracking-wider">
                  Geschäftsführer
                </p>
              </div>
            </SectionCard>

            {/* Kontakt */}
            <SectionCard id="kontakt">
              <SectionHeading>Kontakt</SectionHeading>
              <div className="space-y-3 text-zinc-300">
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 pt-0.5 w-16 shrink-0">
                    Telefon
                  </span>
                  <a
                    href="tel:+497612076620"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    +49 (0) 761 207 66 20
                  </a>
                </div>
                <Separator.Root
                  decorative
                  className="h-px bg-zinc-800"
                />
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 pt-0.5 w-16 shrink-0">
                    E-Mail
                  </span>
                  <a
                    href="mailto: rettungsanker-freiburg@gmx.de"
                    className="hover:text-yellow-400 transition-colors duration-200 break-all"
                  >
                    rettungsanker-freiburg@gmx.de
                  </a>
                </div>
                <Separator.Root
                  decorative
                  className="h-px bg-zinc-800"
                />
                <div className="flex items-start gap-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 pt-0.5 w-16 shrink-0">
                    Website
                  </span>
                  <a
                    href="https://www.rettungsanker-freiburg.de"
                    className="hover:text-yellow-400 transition-colors duration-200"
                  >
                    www.rettungsanker-freiburg.de
                  </a>
                </div>
              </div>
            </SectionCard>

            {/* Umsatzsteuer-ID */}
            <SectionCard id="umsatzsteuer">
              <SectionHeading>Umsatzsteuer-ID</SectionHeading>
              <div className="text-zinc-300 space-y-2">
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß §27 a
                  Umsatzsteuergesetz:
                </p>
                <p className="font-mono text-white bg-zinc-800/80 inline-block px-3 py-1.5 rounded-lg text-sm tracking-widest mt-1">
                  DE XXX XXX XXX
                </p>
                <p className="text-sm text-zinc-500">
                  (Die USt-IdNr. wird auf Anfrage mitgeteilt)
                </p>
              </div>
            </SectionCard>

            {/* EU-Streitschlichtung */}
            <SectionCard id="eu-streit">
              <SectionHeading>EU-Streitschlichtung</SectionHeading>
              <div className="text-zinc-300 space-y-3">
                <p>
                  Die Europäische Kommission stellt eine Plattform zur
                  Online-Streitbeilegung (OS) bereit:
                </p>
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-yellow-400 hover:text-yellow-300 underline underline-offset-4 transition-colors duration-200 text-sm"
                >
                  https://ec.europa.eu/consumers/odr/
                  <svg
                    width="12"
                    height="12"
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
                <p className="text-sm text-zinc-400">
                  Unsere E-Mail-Adresse finden Sie oben im Impressum.
                </p>
              </div>
            </SectionCard>

            {/* Verbraucherstreitbeilegung */}
            <SectionCard id="verbraucher">
              <SectionHeading>
                Verbraucherstreitbeilegung / Universalschlichtungsstelle
              </SectionHeading>
              <div className="text-zinc-300">
                <p>
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </SectionCard>

            {/* Haftung für Inhalte */}
            <SectionCard id="haftung-inhalte">
              <SectionHeading>Haftung für Inhalte</SectionHeading>
              <div className="text-zinc-300 space-y-3 text-sm leading-relaxed">
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene
                  Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                  verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
                  Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                  gespeicherte fremde Informationen zu überwachen oder nach
                  Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
                  hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
                  Informationen nach den allgemeinen Gesetzen bleiben hiervon
                  unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
                  Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung
                  möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend
                  entfernen.
                </p>
              </div>
            </SectionCard>

            {/* Haftung für Links */}
            <SectionCard id="haftung-links">
              <SectionHeading>Haftung für Links</SectionHeading>
              <div className="text-zinc-300 space-y-3 text-sm leading-relaxed">
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf
                  deren Inhalte wir keinen Einfluss haben. Deshalb können wir
                  für diese fremden Inhalte auch keine Gewähr übernehmen. Für
                  die Inhalte der verlinkten Seiten ist stets der jeweilige
                  Anbieter oder Betreiber der Seiten verantwortlich. Die
                  verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf
                  mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
                  waren zum Zeitpunkt der Verlinkung nicht erkennbar.
                </p>
                <p>
                  Eine permanente inhaltliche Kontrolle der verlinkten Seiten
                  ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung
                  nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen
                  werden wir derartige Links umgehend entfernen.
                </p>
              </div>
            </SectionCard>

            {/* Urheberrecht */}
            <SectionCard id="urheberrecht">
              <SectionHeading>Urheberrecht</SectionHeading>
              <div className="text-zinc-300 space-y-3 text-sm leading-relaxed">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke
                  auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die
                  Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
                  Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen
                  der schriftlichen Zustimmung des jeweiligen Autors bzw.
                  Erstellers. Downloads und Kopien dieser Seite sind nur für
                  den privaten, nicht kommerziellen Gebrauch gestattet.
                </p>
                <p>
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber
                  erstellt wurden, werden die Urheberrechte Dritter beachtet.
                  Insbesondere werden Inhalte Dritter als solche
                  gekennzeichnet. Sollten Sie trotzdem auf eine
                  Urheberrechtsverletzung aufmerksam werden, bitten wir um
                  einen entsprechenden Hinweis. Bei Bekanntwerden von
                  Rechtsverletzungen werden wir derartige Inhalte umgehend
                  entfernen.
                </p>
              </div>
            </SectionCard>

            {/* Bildnachweise */}
            <SectionCard id="bildnachweise">
              <SectionHeading>Bildnachweise</SectionHeading>
              <div className="text-zinc-300 text-sm leading-relaxed">
                <p>
                  Die auf dieser Website verwendeten Bilder und Grafiken
                  unterliegen dem Urheberrecht. Soweit nicht anders angegeben,
                  sind alle Rechte bei Rettungsanker Freiburg GbR.
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

export default Impressum
