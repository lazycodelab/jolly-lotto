'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import ProfileUpdate from '@/dashboard/ProfileUpdate'
import ProfileLimit from '@/dashboard/ProfileLimit'
import { useAuth } from 'hooks/auth'
import ProfileOrders from '@/dashboard/ProfileOrders'
import ProfilePaymentMethods from '@/dashboard/ProfilePaymentMethods'
import NavSection from '@/dashboard/NavSection'
import VerifyEmailModal from '@/../components/VerifyEmailModal'
import { useSearchParams } from 'next/navigation'

export default () => {
	const { user, logout } = useAuth()
	const router = useRouter()
	const [activeNav, setActiveNav] = useState('')
	const newUser = useSearchParams().get('verified')

	if (newUser && typeof window !== 'undefined') {
		localStorage.setItem('__jl_user_verified', 1)
		logout()
	}

	useEffect(() => {
		if (user === '') {
			router.push('/login')
		}
	}, [user])

	if (user === '') {
		return <ErrorPage title="Unauthorized" statusCode={401} />
	}

	const setActiveNavigation = nav => {
		if (activeNav === nav) {
			setActiveNav('')
		} else {
			setActiveNav(nav)
		}
	}

	return (
		<>
			<NavSection selected={activeNav} />
			<section className="mx-auto max-w-5xl px-2">
				<p className="mt-5">
					<span className="font-bold">Current Account Status: </span>
					<span className="text-green-500">Active</span>
				</p>

				<div className="mx-auto w-full divide-y divide-black bg-white mb-20 mt-5 border-2">
					<Disclosure
						as="div"
						onClick={() => setActiveNavigation('Profile')}>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white p-4 text-left text-base font-medium">
									<span>Profile</span>
									<ChevronUpIcon
										className={`${
											open
												? 'transform rotate-0'
												: 'rotate-180'
										} h-5 w-5 text-cyan-500 transition-all`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-10 text-sm text-gray-500">
									<div>
										<h3>Personal Details</h3>
										<ProfileUpdate user={user} />
									</div>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Disclosure
						as="div"
						onClick={() => setActiveNavigation('Order History')}>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white p-4 text-left text-base font-medium">
									<span>Order History</span>
									<ChevronUpIcon
										className={`${
											open
												? 'transform rotate-0'
												: 'rotate-180'
										} h-5 w-5 text-cyan-500 transition-all`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="text-sm text-gray-500 overflow-x-auto">
									<ProfileOrders />
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Disclosure as="div">
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white p-4 text-left text-base font-medium">
									<span>Limits</span>
									<ChevronUpIcon
										className={`${
											open
												? 'transform rotate-0'
												: 'rotate-180'
										} h-5 w-5 text-cyan-500 transition-all`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
									<ProfileLimit />
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Disclosure as="div">
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white p-4 text-left text-base font-medium">
									<span>Payment Methods</span>
									<ChevronUpIcon
										className={`${
											open
												? 'transform rotate-0'
												: 'rotate-180'
										} h-5 w-5 text-cyan-500 transition-all`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
									<ProfilePaymentMethods />
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
					<Disclosure
						as="div"
						onClick={() => setActiveNavigation('Notification')}>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white p-4 text-left text-base font-medium">
									<span>Notifications</span>
									<ChevronUpIcon
										className={`${
											open
												? 'transform rotate-0'
												: 'rotate-180'
										} h-5 w-5 text-cyan-500 transition-all`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<p className="text-center mb-2 font-bold">
										No Notifcation!
									</p>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
				<VerifyEmailModal />
			</section>
		</>
	)
}
