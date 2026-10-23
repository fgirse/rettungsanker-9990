'use client'
import Modale01 from '../components/modale/Modale01'
import Modale02 from '../components/modale/Modale02'
import Image from 'next/image'
import VAGLogo from '../../public/Assets/Img/VAGLogo.png'

const Wohin = () => (
  <section
    id="section-wohin"
    className="pb-[16vh] bg-wohin bg-no-repeat w-full h-[130%] text-center text-yellow-500 flex flex-col items-center justify-between"
  >
    <h1 className="mt-[12vh] text-yellow-500 headingA text-[3rem] md:text-[6rem] ">Wohin ?</h1>
    <div className="flex flex-col justify-center items-center">
      {/* Absatz statt h1: die globale h1-Regel blies den Text sonst auf 42–64px in einer schmalen Spalte auf */}
      <p className="mt-0 mb-[3vh] w-[90vw] max-w-3xl font-sans text-lg leading-snug text-white md:w-[70vw] md:text-2xl lg:w-[50vw] lg:text-3xl">
        Sie finden die genaue Lage unseres Rettungsankers in der Kartenillustration der Altstadt
        Freiburg oder ganz professionell in Open-Street-Map
      </p>
      <Modale01 />

      <Modale02 />
      <div className="mb-[5vh] w-[95vw]  bg-slate-800/10 rounded-2xl border flex flex-col justify-center items-center lg:flex-row lg:gap-x-1 lg:items-center">
        <Image className="mt-[5vh]  " src={VAGLogo} width="200" height="160" alt="VAG Logo" />
        <h1 className="text-orange text-[1.0rem] font-sans">&nbsp; &nbsp; Haltestelle: </h1>

        <h1 className="text-[1rem] font-sans"> &nbsp;Holzmarkt&nbsp;</h1>
        <h1 className=" text-[1rem] font-sans">Linie 1, 3 und 5</h1>
      </div>
    </div>
  </section>
)

export default Wohin
