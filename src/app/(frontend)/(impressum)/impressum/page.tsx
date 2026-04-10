import React from 'react'

const Impressum = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-yellow-500">
          Impressum
        </h1>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 shadow-xl space-y-8">
          {/* Angaben gemäß § 5 TMG */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Angaben gemäß § 5 TMG</h2>
            <div className="space-y-2 text-gray-300">
              <p className="text-xl font-semibold text-white">Rettungsanker Freiburg GbR</p>
              <p>Adelhauserstraße 16</p>
              <p>79098 Freiburg im Breisgau</p>
              <p>Deutschland</p>
            </div>
          </section>

          {/* Vertreten durch */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Vertreten durch</h2>
            <div className="space-y-2 text-gray-300">
              <p>Michael Schreck</p>
              <p className="text-sm text-gray-400">Geschäftsführer</p>
            </div>
          </section>

          {/* Kontakt */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Kontakt</h2>
            <div className="space-y-2 text-gray-300">
              <p>
                <span className="font-semibold text-white">Telefon:</span>{' '}
                <a href="tel:+497612076620" className="hover:text-yellow-400 transition-colors">
                  +49 (0) 761 207 66 20
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">E-Mail:</span>{' '}
                <a
                  href="mailto:info@rettungsanker-freiburg.de"
                  className="hover:text-yellow-400 transition-colors"
                >
                  info@rettungsanker-freiburg.de
                </a>
              </p>
              <p>
                <span className="font-semibold text-white">Website:</span>{' '}
                <a
                  href="https://www.rettungsanker-freiburg.de"
                  className="hover:text-yellow-400 transition-colors"
                >
                  www.rettungsanker-freiburg.de
                </a>
              </p>
            </div>
          </section>

          {/* Umsatzsteuer-ID */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Umsatzsteuer-ID</h2>
            <div className="text-gray-300">
              <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:</p>
              <p className="font-mono mt-2">DE XXX XXX XXX</p>
              <p className="text-sm text-gray-400 mt-2">
                (Die USt-IdNr. wird auf Anfrage mitgeteilt)
              </p>
            </div>
          </section>

          {/* EU-Streitschlichtung */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">EU-Streitschlichtung</h2>
            <div className="text-gray-300 space-y-3">
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit:
              </p>
              <p>
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
              <p className="text-sm">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
            </div>
          </section>

          {/* Verbraucherstreitbeilegung */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              Verbraucherstreitbeilegung / Universalschlichtungsstelle
            </h2>
            <div className="text-gray-300">
              <p>
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </section>

          {/* Haftungsausschluss */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Haftung für Inhalte</h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen
                Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir
                als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine
                rechtswidrige Tätigkeit hinweisen.
              </p>
              <p>
                Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den
                allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist
                jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
                Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte
                umgehend entfernen.
              </p>
            </div>
          </section>

          {/* Haftung für Links */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Haftung für Links</h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir
                keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
                Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
                Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum
                Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
                Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
              </p>
              <p>
                Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete
                Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von
                Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>
          </section>

          {/* Urheberrecht */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Urheberrecht</h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
                Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
                bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen
                Gebrauch gestattet.
              </p>
              <p>
                Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die
                Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche
                gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam
                werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
                Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </section>

          {/* Bildnachweise */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Bildnachweise</h2>
            <div className="text-gray-300 text-sm">
              <p>
                Die auf dieser Website verwendeten Bilder und Grafiken unterliegen dem Urheberrecht.
                Soweit nicht anders angegeben, sind alle Rechte bei Rettungsanker Freiburg GbR.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-8 mt-8 border-t border-gray-700 text-center text-sm text-gray-400">
            <p>
              Stand: {new Date().toLocaleDateString('de-DE', { year: 'numeric', month: 'long' })}
            </p>
            <p className="mt-2">
              Quelle:{' '}
              <a
                href="https://www.e-recht24.de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:text-yellow-300"
              >
                e-recht24.de
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Impressum
