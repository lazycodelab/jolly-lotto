import Layout from '../../components/Layout'
import { useAuth } from '../../hooks/auth'
import Head from 'next/head'
import { useRouter } from 'next/navigation'
import ErrorPage from 'next/error'
import Link from 'next/link'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import ProfileUpdate from '../../components/dashboard/profile-update'

export default () => {
	const { user } = useAuth()
	const router = useRouter()

	if (!router.isFallback && !user) {
		return <ErrorPage title="Unauthorized" statusCode={401} />
	}

	return (
		<Layout>
			<Head>
				<title>Dashboard</title>
			</Head>
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
										className={`${
											open ? 'rotate-180 transform' : ''
										} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 py-10 text-sm text-gray-500">
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
										className={`${
											open ? 'rotate-180 transform' : ''
										} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									If youre unhappy with your purchase for any
									reason, email us within 90 days and well
									refund you in full, no questions asked.
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
											open ? 'rotate-180 transform' : ''
										} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									If youre unhappy with your purchase for any
									reason, email us within 90 days and well
									refund you in full, no questions asked.
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
											open ? 'rotate-180 transform' : ''
										} h-5 w-5 text-purple-500`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
									If youre unhappy with your purchase for any
									reason, email us within 90 days and well
									refund you in full, no questions asked.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>
			</section>
		</Layout>
	)
}
