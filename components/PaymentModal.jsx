import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from 'hooks/auth'
import AddFunds from '@/AddFunds/AddFunds'
import cl from 'classnames'
import { XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'lib/axios'

export default ({ paymentAmount , lotteryDetails, drawDays, selectedDrawDays , lotteryCard}) => {
	const { user } = useAuth()
	const router = useRouter()
	let [isOpen, setIsOpen] = useState(false)
	const [errors, setErrors] = useState(null)
	const [success, setSuccess] = useState(null)
	const [loading, setLoading] = useState(false)
	const { buyLottery } = useAuth()

	const [isFeteched, setIsFeteched] = useState(false);
	const [methods, setMethods] = useState([])
	const [selected, setSelected] = useState();
	const fetchPaymentMethods = () => {
		setIsFeteched(false)
		axios.get('/payment/gateways').then(({ data }) => {
			setMethods(data);
			setSelected(data[0]?.cardHolder);
			setIsFeteched(true)
		})
	}

	useEffect(() => {
		if (user !== '') {		
			fetchPaymentMethods()
		}
	}, [])

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
								<Dialog.Panel className="w-full max-w-[60rem] transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all relative">
									<div className='absolute right-0 top-0 p-3 cursor-pointer' onClick={() => closeModal()}>
										<XMarkIcon className='w-8 text-gray-500'/>
									</div>
									<div className="pt-2 px-6 md:px-0">
										<h4 className="text-xl font-semibold text-cyan-500 text-center my-3">Please Top Up Your Wallet to Complete Purchase</h4>
										<p className="text-md text-center mb-5">The total value of items in your cart exceeds the amount of funds available in your wallet.</p>
										<div className='flex justify-center'>
											<div className='min-w-[18rem] text-center'>
												<p>Available Funds : 0.00</p>
												<p>Balance Owing : 0.00</p>
												<hr className='my-1 border-[0.5px] border-gray-300'/>
												<p className='text-cyan-500 font-bold'>Funds Required: £{paymentAmount}</p>
											</div>
										</div>
									</div>
									<span className="mt-5 block h-[2px] w-full bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400"></span>
									<div className='p-6 md:px-8'>
										<AddFunds 
											methods={methods} 
											selected={selected} 
											setSelected={setSelected} 
											isFeteched={isFeteched}
											fetchPaymentMethods={fetchPaymentMethods}
										/>
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
