import React from 'react'
import Image from 'next/image'
import LogoNeu from '../../../../../public/Assets/Img/LogoNeu.png'

const Impressum = () => {
  return (
    <section className="min-h-screen flex flex-col items-center md:flex-row justify-around bg-gray-900 p-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 max-w-6xl w-full">
        <div className="p-12 h-screen w-full md:w-1/2 bg-gray-800 mb-60">
          <h1 className="text-3xl text-yellow-600 md:text-4xl lg:text-6xl text-shadow-lg uppercase headingA font-bold mb-4">
            Impressum
          </h1>

          <p className="text-gray-100">
            Rettungsanker-Freiburg
            <br />
            Adelhauser-Strasse 7c
            <br />
            79098 Freiburg
          </p>

          <p className="text-gray-100">
            <strong>Vertreten durch:</strong>
            <br />
            Michael Schreck
          </p>

          <h2 className="text-yellow-600">Kontakt</h2>
          <p className="text-gray-100">
            Telefon: +49 761 383 867 47
            <br />
            E-Mail: rettungsanker-freiburg@gmx.de
          </p>

          <h2 className="text-yellow-600">Umsatzsteuer-ID</h2>
          <p className="text-gray-100">
            Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:
            <br />
            DE 142 114900
          </p>

          <h2 className="text-yellow-600">Redaktionell verantwortlich</h2>
          <p className="text-gray-100">
            Rettungsanker Freiburg
            <br />
            Michael Schreck, Staufener-Strasse 78, 79189 Bad Krozingen
          </p>

          <h2 className="text-yellow-600">
            Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle
          </h2>
          <p className="text-gray-100">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>

          <p className="text-gray-100">
            Quelle: <a href="https://www.e-recht24.de">e-recht24.de</a>
          </p>
        </div>
        <div className="h-screen w-full md:w-1/2 flex flex-col items-center">
          <Image
            src={LogoNeu}
            alt="Impressum Image"
            width={500}
            height={500}
            className="rounded-lg shadow-lg mt-8 md:mt-[10vh]"
          />
        </div>
      </div>
    </section>
  )
}

export default Impressum
