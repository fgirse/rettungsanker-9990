'use client'

import Map from '../Leaf/Map'
import { Dialog, DialogBackdrop, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState } from 'react'
import Tooltip from '../../utils/SimpleTooltip'
import styles from '../../styles/Home.module.scss'

const DEFAULT_CENTER = [47.99287, 7.84967]

export default function Modale02() {
  const [isOpen, setIsOpen] = useState(false)
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center">
        <div className="example-wrapper">
          <Tooltip content="Click zu Karte Openstreet!!!" direction="right">
            <button
              type="button"
              onClick={openModal}
              className="mb-[3vw] w-60 rounded-md border bg-yellow-600 bg-opacity-80 px-4 py-2 text-[1.66rem] font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Openstreet Map
            </button>
          </Tooltip>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogBackdrop className="fixed inset-0  bg-slate-700/75" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="border-gray-100-500 w-full max-w-md transform overflow-hidden rounded-2xl border bg-slate-900 p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <div>
                      <h1 className="mb-5 text-yellow-600 text-3xl text-center headingA">
                        openstreet map
                      </h1>

                      <Map
                        className={styles.homeMap}
                        width="800"
                        height="400"
                        center={DEFAULT_CENTER}
                        zoom={12}
                      >
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {({ TileLayer, Marker, Popup }: any) => (
                          <>
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={DEFAULT_CENTER}>
                              <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                              </Popup>
                            </Marker>
                          </>
                        )}
                      </Map>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      zurück
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
