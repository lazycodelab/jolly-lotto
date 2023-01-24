import React, { useEffect, useState } from 'react'
import FormInput from '../FormInput'
import FormSelect from '../FormSelect'
import Logo from '../Logo'
import { useAuth } from '../../hooks/auth'
import Link from 'next/link'
import classNames from 'classnames'

export default () => {
	const { register } = useAuth({ middleware: 'guest' })
	const [errors, setErrors] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleSome = e => {
		e.preventDefault()
		setLoading(true)

		const birthDate =
			e.target.year.value +
			'-' +
			e.target.month.value +
			'-' +
			e.target.day.value

		const userData = {
			password: e.target.password.value,
			password_confirmation: e.target.password_confirmation.value,
			minimumLegalAge: 18,
			prefix: 'Ms',
			firstName: e.target.first_name.value,
			lastName: e.target.last_name.value,
			birthDate: birthDate,
			billingAddress: {
				street: '101 French Str LOCAL FROM TEST',
				city: '2988507',
				postalCode: '101FR',
				state: '',
				country: 'FR',
			},
			email: e.target.email.value,
			phone: e.target.phone.value,
			sessionId: '',
			ip: '',
			language: '',
			currencyCode: '',
			notification: {
				isAllowEmail: true,
				isAllowMarketingEmail: false,
				isAllowSms: true,
				isAllowMarketingSms: false,
				isAllowPhoneCall: false,
			},
		}

		register({ setErrors, userData })
	}

	const getDays = () => {
		let days = []

		for (let i = 1; i <= 31; i++) {
			days.push(i)
		}

		return days
	}

	const getMonths = () => {
		return [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		]
	}

	const getYears = () => {
		let years = []

		const currentYear = new Date().getFullYear()

		for (let i = 1940; i <= currentYear; i++) {
			years.push(i)
		}

		return years
	}

	useEffect(() => {
		if (errors) {
			setLoading(false)
		}
	}, [errors])

	return (
		<div className="container mx-auto my-10 items-center bg-white shadow-lg md:max-w-2xl">
			<div className="py-2">
				<Logo className="mx-auto w-20" />
				<span className="mt-2 block h-[2px] w-full bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400"></span>
			</div>

			<div className="p-8">
				<Link
					href="/signin"
					className="text-sm text-cyan-500 underline">
					&larr; Sign In Here
				</Link>
				<h2 className="mt-4 text-center text-xl font-semibold text-teal-700">
					Create an Account
				</h2>

				{errors && (
					<div className="mt-3 border-2 border-red-300 bg-red-300/60 px-3 py-2 text-sm text-slate-900">
						<ul>
							{Object.keys(errors).map(key => (
								<li key={key}>{errors[key][0]}</li>
							))}
						</ul>
					</div>
				)}

				<form
					method="POST"
					onSubmit={handleSome}
					className="mt-8 flex flex-wrap items-start justify-between gap-x-10 md:flex-nowrap">
					<div className="flex-1 space-y-5">
						<FormInput
							type="email"
							label="Email"
							placeholder="Email"
							isReq={true}
							infoText="Please, check your spam folder if you don't
							receive a confirmation."
						/>
						<FormInput
							type="password"
							label="Password"
							placeholder="Password"
							isReq={true}
							infoText="Passwords must be at least 6 characters,
							must include at least one digit (0-9),
							one lowercase letter (a-z),
							one uppercase letter (A-Z),
							one special character, i.e. !@#$% etc."
						/>
						<FormInput
							type="password"
							name="password_confirmation"
							label="Confirm Password"
							placeholder="Confirm Password"
							isReq={true}
						/>
						<div className="flex gap-x-3">
							<FormSelect
								label="Title"
								isReq={true}
								options={['Mr.', 'Mrs.']}
							/>
							<FormInput
								label="First Name"
								placeholder="First Name"
								isReq={true}
							/>
						</div>
						<FormInput
							label="Last Name"
							placeholder="Last Name"
							isReq={true}
							infoText="Please, check your spam folder if you don't receive
							a confirmation."
						/>
						<div className="flex items-end gap-x-3">
							<FormSelect
								label="Date of Birth"
								name="day"
								isReq={true}
								defaultValue="Day"
								options={getDays()}
							/>
							<FormSelect
								label=""
								name="month"
								defaultValue="Month"
								options={getMonths()}
							/>
							<FormSelect
								label=""
								name="year"
								defaultValue="Year"
								options={getYears()}
							/>
						</div>
						<div className="flex items-end gap-x-3">
							<FormSelect
								label="Phone"
								options={['UK', 'AUS']}
								isReq={true}
							/>
							<FormInput
								type="tel"
								label=""
								placeholder="Phone Number"
							/>
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
						<div className="flex gap-x-3">
							<FormInput label="Number" />
							<FormInput label="Street" />
						</div>
						<div className="flex gap-x-3">
							<FormInput label="Number" />
							<FormInput label="Street" />
						</div>
						<FormInput label="Flat Number" />
						<div className="flex gap-x-3">
							<FormInput label="Post Code" isReq={true} />
							<FormInput label="City" isReq={true} />
						</div>

						<FormSelect
							label="Currency"
							isReq={true}
							options={['USD', 'EUR', 'GBP']}
						/>

						<div className="space-y-3">
							<h4 className="text-sm font-medium text-gray-800">
								Set Limits <sup className="text-red-500">*</sup>
							</h4>
							<div className="flex items-center gap-x-2">
								<input id="term-1" type="checkbox" name="" />
								<label
									htmlFor="term-1"
									className="cursor-pointer text-xs text-gray-500">
									I accept unlimited bet, deposit and loss
									limits.
								</label>
							</div>
							<div className="flex items-center gap-x-2">
								<input id="term-2" type="checkbox" name="" />
								<label
									htmlFor="term-2"
									className="cursor-pointer text-xs text-gray-500">
									I would like to set the limits.
								</label>
							</div>
						</div>

						<div className="flex items-end gap-x-3">
							<FormInput label="Play Limit (Optional)" />

							<FormSelect
								label={''}
								options={['1 Week', '2 Weeks']}
							/>
						</div>

						<div className="flex items-end gap-x-3">
							<FormInput label="Deposit Limit (Optional)" />

							<FormSelect
								label={''}
								options={['1 Week', '2 Weeks']}
							/>
						</div>

						<div className="space-y-3">
							<p className="text-xs text-gray-500">
								Your potential Loss Limit is $1 000.00 over 1
								Day.
							</p>
							<div className="flex gap-x-3">
								<input id="term-3" type="checkbox" name="" />
								<label
									htmlFor="term-3"
									className="cursor-pointer text-xs text-gray-500">
									YES, I wish to receive offers and updates
									from Lotteries.com. I understand that I can
									unsubscribe at any time, and update my
									contact preferences by logging in to
									&apos;My Account&apos;.
								</label>
							</div>
							<div className="flex gap-x-3">
								<input id="term-4" type="checkbox" name="" />
								<label
									htmlFor="term-4"
									className="cursor-pointer text-xs text-gray-500">
									I confirm that I am over 18 years of age,
									and have read and accepted the T&C & Privacy
									Policy. Please Gamble Responsibly.
								</label>
							</div>
						</div>
						<div className="flex flex-col gap-y-5">
							<button
								type="submit"
								{...(loading && { disabled: 'disabled' })}
								className={classNames(
									'mt-5 w-full rounded-md  py-3 px-14 text-lg font-semibold text-white shadow-md ',
									{
										'cursor-not-allowed bg-slate-300':
											loading === true,
										'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400':
											loading !== true,
									},
								)}>
								Create New Account
							</button>
							<Link
								href="/signin"
								type="button"
								className="w-full rounded-md bg-cyan-400 px-5 py-2.5 text-center text-lg font-medium text-white shadow shadow-cyan-600">
								Sign In Here
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
