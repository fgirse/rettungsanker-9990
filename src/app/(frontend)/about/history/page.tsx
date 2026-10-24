// Geschichte-Seite: Die Filmkamera startet den Weltraumflug-Film direkt im Vollbild,
// ein eingebetteter Player ist daher nicht mehr nötig.
import HeroFilmkamera from '@/components/HeroFilmkamera'

const page = () => {
  return (
    <section className="bg-slate-800 min-h-screen">
      <div className="mx-auto flex min-h-[70vh] max-w-6xl flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <HeroFilmkamera />
        {/* Schriftgröße wächst mit der Fensterbreite, bleibt aber zwischen 1.5rem und 2.25rem.
            text-yellow-500 ist das Überschriften-Gelb wie bei „Galerie“; Bowlby One SC hat nur einen Schnitt, daher font-normal.
            Das "!" ist nötig, weil die globale h1-Regel in styles.css sonst Größe, Stärke und Abstände überschreibt. */}
        <h1 className="mt-8! mb-0! text-center font-['Bowlby_One_SC'] text-[clamp(1.5rem,5vw,2.25rem)]! leading-tight! font-normal! text-yellow-500">
          Geschichte des Rettungsankers
        </h1>
      </div>
    </section>
  )
}

export default page
