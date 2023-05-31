import Layout from '@/components/Layout'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import FormInput from '@/components/FormInput'
import FormSelect from '@/components/FormSelect'
import { useState } from 'react'
import PaymentMethods from '@/components/PaymentMethods'
import { getMonths, getYears } from '@/components/Helpers'
import cx from 'classnames'

export default () => {
	const { user, addFunds, addMethod } = useAuth()
	const router = useRouter()
	const [showBillingForm, setShowBillingForm] = useState(false)
	const [errors, setErrors] = useState(false)
	const [success, setSuccess] = useState(false)
	const [showCardForm, setShowCardForm] = useState(false)

	if (!router.isFallback && !user) {
		return <ErrorPage title="Unauthorized" statusCode={401} />
	}

	const handleAddPayment = () => {
		const fund = {
			id: user.profile.id,
			mode: 'card',
			amount: 20,
		}
		addFunds({ setErrors, setSuccess, fund })
	}

	const handleAddNewMethod = e => {
		e.preventDefault()

		const form = e.target
		const method = {}

		for (let field of form.elements) {
			if (field.name) {
				method[field.name] = field.value
			}
		}

		console.log('xxxx', method)

		addMethod({ setErrors, setSuccess, method })
	}

	return (
		<Layout>
			<Head>
				<title>Add Funds</title>
			</Head>

			<section className="mx-auto max-w-5xl py-5">
				<h2 className="text-center text-2xl font-bold">
					Add Funds to your Wallet
				</h2>
				<p className="text-center text-base">
					Funds added to your wallet will be available for placing
					orders.
				</p>

				{errors && (
					<div className="mt-3 border-2 border-red-300 bg-red-300/60 px-3 py-2 text-sm text-slate-900">
						<ul>
							{Object.keys(errors).map(key => (
								<li key={key}>{errors[key][0]}</li>
							))}
						</ul>
					</div>
				)}

				<div className="mx-auto mt-10 grid w-full grid-cols-2 gap-x-5 rounded border p-5">
					<div>
						<p className="font-medium">
							Select amount to add to wallet.
						</p>
						<ul className="mt-2 flex gap-x-1">
							<li className="cursor-pointer rounded bg-cyan-500 px-3 py-2 text-center font-bold text-white hover:bg-cyan-600">
								40
							</li>
							<li className="cursor-pointer rounded bg-cyan-500 px-3 py-2 text-center font-bold text-white hover:bg-cyan-600">
								50
							</li>
							<li className="cursor-pointer rounded bg-cyan-500 px-3 py-2 text-center font-bold text-white hover:bg-cyan-600">
								75
							</li>
							<li className="cursor-pointer rounded bg-cyan-500 px-3 py-2 text-center font-bold text-white hover:bg-cyan-600">
								100
							</li>
							<li className="cursor-pointer rounded bg-cyan-500 px-3 py-2 text-center font-bold text-white hover:bg-cyan-600">
								200
							</li>
							<li className="cursor-pointer rounded bg-cyan-500 px-3 py-2 text-center font-bold text-white hover:bg-cyan-600">
								500
							</li>
						</ul>

						<p className="mt-3 font-medium">
							or Enter Custom Amount* (min € 5.00)
						</p>
						<input
							type="text"
							placeholder="$5.00"
							className="w-full ring ring-cyan-500"
						/>
					</div>

					<div>
						<p className="font-medium">
							Select a New Payment Method
						</p>
						<PaymentMethods setShowCardForm={setShowCardForm} />

						<form
							className={cx('mt-3', {
								block: showCardForm,
								hidden: !showCardForm,
							})}
							onSubmit={handleAddNewMethod}>
							<FormInput name="cardNumber" label="Card Number" />
							<div className="mt-2 flex gap-x-3">
								<FormInput
									name="cardHolder"
									label="Name on Card"
								/>
								<FormInput name="cvv" label="CVV Number" />
							</div>
							<div className="mt-2 flex gap-x-3">
								<FormSelect
									name="month"
									label="Expiry Month"
									options={getMonths()}
								/>
								<FormSelect
									name="year"
									label="Expiry Year"
									options={getYears()}
								/>
							</div>
							<div className="mt-2 flex items-center gap-x-2">
								<input
									id="term-2"
									type="checkbox"
									name=""
									checked={!showBillingForm}
									onChange={() =>
										setShowBillingForm(!showBillingForm)
									}
								/>
								<label
									htmlFor="term-2"
									className="cursor-pointer text-xs text-gray-500">
									Use my stored address as billing address.
								</label>
							</div>
							<button
								type="submit"
								className="mt-5 rounded-md bg-gradient-to-r from-orange-400 to-orange-500 py-1.5 px-7 text-base text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400">
								Add Card
							</button>
						</form>
					</div>
				</div>

				{/* Billing Address */}
				{showBillingForm && (
					<div className="mt-5">
						<h3 className="text-xl font-medium">Billing Address</h3>

						<FormSelect
							label="Country"
							options={[
								'United States',
								'Canada',
								'United Kingdom',
							]}
						/>

						<div className="mt-2 flex gap-x-3">
							<FormInput label="Address" />
							<FormInput label="Pin Code" />
						</div>
						<div className="mt-2 flex gap-x-3">
							<FormInput label="City" />
							<FormInput label="Province" />
						</div>
					</div>
				)}

				<hr className="mt-5" />
				<button
					onClick={handleAddPayment}
					type="button"
					className="mt-5 w-full rounded-md bg-gradient-to-r from-orange-400 to-orange-500 py-3 px-14 text-lg text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400">
					Add Funds
				</button>
			</section>
		</Layout>
	)
}
