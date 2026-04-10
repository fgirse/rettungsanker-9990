import React from 'react'

const Datenschutz = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12 text-yellow-500">
          Datenschutzerklärung
        </h1>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 shadow-xl space-y-8">
          {/* Einleitung */}
          <section>
            <div className="text-gray-300 space-y-3">
              <p>
                Wir freuen uns über Ihr Interesse an unserem Unternehmen. Der Schutz Ihrer
                personenbezogenen Daten ist uns ein wichtiges Anliegen. Im Folgenden informieren wir
                Sie ausführlich über den Umgang mit Ihren Daten.
              </p>
            </div>
          </section>

          {/* 1. Verantwortliche Stelle */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">1. Verantwortliche Stelle</h2>
            <div className="text-gray-300 space-y-3">
              <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
              <div className="bg-slate-900/50 p-4 rounded">
                <p className="font-semibold text-white">Rettungsanker Freiburg GbR</p>
                <p>Michael Schreck</p>
                <p>Adelhauserstraße 16</p>
                <p>79098 Freiburg im Breisgau</p>
                <p className="mt-2">
                  Telefon:{' '}
                  <a href="tel:+497612076620" className="text-yellow-400 hover:text-yellow-300">
                    +49 (0) 761 207 66 20
                  </a>
                </p>
                <p>
                  E-Mail:{' '}
                  <a
                    href="mailto:info@rettungsanker-freiburg.de"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    info@rettungsanker-freiburg.de
                  </a>
                </p>
              </div>
              <p className="text-sm">
                Der Verantwortliche entscheidet allein oder gemeinsam mit anderen über die Zwecke
                und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, Kontaktdaten o.
                Ä.).
              </p>
            </div>
          </section>

          {/* 2. Datenerfassung */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              2. Datenerfassung auf dieser Website
            </h2>

            {/* 2.1 Server-Log-Dateien */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-yellow-300">2.1 Server-Log-Dateien</h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so
                  genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies
                  sind:
                </p>
                <ul className="list-disc list-inside space-y-1 pl-4">
                  <li>Browsertyp und Browserversion</li>
                  <li>Verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p>
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
                  Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                  Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien
                  Darstellung und der Optimierung seiner Website – hierzu müssen die
                  Server-Log-Files erfasst werden.
                </p>
              </div>
            </div>

            {/* 2.2 Kontaktformular */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-yellow-300">
                2.2 Kontaktformular und E-Mail-Kontakt
              </h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <p>
                  Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre
                  Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
                  Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen
                  bei uns gespeichert.
                </p>
                <p>
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser
                  Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage
                  mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
                  vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die
                  Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der
                  an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer
                  Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
                </p>
                <p>
                  Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie
                  uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der
                  Zweck für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen –
                  insbesondere Aufbewahrungsfristen – bleiben unberührt.
                </p>
              </div>
            </div>

            {/* 2.3 Cookies */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-yellow-300">2.3 Cookies</h3>
              <div className="text-gray-300 space-y-3 text-sm">
                <p>
                  Unsere Website verwendet Cookies. Bei Cookies handelt es sich um kleine
                  Textdateien, die auf Ihrem Endgerät (Laptop, Tablet, Smartphone o.ä.) gespeichert
                  werden, wenn Sie unsere Webseite besuchen.
                </p>
                <p>
                  Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
                  informiert werden und einzeln über deren Annahme entscheiden oder die Annahme von
                  Cookies für bestimmte Fälle oder generell ausschließen können. Bei der
                  Nichtannahme von Cookies kann die Funktionalität unserer Website eingeschränkt
                  sein.
                </p>
                <p>
                  Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs oder zur
                  Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B.
                  Warenkorbfunktion) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit.
                  f DSGVO gespeichert.
                </p>
              </div>
            </div>
          </section>

          {/* 3. Ihre Rechte */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              3. Ihre Rechte als betroffene Person
            </h2>
            <div className="text-gray-300 space-y-4 text-sm">
              <p>Nach der DSGVO stehen Ihnen folgende Rechte zu:</p>

              <div>
                <h4 className="font-semibold text-white mb-2">
                  Recht auf Auskunft (Art. 15 DSGVO)
                </h4>
                <p>
                  Sie haben das Recht, Auskunft über Ihre von uns verarbeiteten personenbezogenen
                  Daten zu verlangen.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">
                  Recht auf Berichtigung (Art. 16 DSGVO)
                </h4>
                <p>
                  Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung Ihrer
                  bei uns gespeicherten personenbezogenen Daten zu verlangen.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">
                  Recht auf Löschung (Art. 17 DSGVO)
                </h4>
                <p>
                  Sie haben das Recht, die Löschung Ihrer bei uns gespeicherten personenbezogenen
                  Daten zu verlangen, soweit nicht die weitere Verarbeitung erforderlich ist.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">
                  Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)
                </h4>
                <p>
                  Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen
                  Daten zu verlangen.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">
                  Recht auf Datenübertragbarkeit (Art. 20 DSGVO)
                </h4>
                <p>
                  Sie haben das Recht, Ihre personenbezogenen Daten, die Sie uns bereitgestellt
                  haben, in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Widerspruchsrecht (Art. 21 DSGVO)</h4>
                <p>
                  Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben,
                  jederzeit gegen die Verarbeitung Sie betreffender personenbezogener Daten
                  Widerspruch einzulegen.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">
                  Recht auf Widerruf der Einwilligung (Art. 7 Abs. 3 DSGVO)
                </h4>
                <p>
                  Sie haben das Recht, Ihre erteilte Einwilligung jederzeit zu widerrufen. Die
                  Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-2">Beschwerderecht (Art. 77 DSGVO)</h4>
                <p>
                  Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren, wenn Sie der
                  Ansicht sind, dass die Verarbeitung Ihrer Daten gegen geltendes Recht verstößt.
                </p>
                <p className="mt-2">Zuständige Aufsichtsbehörde:</p>
                <div className="bg-slate-900/50 p-3 rounded mt-2">
                  <p className="font-semibold text-white">
                    Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit
                    Baden-Württemberg
                  </p>
                  <p>Postfach 10 29 32</p>
                  <p>70025 Stuttgart</p>
                  <p className="mt-1">
                    Website:{' '}
                    <a
                      href="https://www.baden-wuerttemberg.datenschutz.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                      www.baden-wuerttemberg.datenschutz.de
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Speicherdauer */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">4. Speicherdauer</h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt
                wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die
                Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen
                oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht,
                sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer
                personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche
                Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall
                dieser Gründe.
              </p>
            </div>
          </section>

          {/* 5. SSL/TLS-Verschlüsselung */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              5. SSL- bzw. TLS-Verschlüsselung
            </h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung
                vertraulicher Inhalte, wie zum Beispiel Anfragen, die Sie an uns als Seitenbetreiber
                senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen
                Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf
                &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
              <p>
                Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an
                uns übermitteln, nicht von Dritten mitgelesen werden.
              </p>
            </div>
          </section>

          {/* 6. Weitergabe von Daten */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              6. Weitergabe von Daten an Dritte
            </h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden
                aufgeführten Zwecken findet nicht statt. Wir geben Ihre persönlichen Daten nur an
                Dritte weiter, wenn:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-4">
                <li>
                  Sie Ihre ausdrückliche Einwilligung dazu erteilt haben (Art. 6 Abs. 1 lit. a
                  DSGVO),
                </li>
                <li>
                  die Weitergabe zur Erfüllung unserer rechtlichen Verpflichtungen erforderlich ist
                  (Art. 6 Abs. 1 lit. c DSGVO),
                </li>
                <li>
                  die Weitergabe zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen
                  erforderlich ist und kein Grund zur Annahme besteht, dass Sie ein überwiegendes
                  schutzwürdiges Interesse an der Nichtweitergabe Ihrer Daten haben (Art. 6 Abs. 1
                  lit. f DSGVO).
                </li>
              </ul>
            </div>
          </section>

          {/* 7. Online-Präsenzen in sozialen Medien */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              7. Online-Präsenzen in sozialen Medien
            </h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                Wir unterhalten Online-Präsenzen innerhalb sozialer Netzwerke, um mit den dort
                aktiven Kunden, Interessenten und Nutzern zu kommunizieren und sie dort über unsere
                Leistungen zu informieren.
              </p>
              <p>
                Wir weisen darauf hin, dass dabei Nutzerdaten außerhalb des Raumes der Europäischen
                Union verarbeitet werden können. Hierdurch können sich Risiken für die Nutzer
                ergeben, weil so z.B. die Durchsetzung der Rechte der Nutzer erschwert werden
                könnte.
              </p>
              <p>
                Ferner werden die Daten der Nutzer innerhalb sozialer Netzwerke im Regelfall für
                Marktforschungs- und Werbezwecke verarbeitet. Die Verarbeitung der personenbezogenen
                Daten der Nutzer erfolgt auf Grundlage unserer berechtigten Interessen an einer
                effektiven Information der Nutzer und Kommunikation mit den Nutzern gem. Art. 6 Abs.
                1 lit. f DSGVO.
              </p>
            </div>
          </section>

          {/* 8. Änderung der Datenschutzerklärung */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">
              8. Änderung der Datenschutzerklärung
            </h2>
            <div className="text-gray-300 space-y-3 text-sm">
              <p>
                Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den
                aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen
                in der Datenschutzerklärung umzusetzen, z.B. bei der Einführung neuer Services. Für
                Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
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

export default Datenschutz
