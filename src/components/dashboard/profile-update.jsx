import { useState } from 'react'
import FormInput from '../FormInput'
import FormSelect from '../FormSelect'
import cl from 'classnames'
import { useAuth } from '../../hooks/auth'

export default ({ user }) => {
	const userName = user.user.name.split(' ')
	const firstName = userName[0]
	const lastName = userName[1]
	const [errors, setErrors] = useState(null)
	const { updateProfile } = useAuth()
	const [loading, setLoading] = useState(false)

	console.log('ssss', user.user.id)
	const handleSome = e => {
		e.preventDefault()
		setLoading(true)

		console.log('x', errors)
		const userData = {
			id: '45754dd3-fbd9-4cf7-801d-08d9ea77cea1',
			country: e.target.email.value,
			prefix: null,
			firstName: e.target.first_name.value,
			lastName: e.target.first_name.value,
			birthDate: '1982-02-02',
			billingAddress: {
				street: '101 French Street ',
				city: '2988507',
				postalCode: '101FR',
				state: '',
			},
			email: 'angiestagingle101@yopmail.com',
			phone: '6042223223',
		}

		updateProfile({ setErrors, userData })
	}

	return (
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
						options={['Mr.', 'Mrs.']}
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
				<FormInput label="Post Code" isReq={true} />

				<div className="flex justify-end">
					<button
						type="submit"
						{...(loading && {
							disabled: 'disabled',
						})}
						className={cl(
							'rounded-md py-2 px-8 text-base font-semibold text-white shadow-md ',
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
	)
}
