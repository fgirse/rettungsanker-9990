'use client'

import Spline from '@splinetool/react-spline/next';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[url('/Assets/SVG/5555.svg')] bg-contain bg-no-repeat bg-center">
      <Spline
        scene="https://prod.spline.design/aiMa8ypM2n-Dl8eU/scene.splinecode" 
      />
    </main>
  )
}
