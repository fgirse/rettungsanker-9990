'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import './css/styles.css'

// Extend Window interface for jQuery and audiojs
declare global {
  interface Window {
    jQuery?: {
      myTimeline?: () => void
      [key: string]: unknown
    }
    audiojs?: unknown
  }
}

const History = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Load scripts only on client side, sequentially
    const scripts = [
      '/js/jquery/jquery-1.7.1.min.js',
      '/js/jquery/jquery-ui-1.8.18.custom.min.js',
      '/js/jquery/jquery.ui.touch-punch.js',
      '/js/audiojs/audio.min.js',
      '/js/tinyscrollbar/jquery.tinyscrollbar.js',
      '/js/tipsy/jquery.tipsy.js',
      '/js/prettyPhoto/js/jquery.prettyPhoto.js',
    ]

    const timelineScript = '/js/jquery.timeline.js'

    let loadedCount = 0
    let failedCount = 0

    const hidePreloader = () => {
      const preloader = document.querySelector('.preload') as HTMLElement
      if (preloader) {
        preloader.style.display = 'none'
        console.log('✅ Preloader hidden')
      }
    }

    const loadScript = (index: number) => {
      if (index >= scripts.length) {
        console.log(`✅ All scripts loaded (${loadedCount} success, ${failedCount} failed)`)
        // Now load the timeline script with a ready handler patch
        loadTimelineScript()
        return
      }

      const script = document.createElement('script')
      script.src = scripts[index]
      script.async = false
      script.type = 'text/javascript'

      script.onload = () => {
        loadedCount++
        console.log(`✅ Loaded (${index + 1}/${scripts.length}): ${scripts[index]}`)
        setTimeout(() => {
          loadScript(index + 1)
        }, 300)
      }
      script.onerror = () => {
        failedCount++
        console.error(`❌ Failed to load (${index + 1}/${scripts.length}): ${scripts[index]}`)
        setTimeout(() => {
          loadScript(index + 1)
        }, 300)
      }
      document.head.appendChild(script)
    }

    const loadTimelineScript = () => {
      const $ = window.jQuery
      if (!$) {
        console.error('jQuery not found')
        hidePreloader()
        return
      }

      // Load the timeline script
      const script = document.createElement('script')
      script.src = timelineScript
      script.async = false
      script.type = 'text/javascript'

      script.onload = () => {
        console.log('Timeline script loaded')

        // Give the script a moment to parse and define the function
        setTimeout(() => {
          console.log('Checking for $.myTimeline...')
          console.log('Type of $.myTimeline:', typeof $.myTimeline)
          console.log('audiojs available:', typeof window.audiojs !== 'undefined')

          // The timeline plugin defines $.myTimeline function
          // We commented out the document.ready() in the plugin, so call it manually
          if (typeof $.myTimeline === 'function') {
            console.log('$.myTimeline is a function, calling it...')
            try {
              $.myTimeline()
              console.log('Timeline initialized successfully')
            } catch (e) {
              console.error('Error calling $.myTimeline():', e)
            }
          } else {
            console.error('$.myTimeline is not a function')
          }

          hidePreloader()
        }, 100)
      }

      script.onerror = () => {
        console.error('Failed to load timeline script')
        hidePreloader()
      }

      document.head.appendChild(script)
    }

    loadScript(0) // Start loading from first script

    // Fallback: hide preloader after 8 seconds regardless
    const fallbackTimeout = setTimeout(() => {
      console.warn('⏱️ Timeout reached, hiding preloader')
      hidePreloader()
    }, 8000)

    return () => {
      clearTimeout(fallbackTimeout)
      // Cleanup: remove scripts
      ;[...scripts, timelineScript].forEach((src) => {
        const scriptElements = document.querySelectorAll(`script[src="${src}"]`)
        scriptElements.forEach((script) => script.remove())
      })
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <section className="width-[95vw] lg:width-[100vw] h-screen overflow-x-hidden">
        <div className=" flex flex-col items-center justify-center">
          {/* DEMO CONTAINER (THIS SHOULD BE YOUR DESTINATION DIV) */}
          <div className="lg:mt-12">
            {/* PRELOAD */}
            <div className="preload">
              <Image src="/images/preloader.gif" alt="" width={30} height={30} />
            </div>
            {/* TIMELINE CONTAINER */}
            <div id="timeline_container" className="overflow-x-hidden">
              {/* TIMELINE */}
              <div
                id="timeline"
                data-fadeindelay="3000"
                data-width="1052"
                data-height="450"
                data-imageswidth="3400"
                data-imagesheight="265"
                data-contentwidth="1670"
                data-contentheight="174"
                data-draggerwidth="59"
                data-draggerheight="21"
                data-mousewheel="1"
              >
                {/* VIEWPORT - IMAGES */}
                <div className="viewport">
                  <div className="images">
                    <Image src="/Assets/Svg/2017.svg" alt="2017" width={200} height={100} />
                    <Image src="/Assets/Img/Hero.png" alt="Hero" width={300} height={200} />
                    <Image src="/Assets/content_img_2.png" alt="" width={300} height={200} />
                    <Image src="/Assets/content_img_4.png" alt="" width={300} height={200} />
                    <Image src="/Assets/content_img_5.png" alt="" width={300} height={200} />
                    <Image src="/Assets/content_img_6.jpg" alt="" width={300} height={200} />
                  </div>
                </div>
                {/* SCROLLBAR (EDIT CSS FOR STYLING) */}
                <div className="scrollbar">
                  <div className="track">
                    {/*  MILESTONES MARKS */}
                    <div className="marks">
                      <div id="m0" className="mark" data-xpos="360" data-label="MARCH 2018"></div>
                      <div id="m1" className="mark" data-xpos="520" data-label="2005"></div>
                      <div
                        id="m2"
                        className="mark"
                        data-xpos="700"
                        data-label="2020 - PARTNERS"
                      ></div>
                      <div id="m3" className="mark" data-xpos="810" data-label="2021"></div>
                    </div>

                    <div className="dragger"></div>
                  </div>
                </div>
                {/* MILESTONES */}
                <div className="milestones">
                  <div className="content">
                    {/* MILESTONE SAMPLE 1 (FIRST) */}
                    <div className="column_first">
                      <div className="c200">
                        <span className="date">SEPTEMBER 2017 - EROEFFNUNG</span>
                        <span className="txt">
                          Michael Schreck und Volker Schneider eröffnen in Hommage an eine typische
                          Kiezkneipe auf St. Pauli - in der Altstadt{' '}
                          <strong>den Rettungsanker - Freiburg</strong>
                          <br />{' '}
                        </span>
                      </div>
                    </div>

                    {/* MILESTONE SAMPLE 2 */}
                    <div className="column">
                      <div className="c125">
                        <span className="date">2018</span>
                        <span className="txt">
                          Der Rettungsanker hat sich in der FreiburgerKnepipenszene voll etabliert
                        </span>
                        <span className="thumb">
                          <a href="#extended_text1" data-rel="prettyPhoto" title="">
                            <Image
                              src="/images/read_more.png"
                              width={30}
                              height={30}
                              alt=""
                              className="readmore"
                              title="READ MORE"
                            />
                          </a>
                        </span>

                        <div id="extended_text1" className="hidden">
                          {' '}
                          {/* SAMPLE OF HIDDEN DIV WITH EXTENDED CONTENT */}
                          <p>
                            <strong>Sample of extended content opened with lightbox</strong>
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip{' '}
                            <a href="http://www.themeforest.net" target="_blank">
                              sample of external link
                            </a>
                            . Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MILESTONE SAMPLE 3 */}
                    <div className="column">
                      <div className="c125">
                        <span className="date">SEPTEMBER 2019</span>
                        <span className="txt">
                          Der Rettungsanker-Freiburg feiert sein zweijähriges Bestehen!
                        </span>
                        <span className="date">
                          <br />
                          NOVEMBER 2019
                        </span>
                        <span className="txt">
                          Volker Schneider wird zum Jahresende den Rettungsanker verlassen.
                        </span>
                      </div>
                    </div>

                    {/* MILESTONE SAMPLE 4 */}
                    <div className="column">
                      <div className="c125">
                        <span className="date">
                          2020 - JANUAR
                          <br />
                          NEUE LEITUNG DES RETTUNGSANKERS-FREIBURG !
                        </span>
                        <span className="thumb">
                          <a
                            href="http://vimeo.com/24492485"
                            data-rel="prettyPhoto"
                            title="20 Years Anniversary Video"
                            className="video_rollover"
                          >
                            <Image
                              src="/Assets/Img/portraitmick.png"
                              width={30}
                              height={30}
                              alt=""
                            />
                          </a>
                        </span>
                        <span className="thumb_description">Michel Schreck</span>
                      </div>
                    </div>

                    {/* MILESTONE SAMPLE 5 */}
                    <div className="column">
                      <div className="c150">
                        <span className="date">SEPTEMBER 2021</span>
                        <span className="txt">
                          DerRettungsanker-Freiburg feiert sein 4-jähriges Bestehen!
                        </span>
                        <span className="big_link">
                          <a
                            href="images/gallery_sample_02.jpg"
                            data-rel="prettyPhoto[sample_gallery]"
                            title="Gallery sample 01"
                          >
                            {' '}
                            IMAGE GALLERY
                          </a>
                        </span>

                        <div className="hidden">
                          {' '}
                          {/* SAMPLE OF HIDDEN GALLERY ITEMS */}
                          <a
                            href="images/gallery_sample_01.jpg"
                            data-rel="prettyPhoto[sample_gallery]"
                            title="Gallery sample 02"
                          ></a>
                          <a
                            href="images/gallery_sample_03.jpg"
                            data-rel="prettyPhoto[sample_gallery]"
                            title="Gallery sample 03"
                          ></a>
                        </div>
                      </div>
                    </div>

                    {/* MILESTONE SAMPLE 6 */}
                    <div className="column">
                      <div className="c125">
                        <span className="date">SEPTEMBER 2022</span>
                        <span className="txt">Externe Links:</span>
                        <span className="link">
                          <br />
                          <a href="http://themeforest.net/user/pezflash" target="_blank">
                            www.envato.com
                          </a>
                        </span>
                        <span className="link">
                          <a href="http://themeforest.net/user/pezflash" target="_blank">
                            www.themeforest.net
                          </a>
                        </span>
                        <span className="link">
                          <a href="http://themeforest.net/user/pezflash" target="_blank">
                            www.codecanyon.net
                          </a>
                        </span>
                      </div>
                    </div>

                    {/* MILESTONE SAMPLE 7 */}
                    <div className="column">
                      <div className="c225">
                        <span className="date">2023 - NEUES LOGO -</span>
                        <span>
                          <Image src="/Assets/Img/LogoNeu.png" alt="Logos" width={50} height={50} />
                        </span>
                        <span className="txt">
                          Das Logo zeigt das alte Logo des Rettungsankers im oberen Drittel. Im
                          unteren Drittel ist stilistisch die Freiburger Silhouette bei Nacht
                          angedeutet. &quot;DEIN TREFF&quot; Symbol für die Philosophie: Treffpunkt
                          für jung + alt.
                        </span>
                        <span className="thumb">
                          <a href="#extended_text2" data-rel="prettyPhoto" title="">
                            <Image
                              src="/images/read_more.png"
                              alt=""
                              width={30}
                              height={30}
                              className="readmore"
                              title="READ MORE"
                            />
                          </a>
                        </span>

                        <div id="extended_text2" className="hidden">
                          {' '}
                          {/* SAMPLE OF HIDDEN DIV WITH EXTENDED CONTENT */}
                          <p>
                            <strong>Sample of extended content opened with lightbox</strong>
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip{' '}
                            <a href="http://www.themeforest.net" target="_blank">
                              sample of external link
                            </a>
                            . Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* MILESTONE SAMPLE 8 */}
                    <div className="column">
                      <div className="c125">
                        <span className="date">2024 - SEPTEMBER </span>
                        <span className="thumb">
                          <a
                            href="images/gallery_sample_01.jpg"
                            data-rel="prettyPhoto[sample_gallery2]"
                            title="5 Years Anniversary Video"
                            className="image_rollover"
                          >
                            <Image
                              src="/images/image_sample_thumb.png"
                              width={30}
                              height={30}
                              alt=""
                            />
                          </a>
                        </span>
                        <span className="thumb_description">Image description</span>

                        <div className="hidden">
                          {' '}
                          {/* SAMPLE OF HIDDEN GALLERY ITEMS */}
                          <a
                            href="/images/gallery_sample_02.jpg"
                            data-rel="prettyPhoto[sample_gallery2]"
                            title="Gallery sample 02"
                          ></a>
                          <a
                            href="/images/gallery_sample_03.jpg"
                            data-rel="prettyPhoto[sample_gallery2]"
                            title="Gallery sample 03"
                          ></a>
                        </div>
                      </div>
                    </div>

                    {/* MILESTONE SAMPLE 9 */}
                    <div className="column">
                      <div className="c125">
                        <span className="date">2025 - SEPTEMBER </span>
                        <span className="thumb">
                          <a
                            href="images/gallery_sample_01.jpg"
                            data-rel="prettyPhoto[sample_gallery2]"
                            title="5 Jahre Rettungsanker Geburtstags- Video"
                            className="image_rollover"
                          >
                            <Image
                              src="/images/image_sample_thumb.png"
                              width={30}
                              height={30}
                              alt=""
                            />
                          </a>
                        </span>
                        <span className="thumb_description">Image description</span>

                        <div className="hidden">
                          {' '}
                          {/* SAMPLE OF HIDDEN GALLERY ITEMS */}
                          <a
                            href="/images/gallery_sample_02.jpg"
                            data-rel="prettyPhoto[sample_gallery2]"
                            title="Gallery sample 02"
                          ></a>
                          <a
                            href="/images/gallery_sample_03.jpg"
                            data-rel="prettyPhoto[sample_gallery2]"
                            title="Gallery sample 03"
                          ></a>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                  {/* end content */}
                </div>{' '}
                {/* end milestones */}
                {/* AUDIO PLAYER */}
                <div className="audio_player">
                  <audio
                    src="/mp3/Hans Albers - Auf der Reeperbahn Nachts um halb eins MP3 Klingelton [A4P].mp3"
                    preload="auto"
                  >
                    <p>Your browser doesn&apos;t support HTML5 audio.</p>
                  </audio>
                  <div className="player">
                    <div className="controls">
                      <div className="play-pause"></div>
                      <div className="scrubber">
                        <div className="progress"></div>
                        <div className="loaded"></div>
                      </div>
                      <div className="time">
                        <span className="current">0:00</span>
                        <span className="duration">0:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{' '}
              {/* end timeline */}
              {/* SHADOW */}
              <div className="shadow">
                <Image src="/images/shadow.png" alt="" width={700} height={100} />
              </div>
            </div>{' '}
            {/* end timeline container */}
          </div>{' '}
          {/* end container */}
        </div>
        <h1 className="mt-[8vh] text-center text-6xl font-bold">Timeline</h1>
        <h1 className="text-center mt-[2vh] text-3xl lg:text-6xl font-bold">
          Rettungsanker Freiburg
        </h1>
        <div className="flex justify-center">
          <h1 className="border w-2/3 text-base lg:w-1/3 text-center mt-[2vh] lg:text-xl font-bold">
            Oben rechts zeigt sich ein Lautsprechersymbol- Drücken Sie es und hören Sie &quot;...
            auf der Reeperbahn Nachts um halb Eins !&quot; <br />
            Bewege in der Zeitleiste mit der Maus ◀️▶️
          </h1>
        </div>
      </section>
    </>
  )
}

export default History
