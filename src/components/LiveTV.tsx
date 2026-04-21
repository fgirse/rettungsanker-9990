import React from 'react'
import FreiburgMarquee from './FreiburgMarquee'

const LiveTV = () => {
  return (
    <section id="section-liveTV" className="">
      <p className="text-5xl lg:text-[7rem] headingA text-yellow-600 text-center mt-60">
        Fussball <br />
        live tv
      </p>
      <div className="mt-[4vh] lg:mt-5 bg-[url('/Assets/Img/sportarenawc.jpg')] bg-cover lg:bg-contain bg-no-repeat bg-center h-screen w-full flex-col items-center rounded-xl">
        <div>
          <div className="py-12 md:w-[75vw] mx-auto">
            <FreiburgMarquee />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-center font-sans text-shadow-green-500  lg:mt-[-36vh] text-[1.0rem] md:text-[1.5rem] lg:text-[2.33rem] bg-black/40 w-[80vw] lg:w-[50vw] rounded-xl p-6  ">
              Jeden Bundesligaspieltag: live TV die Spiele unseres SC Freiburg. Alle Euro-League
              Spiele des SC Freiburg! Ausgewählte Spiele der Champions-League und Spiele der grossen
              Turniere von UEFA EM- und FIFA WM Turnieren.
            </p>

            <a
              href="#section-contact"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-yellow-500 px-6 py-3 font-sans font-semibold text-white transition hover:opacity-90 hover:border-8 hover:border-gray-100"
            >
              Reservierung Live TV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LiveTV
