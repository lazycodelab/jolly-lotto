'use client'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useEffect } from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
import { useGlobalContext } from '../context/appProvider'
import axios from 'lib/axios'

export default function () {
    const { isModalOpen, setIsModalOpen,isEmailVerified, isResetBtnDisable } = useGlobalContext()

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
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all text-center">
                                <div className='flex justify-center mb-2'>
                                    <ExclamationCircleIcon className='w-16 text-yellow-400' />
                                </div>
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900">
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

                                <div className="mt-4">
                                    <button
                                        className={`inline-flex justify-center rounded-md border border-transparent ${isResetBtnDisable === true ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-100 text-blue-900 hover:bg-blue-200'} px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2`}
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
