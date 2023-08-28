import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import cl from 'classnames'
import moment from 'moment'
import FormInput from '@/FormInput'
import FormSelect from '@/FormSelect'
import { useAuth } from 'hooks/auth'
import Logo from '@/Logo'
import { getDays, getMonths, getYears } from '@/Helpers'

export default () => {
	const { register } = useAuth({ middleware: 'guest' })
	const [errors, setErrors] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleSome = e => {
		e.preventDefault()
		setLoading(true)

		const data = e.target
		const birthDate =
			data.year.value + '-' + data.month.value + '-' + data.day.value
		const age = moment().diff(birthDate, 'years')

		const userData = {
			password: data.password.value,
			password_confirmation: data.password_confirmation.value,
			minimumLegalAge: age,
			prefix: data.title.value,
			firstName: data.first_name.value,
			lastName: data.last_name.value,
			birthDate: birthDate,
			billingAddress: {
				street: data.address.value,
				city: data.city.value,
				postalCode: data.post_code.value,
				state: data.state.value,
				country: 'FR',
			},
			email: data.email.value,
			phone: data.phone.value,
			currencyCode: data.currency.value,
			notification: {
				isAllowEmail: true,
				isAllowMarketingEmail: data.marketing.value ?? false,
				isAllowSms: true,
				isAllowMarketingSms: false,
				isAllowPhoneCall: false,
			},
		}

		register({ setErrors, userData })
	}

	useEffect(() => {
		if (errors) {
			setLoading(false)
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}
	}, [errors])

	return (
		<div className="container mx-auto my-10 items-center bg-white shadow-lg md:max-w-2xl">
			<div className="py-2">
				<Logo className="mx-auto w-20" />
				<span className="mt-2 block h-[2px] w-full bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400"></span>
			</div>

			<div
				className={cl('relative p-8', {
					'cursor-wait after:absolute after:inset-0 after:z-30 after:h-full after:w-full after:animate-pulse after:bg-black/70':
						loading,
				})}>
				<Link href="/login" className="text-sm text-cyan-500 underline">
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
					className="mt-8 grid grid-cols-1 gap-x-10 md:grid-cols-2">
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
								isReq={true}
								name="month"
								defaultValue="Month"
								options={getMonths()}
								noMarker
							/>
							<FormSelect
								label=""
								isReq={true}
								name="year"
								defaultValue="Year"
								options={getYears()}
								noMarker
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
							options={{
								UK: 'United Kingdom',
								US: 'United States',
								CA: 'Canada',
								NZ: 'New Zealand',
								JP: 'Japan',
								AU: 'Australia',
								ZR: 'Zimbabwe',
							}}
							isReq={true}
						/>
						<FormInput label="Address" isReq={true} />
						<FormInput
							label="Apartment, suite, etc. (optional)"
							name="address2"
						/>
						<div className="flex gap-x-3">
							<FormInput label="City" isReq={true} />
							<FormInput label="State" isReq={true} />
							<FormInput label="Post Code" isReq={true} />
						</div>

						<FormSelect
							label="Currency"
							isReq={true}
							options={[
								'USD',
								'EUR',
								'GBP',
								'NZD',
								'AUD',
								'JPY',
								'CAD',
								'ZAR',
							]}
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
								<input
									id="term-3"
									type="checkbox"
									name="marketing"
									className="chk"
								/>
								<label
									htmlFor="term-3"
									className="cursor-pointer text-xs text-gray-500">
									YES, I wish to receive offers and updates
									from JollyLotto. I understand that I can
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
								className={cl(
									'mt-5 w-full rounded-md px-14 py-3 text-lg font-semibold text-white shadow-md',
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
								href="/login"
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
