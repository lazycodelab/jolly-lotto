import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import cl from 'classnames'
import Logo from '@/Logo'
import FormInput from '@/FormInput'
import { useAuth } from 'hooks/auth'

export default () => {
	const { login } = useAuth({ middleware: 'guest' })
	const [errors, setErrors] = useState(null)
	const [loading, setLoading] = useState(false)

	const handleSome = e => {
		e.preventDefault()
		setLoading(true)

		const userData = {
			email: e.target.email.value,
			password: e.target.password.value,
		}

		login({ setErrors, userData })
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
		<div className="container mx-auto my-10 max-w-2xl items-center bg-white shadow-lg">
			<div className="pt-2">
				<Logo className="mx-auto w-20" />
				<span className="mt-2 block h-[2px] w-full bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400"></span>
			</div>

			<div
				className={cl('relative p-8', {
					'cursor-wait after:absolute after:inset-0 after:z-30 after:h-full after:w-full after:animate-pulse after:bg-black/70':
						loading,
				})}>
				<Link
					href="/register"
					className="text-sm text-cyan-500 underline">
					&larr; Register Here
				</Link>
				<h2 className="mt-4 text-center text-xl font-semibold text-teal-700">
					Login to Your Account
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
					className="mt-8 md:flex flex-wrap items-start justify-between gap-x-10 md:flex-nowrap">
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
