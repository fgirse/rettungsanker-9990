// Geschichte-Seite: zeigt den Weltraumflug-Film statt der früheren Timeline.
// Kein Autoplay und nur preload="metadata", damit das ca. 31 MB große Video erst
// beim Abspielen geladen wird. Das Vorschaubild (Szene bei 1:10) ersetzt den fast
// schwarzen Videoanfang.
// Die Breite ist zusätzlich durch die Fensterhöhe begrenzt, damit das Video im Querformat
// komplett sichtbar bleibt, ohne schwarze Ränder.
const VIDEO_SRC = '/media/rettungsanker-weltraumflug-layla.mp4'
const POSTER_SRC = '/media/rettungsanker-weltraumflug-layla-poster.jpg'

const page = () => {
  return (
    <section className="bg-slate-800 min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <video
          className="mx-auto block aspect-video w-[min(100%,calc(85vh*16/9))] rounded-2xl bg-black shadow-2xl"
          controls
          playsInline
          preload="metadata"
          poster={POSTER_SRC}
          aria-label="Rettungsanker – Weltraumflug mit Layla"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          Dein Browser kann dieses Video nicht abspielen.{' '}
          <a href={VIDEO_SRC} className="underline">
            Video herunterladen
          </a>
        </video>
        {/* Schriftgröße wächst mit der Fensterbreite, bleibt aber zwischen 1.5rem und 2.25rem.
            #ecc016 ist das Hauptgelb aus dem Logo; Bowlby One SC hat nur einen Schnitt, daher font-normal.
            Das "!" ist nötig, weil die globale h1-Regel in styles.css sonst Größe, Stärke und Abstände überschreibt. */}
        <h1 className="mt-8! mb-0! text-center font-['Bowlby_One_SC'] text-[clamp(1.5rem,5vw,2.25rem)]! leading-tight! font-normal! text-[#ecc016]">
          Geschichte des Rettungsankers
        </h1>
      </div>
    </section>
  )
}

export default page
