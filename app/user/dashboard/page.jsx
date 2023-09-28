'use client'
import { useRouter } from 'next/navigation'
import React,{ useEffect,useState } from 'react'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import ProfileUpdate from '@/dashboard/ProfileUpdate'
import ProfileLimit from '@/dashboard/ProfileLimit'
import { useAuth } from 'hooks/auth'
import ProfileOrders from '@/dashboard/ProfileOrders'
import ProfilePaymentMethods from '@/dashboard/ProfilePaymentMethods'

export default () => {
	const { user } = useAuth()
	const router = useRouter()

	useEffect(() => {
		if (user === '') {
			router.push('/login')
		}
	}, [user])

	if (user === '') {
		return <ErrorPage title="Unauthorized" statusCode={401} />
	}

	return (
		<>
			<nav className="bg-gray-200">
				<div className="container mx-auto flex max-w-md items-center justify-center space-x-5 py-3">
					<Link
						className="border-b-2 border-slate-300 hover:border-slate-500"
						href="/account">
						Account
					</Link>
					<Link
						className="border-b-2 border-slate-300 hover:border-slate-500"
						href="/account">
						Wallet
					</Link>
					<Link
						className="border-b-2 border-slate-300 hover:border-slate-500"
						href="/account">
						Orders
					</Link>
					<Link
						className="border-b-2 border-slate-300 hover:border-slate-500"
						href="/account">
						Notifications
					</Link>
				</div>
			</nav>
			<section className="mx-auto max-w-5xl">
				<p className="mt-5">
					<span className="font-bold">Current Account Status: </span>
					<span className="text-green-500">Active</span>
				</p>

				<div className="mx-auto w-full divide-y divide-black bg-white p-2">
					<Disclosure as="div">
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white p-4 text-left text-base font-medium">
									<span>Profile</span>
									<ChevronUpIcon
										className={`${open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-purple-500`}
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
					<Disclosure as="div">
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between bg-white p-4 text-left text-base font-medium">
									<span>Order History</span>
									<ChevronUpIcon
										className={`${open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
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
										className={`${open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
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
										className={`${open ? 'rotate-180 transform' : ''
											} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									<ProfilePaymentMethods />
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</section>
		</>
	)
}
