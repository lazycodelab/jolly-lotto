import React, { useState } from 'react'
import FormInput from '../FormInput'
import Logo from '../Logo'
import { useAuth } from '../../hooks/auth'
import Link from 'next/link'

export default () => {
	const { login } = useAuth({ middleware: 'guest' })
	const [errors, setErrors] = useState([])

	const handleSome = e => {
		e.preventDefault()

		const userData = {
			email: e.target.email.value,
			password: e.target.password.value,
		}

		login({ setErrors, userData })
	}

	return (
		<div className="container mx-auto my-10 max-w-2xl items-center bg-white shadow-lg">
			<div className="py-2">
				<Logo className="mx-auto w-20" />
				<span className="mt-2 block h-[2px] w-full bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400"></span>
			</div>

			<div className="p-8">
				<Link
					href="/register"
					className="text-sm text-cyan-500 underline">
					&larr; Register Here
				</Link>
				<h2 className="mt-4 text-center text-xl font-semibold text-teal-700">
					Login to Your Account
				</h2>

				{errors.length > 0 && (
					<div className="mt-3 border-2 border-red-300 bg-red-300/60 px-3 py-2 text-sm text-slate-900">
						{errors.map((msg, key) => (
							<span key={key}>{msg}</span>
						))}
					</div>
				)}
				<form
					method="POST"
					onSubmit={handleSome}
					className="mt-8 flex items-start justify-between gap-x-10">
					<div className="flex-1 space-y-5">
						<FormInput
							type="email"
							label="Email"
							placeholder="Email"
							isReq={true}
						/>
						<FormInput
							type="password"
							label="Password"
							placeholder="Password"
							isReq={true}
						/>
					</div>

					<div className="flex-1 space-y-5">
						<div className="flex flex-col gap-y-5">
							<button
								type="submit"
								className="mt-5 w-full rounded-md bg-gradient-to-r from-orange-400 to-orange-500 py-3 px-14 text-lg font-semibold text-white shadow-md shadow-orange-700 hover:from-orange-500 hover:to-orange-400">
								Sign In
							</button>
							<Link
								href="/register"
								className="w-full rounded-md bg-cyan-400 px-5 py-2.5 text-center text-lg font-medium text-white shadow shadow-cyan-600">
								Create an Account
							</Link>
						</div>
					</div>
				</form>
			</div>
		</div>
	)
}
