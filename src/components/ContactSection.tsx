import ContactForm from '@/components/ContactForm'

export default function ContactSection() {
  return (
    <section
      id="section-contact"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.2),transparent_35%),linear-gradient(180deg,#1b252d_0%,#1c252c_100%)] px-6 py-20 md:px-10 lg:px-16 lg:py-28"
    >
      <div className="mx-auto max-w-6xl">
        {/* minmax(0, 1fr) erlaubt der Spalte, schmaler als ihr breitestes Wort zu werden; sonst zieht
            die gesperrte Überschrift sie auf und Text und Formular werden rechts abgeschnitten.
            Zweispaltig erst ab xl, weil Überschrift und Formular bei 1024px nicht nebeneinander passen. */}
        <div className="grid grid-cols-[minmax(0,1fr)] gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:items-start">
          <div className="max-w-xl">
            <p className="font-sans headingA text-4xl max-sm:text-[clamp(1.5rem,8vw,2.25rem)] lg:text-7xl uppercase tracking-[0.4em] text-yellow-500/80">
              Kontakt
            </p>
            <h2 className="mt-4 font-sans text-3xl font-black text-white md:text-5xl">
              Anfragen für Reservierungen, Events und geschlossene Gesellschaften
            </h2>
            <p className="mt-5 font-sans text-lg leading-8 text-zinc-300">
              Schreib uns direkt über die Website. Deine Nachricht geht an rettungsanker-freiburg@gmx.de und
              enthält auf Wunsch direkt Telefonnummer und Veranstaltungsdatum für schnellere
              Rückfragen.
            </p>
            <div className="mt-8 space-y-4 rounded-3xl border border-yellow-500/20 bg-black/20 p-6 backdrop-blur-sm">
              <p className="font-sans text-sm uppercase tracking-[0.25em] text-yellow-500">
                Direktkontakt
              </p>
              <p className="font-sans text-xl font-bold text-white break-words">rettungsanker-freiburg@gmx.de</p>
              <p className="font-sans text-sm leading-6 text-zinc-400">
                Für Spam-Schutz nutzt das Formular Cloudflare Turnstile, ein Honeypot-Feld, eine
                Mindest-Ausfüllzeit und Redis-basiertes Rate-Limiting über Upstash.
              </p>
            </div>
          </div>

          <div className="rounded-4xl border border-yellow-500/40 bg-zinc-950/80 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur md:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
