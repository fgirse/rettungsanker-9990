import React from 'react'
import FreiburgMarquee from './FreiburgMarquee'

const LiveTV = () => {
  return (
    <section id="section-liveTV" className="">
      <p className='text-5xl lg:text-[7rem] headingA text-yellow-600 text-center mt-60'>live tv</p>
   <div className="mt-[-60vh] lg:mt-5 bg-[url('/Assets/Img/sportarenawc.jpg')] bg-cover lg:bg-contain bg-no-repeat bg-center h-screen w-full flex-col items-center">
    <div>
            <div className="w-[66vw] mx-auto">
                  <FreiburgMarquee />
            </div>
            <div className=" w-[30vw] mx-auto">
                <p className='w-[50vw] font-sans text-shadow-green-500  lg:mt-[-36vh] text-sm md:text-[1.5rem] lg:text-[2.33rem] text-center'>Jeden Heimspieltag live TV die Spiele unseres SC Freiburg. Alle Euro-League Spiele des SC Freiburg. Ausgewählte Spiele der Champions-League und Spiele der grossen Turniere von EM und WM.</p>
            </div>

    </div>
  </div>
    </section>
  )
}

export default LiveTV