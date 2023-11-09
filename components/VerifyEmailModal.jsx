'use client'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useGlobalContext } from '../context/appProvider'
import axios from 'lib/axios'

export default function () {
    const { isModalOpen, setIsModalOpen, isResetBtnDisable } = useGlobalContext()

    const handleResendEmail = async () => {
        setIsModalOpen(false)
        axios.get('/resend-email').then((res) => {
            if (res.data) {
                console.log(res.data);
            }
        }).catch((err) => console.log(err));
    }

    return (
        <>
            <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                static
                className="relative z-10"
                onClose={() => setIsModalOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#FFF4E4] p-6 px-10 align-middle shadow-xl transition-all text-center">
                                <div className='absolute right-0 top-0 p-3 cursor-pointer' onClick={() => setIsModalOpen(false)}>
                                    <XMarkIcon className='w-8 text-gray-500'/>
                                </div>
                                <div className='flex justify-center mb-2'>
                                    <ExclamationCircleIcon className='w-16 text-[#FFA319]' />
                                </div>
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-[#FFA319]">
                                    Verfication email sent!
                                </Dialog.Title>


                                <p className="text-sm text-gray-500 mt-3">
                                    To complete your registration, you need to verify your email address.
                                </p>
                                <p className="text-sm text-gray-500 mt-3">
                                    Please check your inbox and click the verification link to complete registration.
                                </p>
                                <p className="text-sm text-red-600 mt-5">
                                    If you did not get an email, Please check your spam/junk folder.
                                </p>

                                <div className="mt-6">
                                    <button
                                        className={`inline-flex w-full justify-center rounded-xl focus-visible:outline-none ${isResetBtnDisable === true ? 'bg-gray-200 cursor-not-allowed' : 'bg-[#00D4E3] text-white'} p-3 text-md font-medium shadow-[0px_2px_0px_#00ACB8]`}
                                        onClick={() => handleResendEmail()}
                                        disabled={isResetBtnDisable}>
                                        Re-send Email
                                    </button>
                                    {
                                        isResetBtnDisable === true &&
                                        <p className='text-sm text-red-600 mt-2'>You can resend the email in 5 minutes</p>
                                    }
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
            </Transition>
        </>
    )
}
