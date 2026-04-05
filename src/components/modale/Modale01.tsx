'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { Fragment, useState } from 'react'
import Image from 'next/image'
import Map from '../../../public/Assets/Img/MapFreiburg.png'
import Tooltip from '../../utils/SimpleTooltip'

export default function Modal01() {
  const [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div className="inset-0 flex items-center justify-center border border-red-500">
        <div className="example-wrapper">
          <Tooltip content="öffne Kartenillustration Alt-Freiburg !!!" direction="right">
            <button
              type="button"
              onClick={openModal}
              className="mb-[3vw] w-60 rounded-md border bg-orange-500 bg-opacity-80 px-4 py-2 text-[1.66rem] font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
            >
              Karte Alstadt
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
                  <DialogTitle as="h3" className="text-3xl font-medium leading-6 text-amber-500">
                    Karte Altstadt
                  </DialogTitle>
                  <div className="mt-2">
                    <div className="mx-auto mt-12  mb-12 w-[90%] max-w-sm items-center border border-gray-50 bg-slate-900 px-5 py-4 text-center shadow-2xl shadow-gray-400 lg:w-96 lg:max-w-xl">
                      <Image
                        src={Map}
                        alt="Illustration Altstadt"
                        height="900"
                        width="955"
                        layout="responsive"
                      />
                      <h1 className="mt-2 mb-2 text-center text-xs text-gray-100">
                        Illustration Altstadt Freiburg{' '}
                      </h1>
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
