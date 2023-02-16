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

	console.log('asdas', user)
	const handleSome = () => {
		console.log('handleSome')
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
									If you're unhappy with your purchase for any
									reason, email us within 90 days and we'll
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
									If you're unhappy with your purchase for any
									reason, email us within 90 days and we'll
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
									If you're unhappy with your purchase for any
									reason, email us within 90 days and we'll
									refund you in full, no questions asked.
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				</div>

				{/*<div className="auto-container">
					<div className="current-acc-row">
						<div className="current-acc-heading">
							<p>
								<b>
									Current Account Status:{' '}
									<span className="active-acc"> Active</span>{' '}
									<span className="or-color"> Or</span>{' '}
									<span className="acc-disable">
										{' '}
										Disabled{' '}
									</span>{' '}
								</b>
								please email customer service for more
								information at info@jollylotto.com
							</p>
						</div>
						<div className="account-accordion-container">
							<div className="accordion-container">
								<div className="set">
									<a href="#">
										Profile
										<i className="down-carret"></i>
									</a>
									<div className="content">
										<div className="acc-data-tab">
											<div className="persnal-acc-data">
												<h3>Personal Details</h3>
												<form>
													<div className="form-field col-12">
														<label>
															Title <sub>*</sub>
														</label>
														<select>
															<option>Mr.</option>
															<option>
																Mrs.
															</option>
														</select>
													</div>
													<div className="form-field col-35">
														<label>
															First Name{' '}
															<sub>*</sub>
														</label>
														<input
															type="text"
															name=""
														/>
													</div>
													<div className="form-field col-50">
														<label>
															Last Name{' '}
															<sub>*</sub>
														</label>
														<input
															type="text"
															name=""
														/>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
								<div className="set">
									<a href="#">
										Order History
										<i className="down-carret"></i>
									</a>
									<div className="content">
										<div className="acc-data-tab">
											<form>
												<div className="form-field col-25">
													<label>Title *</label>
													<div className="date-calender">
														<input
															type="text"
															name=""
															id="datepicker"
														/>
													</div>
												</div>
												<div className="form-field col-25">
													<label>First Name</label>
													<input
														type="text"
														name=""
													/>
												</div>
												<div className="form-field col-25">
													<label>Last Name</label>
													<select>
														<option>All</option>
													</select>
												</div>
											</form>
											<div className="reset-search">
												<button className="reset-search-text">
													Reset
												</button>
												<button className="reset-search-btn orange-btn">
													Search
												</button>
											</div>
											<div className="acc-sale-row-scroll">
												<div className="acc-sale-row">
													<div className="acc-sale-head">
														<div className="sale-name">
															<p>
																<b>Sale Date</b>
															</p>
														</div>
														<div className="sale-order-number">
															<p>
																<b>
																	Order Number
																</b>
															</p>
														</div>
														<div className="sale-order-via">
															<p>
																<b>Order Via</b>
															</p>
														</div>
														<div className="sale-order-via">
															<p>
																<b>
																	Total Bet{' '}
																	<br />
																	Amount (GBP)
																</b>
															</p>
														</div>
														<div className="sale-order-bet"></div>
													</div>
													<div className="acc-sale-body">
														<div className="acc-sale-body-data errow-active">
															<div className="sale-name">
																<p>
																	2019 Sep 11,
																	13:05PST
																</p>
															</div>
															<div className="sale-order-number">
																<p>
																	ORD-123456789-01
																</p>
															</div>
															<div className="sale-order-via">
																<p>Phone</p>
															</div>
															<div className="sale-order-via">
																<p>5.00</p>
															</div>
															<div className="sale-order-bet">
																<p>
																	<a href="">
																		Bet
																		Again
																	</a>
																</p>
															</div>
														</div>
														<div className="acc-sale-slide-data">
															<div className="acc-item-sale">
																<div className="acc-item">
																	<p>
																		<b>
																			Item
																			#
																		</b>
																	</p>
																</div>
																<div className="acc-item-product">
																	<p>
																		<b>
																			Product
																		</b>
																	</p>
																</div>
																<div className="acc-item-type">
																	<p>
																		<b>
																			Type
																		</b>
																	</p>
																</div>
																<div className="acc-item-subscription">
																	<p>
																		<b>
																			Subscription
																		</b>
																	</p>
																</div>
																<div className="acc-item-promo-code">
																	<p>
																		<b>
																			Promo
																			Code
																		</b>
																	</p>
																</div>
																<div className="acc-item-lines">
																	<p>
																		<b>
																			Lines
																		</b>
																	</p>
																</div>
																<div className="acc-item-drows">
																	<p>
																		<b>
																			Drows
																		</b>
																	</p>
																</div>
																<div className="acc-item-price">
																	<p>
																		<b>
																			Price
																			Per
																			Unit
																		</b>
																	</p>
																</div>
																<div className="acc-item-priceSum">
																	<p>
																		<b>
																			Price
																			Sum
																		</b>
																	</p>
																</div>
																<div className="acc-item-promo-amt">
																	<p>
																		<b>
																			Promo
																			Amount
																		</b>
																	</p>
																</div>
																<div className="acc-item-promo-bet">
																	<p>
																		<b>
																			Bet
																			Amount
																		</b>
																	</p>
																</div>
																<div className="acc-item-billing">
																	<p>
																		<b>
																			Billing
																			Interval
																		</b>
																	</p>
																</div>
																<div className="acc-item-source">
																	<p>
																		<b>
																			Source
																		</b>
																	</p>
																</div>
																<div className="acc-item-status">
																	<p>
																		<b>
																			Status
																		</b>
																	</p>
																</div>
																<div className="acc-item-fulfilment">
																	<p>
																		<b>
																			Fulfilment
																			Date{' '}
																			<span className="acc-exlamation">
																				!
																			</span>
																		</b>
																	</p>
																</div>
																<div className="acc-item-total-winning">
																	<p>
																		<b>
																			Total
																			Winnings{' '}
																			<span className="small-font">
																				product
																				currency
																			</span>
																		</b>
																	</p>
																</div>
																<div className="acc-item-total-winning">
																	<p>
																		<b>
																			Total
																			Winnings{' '}
																			<span className="small-font">
																				account
																				currency
																			</span>
																		</b>
																	</p>
																</div>
															</div>
															<div className="acc-item-slide-sale-info-row">
																<div className="acc-item-slide-sale-info errow-active">
																	<div className="acc-item">
																		<p>1</p>
																	</div>
																	<div className="acc-item-product">
																		<p>
																			Irish
																			Lotto
																		</p>
																	</div>
																	<div className="acc-item-type">
																		<p>
																			Single
																		</p>
																	</div>
																	<div className="acc-item-subscription">
																		<p>
																			No
																		</p>
																	</div>
																	<div className="acc-item-promo-code">
																		<p>
																			SR-009
																		</p>
																	</div>
																	<div className="acc-item-lines">
																		<p>1</p>
																	</div>
																	<div className="acc-item-drows">
																		<p>2</p>
																	</div>
																	<div className="acc-item-price">
																		<p>
																			5.00
																		</p>
																	</div>
																	<div className="acc-item-priceSum">
																		<p>
																			10.00
																		</p>
																	</div>
																	<div className="acc-item-promo-amt">
																		<p>
																			-25%
																		</p>
																	</div>
																	<div className="acc-item-promo-bet">
																		<p>
																			7.50
																		</p>
																	</div>
																	<div className="acc-item-billing">
																		<p>
																			Once
																		</p>
																	</div>
																	<div className="acc-item-source">
																		<p>
																			<b>
																				Wallet
																			</b>
																		</p>
																	</div>
																	<div className="acc-item-status">
																		<p>
																			<b>
																				Paid
																			</b>
																		</p>
																	</div>
																	<div className="acc-item-fulfilment">
																		<p>
																			2019
																			Jul
																			20
																		</p>
																	</div>
																	<div className="acc-item-total-winning">
																		<p>
																			EUR
																			128.00
																		</p>
																	</div>
																	<div className="acc-item-total-winning">
																		<p>
																			GBP
																			150.00
																		</p>
																	</div>
																</div>
																<div className="acc-item-slide-drow-date">
																	<div className="acc-item-slide-drow-col">
																		<div className="acc-item">
																			<p>
																				<b>
																					Drow
																					Date
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-product">
																			<p>
																				<b>
																					Settled
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-type">
																			<p>
																				<b>
																					Board
																					Numbers
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-subscription">
																			<p>
																				<b>
																					Matching{' '}
																					<br />
																					Numbers
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-promo-code">
																			<p>
																				<b>
																					Acualt
																					Winning
																					Numbers
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-lines">
																			<p>
																				<b>
																					Win
																					Ammont{' '}
																					<span className="acc-exlamation">
																						!
																					</span>
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-drows">
																			<p>
																				<b>
																					Customers
																					Shares
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-price">
																			<p>
																				<b>
																					Syndicate
																					Fill
																					Status{' '}
																					<span className="acc-exlamation">
																						!
																					</span>
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-priceSum">
																			<p>
																				<b>
																					Syndicate
																					Number
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-promo-amt">
																			<p>
																				<b>
																					Ticket
																					Serial
																					Number
																				</b>
																			</p>
																		</div>
																	</div>
																	<div className="acc-item-slide-drow-col">
																		<div className="acc-item">
																			<p>
																				2019
																				Aug
																				03
																			</p>
																		</div>
																		<div className="acc-item-product">
																			<p>
																				Yes
																			</p>
																		</div>
																		<div className="acc-item-type">
																			<p>
																				1,2,3,4,5,6,7
																			</p>
																		</div>
																		<div className="acc-item-subscription">
																			<p>
																				3,5
																			</p>
																		</div>
																		<div className="acc-item-promo-code">
																			<p>
																				3,5,19,22,26,
																				<b>
																					26
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-lines">
																			<p>
																				EUR
																				8.00(4.00)
																			</p>
																		</div>
																		<div className="acc-item-drows">
																			<p>
																				5/50
																			</p>
																		</div>
																		<div className="acc-item-price">
																			<p></p>
																		</div>
																		<div className="acc-item-priceSum">
																			<p>
																				IRCT1234
																			</p>
																		</div>
																		<div className="acc-item-promo-amt">
																			<p>
																				11678-2051..
																			</p>
																		</div>
																	</div>
																	<div className="acc-item-slide-drow-col">
																		<div className="acc-item">
																			<p>
																				2019
																				Aug
																				03
																			</p>
																		</div>
																		<div className="acc-item-product">
																			<p>
																				Yes
																			</p>
																		</div>
																		<div className="acc-item-type">
																			<p>
																				1,2,3,4,5,6,
																				<b>
																					7
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-subscription">
																			<p>
																				3,5
																			</p>
																		</div>
																		<div className="acc-item-promo-code">
																			<p>
																				3,5,19,22,26,
																				<b>
																					26
																				</b>
																			</p>
																		</div>
																		<div className="acc-item-lines">
																			<p>
																				EUR
																				57200(11.44)
																			</p>
																		</div>
																		<div className="acc-item-drows">
																			<p>
																				5/50
																			</p>
																		</div>
																		<div className="acc-item-price">
																			<p className="green-color">
																				50/50
																			</p>
																		</div>
																		<div className="acc-item-priceSum">
																			<p>
																				IRCT1234
																			</p>
																		</div>
																		<div className="acc-item-promo-amt">
																			<p>
																				11678-2051..
																			</p>
																		</div>
																	</div>
																	<div className="acc-item-slide-drow-col">
																		<div className="acc-item">
																			<p>
																				Pending
																			</p>
																		</div>
																		<div className="acc-item-product">
																			<p>
																				Yes
																			</p>
																		</div>
																		<div className="acc-item-type">
																			<p>
																				1,2,3,4,5,6,7
																			</p>
																		</div>
																		<div className="acc-item-subscription">
																			<p></p>
																		</div>
																		<div className="acc-item-promo-code">
																			<p></p>
																		</div>
																		<div className="acc-item-lines">
																			<p></p>
																		</div>
																		<div className="acc-item-drows">
																			<p>
																				5/50
																			</p>
																		</div>
																		<div className="acc-item-price">
																			<p></p>
																		</div>
																		<div className="acc-item-priceSum">
																			<p>
																				IRCT9999
																			</p>
																		</div>
																		<div className="acc-item-promo-amt">
																			<p></p>
																		</div>
																	</div>
																	<div className="tab-load-all">
																		<a href="">
																			Load
																			More
																		</a>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="set">
									<a href="#">
										Limits
										<i className="down-carret"></i>
									</a>
									<div className="content">
										<div className="acc-data-tab">
											<div className="acc-limit-tab">
												<form>
													<div className="limit-form-col-49">
														<div className="form-field">
															<label>
																Play Limit:
															</label>
															<input
																type="text"
																name=""
																placeholder="1000.00"
															/>
														</div>
														<div className="form-field">
															<label>Per</label>
															<select>
																<option>
																	1 Day
																</option>
															</select>
														</div>
														<div className="form-field">
															<div className="limit-field-info">
																<b>
																	Remaining:
																</b>{' '}
																<span>
																	550.25
																</span>
															</div>
															<div className="limit-field-info">
																<b>Until:</b>{' '}
																<span>
																	2019 Oct 31,
																	05:02:55 PM
																</span>
															</div>
															<div className="limit-field-info">
																<b>
																	Pending
																	Change::
																</b>{' '}
																<span>
																	$100 per
																	Week starts
																	on 2020 Jan
																	31, 00:00PST
																	.
																</span>
															</div>
														</div>

														<div className="form-field">
															<button className="cancel-pending">
																Cancel Pending
																Change
															</button>
														</div>
													</div>
													<div className="limit-form-col-49">
														<div className="form-field">
															<label>
																Deposit Limit:
															</label>
															<input
																type="text"
																name=""
															/>
														</div>
														<div className="form-field">
															<label>Per</label>
															<select>
																<option>
																	Select
																	Period
																</option>
															</select>
														</div>
													</div>
													<div className="limit-form-col-49">
														<div className="loss-limit">
															<p>
																Your potential
																Loss Limit:
																$50.00 over 1
																Day.
															</p>
														</div>
													</div>
												</form>
												<div className="please-note">
													<p>
														<span>!</span>Please
														note: decreasing a limit
														will take effect
														immediately. Increasing
														a limit will take effect
														24 hours after
														confirmation.
													</p>
												</div>
												<div className="reset-search">
													<button className="reset-search-text">
														Cancel
													</button>
													<button className="reset-search-btn orange-btn">
														Confirm Limits
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>*/}
			</section>
		</Layout>
	)
}
