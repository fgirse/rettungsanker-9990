'use client'
import Modale01 from '../components/modale/Modale01'
import Modale02 from '../components/modale/Modale02'
import Image from 'next/image'
import VAGLogo from '../../public/Assets/Img/VAGLogo.png'

const Wohin = () => (
  <section
    id="section-wohin"
    className="mb-[4vh] bg-wohin bg-no-repeat w-full h-[130%] text-center text-yellow-500 flex flex-col items-center justify-between"
  >
    <h1 className="mt-[12vh] text-yellow-500 headingA text-[3rem] md:text-[6rem] ">Wohin ?</h1>
    <div className="flex flex-col justify-center items-center">
      <h1 className="mb-[3vh] text-[1.33rem] text-white md:w-[33vw] font-sans md:text-3xl">
        Sie finden die genaue Lage unseres Rettungsankers in der Kartenillustration der Altstadt
        Freiburg oder ganz profesionelle in Open-Street-Map
      </h1>
      <Modale01 />

      <Modale02 />
      <div className="mb-[5vh] w-[66vw]  bg-slate-800/10 rounded-2xl border flex flex-col justify-center items-center lg:flex-row gap-x-5">
        <Image className="mt-[5vh]  " src={VAGLogo} width="200" height="160" alt="VAG Logo" />
        <h1 className="text-orange text-[2rem] font-sans">&nbsp; &nbsp; Haltestelle: </h1>

        <h1 className="text-[2rem] font-sans"> &nbsp;Holzmarkt&nbsp;</h1>
        <h1 className="text-orange text-[2rem] font-sans ">Linie 1, 3 und 5</h1>
      </div>
    </div>
  </section>
)

export default Wohin
