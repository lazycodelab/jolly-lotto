import Layout from '@/components/Layout'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Link from 'next/link'
import cl from 'classnames'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import FormInput from '@/components/FormInput'
import FormSelect from '@/components/FormSelect'
import { useState } from 'react'

export default () => {
	const { user } = useAuth()
	const router = useRouter()
	const [loading, setLoading] = useState(false)

	if (!router.isFallback && !user) {
		return <ErrorPage title="Unauthorized" statusCode={401} />
	}

	const userName = user.user.name.split(' ')
	const firstName = userName[0]
	const lastName = userName[1]

	const handleSome = () => {
		console.log('handleSome', setLoading(true))
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

										<div>
											<form
												method="POST"
												onSubmit={handleSome}
												className="mt-8 grid grid-cols-1 gap-x-10 md:grid-cols-2">
												<div className="flex-1 space-y-5">
													<FormInput
														type="email"
														value={user.user.email}
														label="Email"
														placeholder="Email"
														disabled
													/>
													<div className="flex gap-x-3">
														<FormSelect
															label="Title"
															isReq={true}
															options={[
																'Mr.',
																'Mrs.',
															]}
														/>
														<FormInput
															label="First Name"
															placeholder="First Name"
															value={firstName}
														/>
													</div>
													<FormInput
														label="Last Name"
														placeholder="Last Name"
														value={lastName}
													/>
													<div className="flex items-end gap-x-3">
														<FormInput label="Date of birth" />
													</div>
												</div>

												<div className="flex-1 space-y-5">
													<FormSelect
														label="Country"
														options={[
															'United Kingdom',
															'United States',
															'Canada',
															'Uganda',
														]}
														isReq={true}
													/>
													<FormInput label="Address" />
													<div className="flex gap-x-3">
														<FormInput label="City" />
														<FormInput label="State" />
													</div>
													<FormInput
														label="Post Code"
														isReq={true}
													/>

													<div className="flex justify-end">
														<button
															type="submit"
															{...(loading && {
																disabled:
																	'disabled',
															})}
															className={cl(
																'rounded-md py-2 px-8 text-base font-semibold text-white shadow-md ',
																{
																	'cursor-not-allowed bg-slate-300':
																		loading ===
																		true,
																	'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400':
																		loading !==
																		true,
																},
															)}>
															Update
														</button>
													</div>
												</div>
											</form>
										</div>
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
								<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
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
								<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
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
								<Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
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
