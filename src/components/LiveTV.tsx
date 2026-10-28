import React from 'react'
import Link from 'next/link'
import FreiburgMarquee from './FreiburgMarquee'
import { lokalisierterPfad, type SprachCode } from '@/i18n/sprachen'
import { START } from '@/i18n/inhalte/start'

const LiveTV = ({ sprache }: { sprache: SprachCode }) => {
  const t = START[sprache].liveTv
  return (
    <section id="section-liveTV" className="">
      <p className="text-5xl lg:text-[7rem] headingA text-yellow-500 text-center mt-60">
        {t.zeile1} <br />
        {t.zeile2}
      </p>
      <div className="mt-[4vh] lg:mt-5 bg-[url('/Assets/Img/sportarenawc.jpg')] bg-cover lg:bg-contain bg-no-repeat bg-center h-screen w-full flex-col items-center rounded-xl">
        <div>
          <div className="py-12 md:w-[75vw] mx-auto">
            <FreiburgMarquee />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-center font-sans text-shadow-green-500  lg:mt-[-36vh] text-[1.0rem] md:text-[1.5rem] lg:text-[2.33rem] bg-black/40 w-[80vw] lg:w-[50vw] rounded-xl p-6  ">
              {t.text}
            </p>

            <Link
              href={lokalisierterPfad('/#section-contact', sprache)!}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-3 font-sans font-semibold text-white transition hover:opacity-90 hover:border-8 hover:border-gray-100"
            >
              {t.reservierung}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LiveTV
