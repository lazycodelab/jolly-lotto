import { useEffect, useState } from 'react'
import cl from 'classnames'
import { useAuth } from 'hooks/auth'
import FormInput from '@/FormInput'
import FormSelect from '@/FormSelect'

export default ({ user }) => {
	const [errors, setErrors] = useState(null)
	const { updateProfile } = useAuth()
	const [loading, setLoading] = useState(false)
	const [success, setSuccess] = useState(false)
	const profileData = user.profile

	useEffect(() => {
		if (errors || success) {
			setLoading(false)
			window.scrollTo({
				top: 0,
				behavior: 'smooth',
			})
		}
	}, [errors, success])

	const handleSome = e => {
		e.preventDefault()
		setLoading(true)

		const userData = {
			id: profileData.id,
			country: e.target.country.value,
			prefix: e.target.title.value,
			firstName: e.target.first_name.value,
			lastName: e.target.last_name.value,
			birthDate: e.target.birth_date.value,
			billingAddress: {
				street: e.target.address.value,
				city: e.target.city.value,
				postalCode: e.target.post_code.value,
				state: e.target.state.value,
			},
			email: e.target.email.value,
			phone: e.target.phone.value,
		}

		updateProfile({ setErrors, setSuccess, userData })
		//setLoading(false)
	}

	return (
		<div>
			{errors && (
				<div className="mt-3 border-2 border-red-300 bg-red-300/60 px-3 py-2 text-sm text-slate-900">
					<ul>
						{Object.keys(errors).map(key => (
							<li key={key}>{errors[key][0]}</li>
						))}
					</ul>
				</div>
			)}
			{success && (
				<div className="mt-3 border-2 border-green-300 bg-green-300/60 px-3 py-2 text-sm text-slate-900">
					<ul>
						<li>Success!</li>
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
						value={profileData.email}
						label="Email"
						placeholder="Email"
						disabled
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
							value={profileData.firstName}
						/>
					</div>
					<FormInput
						label="Last Name"
						placeholder="Last Name"
						value={profileData.lastName}
					/>
					<div className="flex items-end gap-x-3">
						<FormInput
							name="birth_date"
							label="Date of birth"
							value={profileData.birthDate}
						/>
						<FormInput label="Phone" value={profileData.phone} />
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
					<FormInput label="Post Code" isReq={true} />

					<div className="flex justify-end">
						<button
							type="submit"
							{...(loading && {
								disabled: 'disabled',
							})}
							className={cl(
								'rounded-md px-8 py-2 text-base font-semibold text-white shadow-md ',
								{
									'cursor-not-allowed bg-slate-300':
										loading === true,
									'bg-gradient-to-r from-orange-400 to-orange-500 shadow-orange-700 hover:from-orange-500 hover:to-orange-400':
										loading !== true,
								},
							)}>
							Update
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
