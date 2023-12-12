'use client'

import FormInput from '@/FormInput'
import FormTextarea from '@/FormTextarea'
import cl from 'classnames'
import { useState } from 'react'

export const ContactForm = () => {
	const [loading, setLoading] = useState(false)

	const handleContactForm = e => {
		e.preventDefault()
		setLoading(true)
	}

	return (
		<form
			noValidate="novalidate"
			method="POST"
			onSubmit={handleContactForm}
			className="mt-8 grid grid-cols-1 gap-y-5">
			<FormInput
				label="First Name"
				placeholder="First Name"
				isReq={true}
			/>
			<FormInput label="Last Name" placeholder="Last Name" isReq={true} />
			<FormInput
				type="email"
				label="Email"
				placeholder="Email"
				isReq={true}
			/>
			<FormInput type="text" label="Phone" placeholder="Phone" />
			<FormTextarea label="Message" placeholder="Message" isReq={true} />

			<div className="flex flex-col gap-y-5">
				<button
					type="submit"
					{...(loading && { disabled: 'disabled' })}
					className={cl(
						'mt-5 w-full rounded-[13px] px-14 py-3 text-lg font-semibold text-white relative',
						{
							'cursor-not-allowed bg-[#C2D4D5] shadow-[0px_2px_0px_#A2A2A2]':
								loading === true,
							'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-[#FFB027] hover:to-[#FFB027] active:from-[#24484B] active:to-[#24484B] shadow-[0px_2px_0px_#D27421] active:shadow-[0px_2px_0px_#000000]':
								loading !== true,
						},
					)}>
					<div className={`${!loading && 'hidden'}`}>
						<div className="absolute left-6 top-[0.9rem]">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="#FFFFFF"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="animate-spin h-6 w-6">
								<path d="M21 12a9 9 0 11-6.219-8.56" />
							</svg>
						</div>
					</div>
					Submit
				</button>
			</div>
		</form>
	)
}
