import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from 'hooks/auth'
import cl from 'classnames'

export default ({ paymentAmount , lotteryDetails, drawDays, selectedDrawDays , lotteryCard}) => {
	const { user } = useAuth()
	const router = useRouter()
	let [isOpen, setIsOpen] = useState(false)
	const [errors, setErrors] = useState(null)
	const [success, setSuccess] = useState(null)
	const [loading, setLoading] = useState(false)
	const { buyLottery } = useAuth()

	function closeModal() {
		setIsOpen(false)
	}

	const handlePlayNowBtn = () => {
		if (user && user.statusCode === 200) {
			if (user.wallet.available < paymentAmount) {
				setIsOpen(true)
			} else {
				if (lotteryCard.filter(card => !card.completed).length > 0) {
					setErrors({lotteryCard: ['Please complete all the cards']})
					return
				} else {
					setErrors(null)
				}
				setLoading(true);
				const lotteryData = {
					contactID: user.contactId,
					productID: lotteryDetails.productId,
					productCode: lotteryDetails.name,
					itemName: lotteryDetails.description,
					unitPrice : lotteryDetails.price,
					lotteryID: lotteryDetails.lotteryId,
					drawDays : drawDays.filter(day => day.selected).map(day => day.day),
					weekNumber: selectedDrawDays,
					tickets : lotteryCard.filter(card => card.completed).map(card => ({ numbers: card.selectedBalls,bonusNumbers: card.selectedBonusBalls })),
				}
				buyLottery({setErrors, setSuccess, lotteryData})
			}
		} else {
			router.push('/login')
		}
	}

	useEffect(() => {
		if (errors || success) {
			setLoading(false)
		}
	}, [errors,success])

	return (
		<>
			<button
				type="button"
				onClick={handlePlayNowBtn}
				className={cl(
					'mt-5 w-full rounded-[13px] px-14 py-3 text-lg font-semibold text-white relative',
					{
						'cursor-not-allowed bg-[#C2D4D5] shadow-[0px_2px_0px_#A2A2A2]':
							loading === true,
						'bg-gradient-to-r from-orange-400 to-orange-500 hover:from-[#FFB027] hover:to-[#FFB027] active:from-[#24484B] active:to-[#24484B] shadow-[0px_2px_0px_#D27421] active:shadow-[0px_2px_0px_#000000]':
							loading !== true,
					},
				)}
				{...(loading && { disabled: 'disabled' })}>
				<div className={`${!loading && 'hidden'}`}>
					<div className='absolute left-6 top-[0.9rem]'>
						<svg 
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#FFFFFF"
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className='animate-spin h-6 w-6'>
							<path d="M21 12a9 9 0 11-6.219-8.56" />
						</svg>
					</div>
				</div>
				Play Now
			</button>

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
						{Object.keys(success).map(key => (
							<li key={key}>{success[key][0]}</li>
						))}
					</ul>
				</div>
			)}

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					static
					className="relative z-10"
					onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900">
										Insufficient Funds
									</Dialog.Title>

									<div className="mt-2">
										<p className="text-sm text-gray-500">
											It looks like you do not have
											sufficient funds in your Wallet.
											Please add some funds to your wallet
											to make the purchase.
										</p>
									</div>

									<div className="mt-4">
										<Link
											href="/user/add-funds"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}>
											Add Funds
										</Link>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	)
}
