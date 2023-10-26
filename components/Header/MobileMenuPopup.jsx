import { Menu, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { useGlobalContext } from '@/../context/appProvider'
import {
	Bars3Icon,
	BellIcon,
	PowerIcon,
	QueueListIcon,
	UserIcon,
	WalletIcon,
	XMarkIcon,
	EnvelopeIcon,
	HomeIcon,
	CreditCardIcon
} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useAuth } from 'hooks/auth'

export default () => {
	const { user, logout } = useAuth()
	const { lotteryProducts } = useGlobalContext()
	const [isLottoOpen, setIsLottoOpen] = useState(false);
	const pathname = usePathname()
	return (
		<Menu as="div">
			{({ open }) => (
				<>
					<Menu.Button className="flex items-center text-sm text-white rounded p-1 bg-[#99e5eb]">
						{ open ? <XMarkIcon className="h-6 w-6" aria-hidden="true" />  : <Bars3Icon className="h-6 w-6" aria-hidden="true" /> }
					</Menu.Button>
					<div className={`absolute bg-[#F3FDFEF2] left-0 bottom-0 w-screen h-[calc(100%-4rem)] z-50 ${!open && 'hidden'}`}>
						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100 z-50"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							<Menu.Items className="absolute left-0 w-full max-w-[250px] rounded-ee-lg origin-top-right divide-y divide-gray-100 bg-white shadow-2xl focus:outline-none">
								{user && user.statusCode === 200 ? (
									<>
										<div className="px-1 py-1 ">
											<Menu.Item>
												{({ active }) => (
													<Link
														href="/user/dashboard"
														className={`${active && 'bg-slate-100'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
														<UserIcon className="mr-2 w-4 text-gray-500" />
														Account
													</Link>
												)}
											</Menu.Item>
										</div>
										<div className="px-1 py-1">
											<Menu.Item>
												{({ active }) => (
													<Link
													href="/user/add-funds"
														className={`${active && 'bg-slate-100'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
														<WalletIcon className="mr-2 w-4 text-gray-500" />
														Add Funds
													</Link>
												)}
											</Menu.Item>
										</div>
										<div className="px-1 py-1">
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${active && 'bg-slate-100'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
														<QueueListIcon className="mr-2 w-4 text-gray-500" />
														Orders
													</button>
												)}
											</Menu.Item>
											<Menu.Item>
												{({ active }) => (
													<button
														className={`${active && 'bg-slate-100'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
														<BellIcon className="mr-2 w-4 text-gray-500" />
														Notification
													</button>
												)}
											</Menu.Item>
										</div>
										<div className="px-1 py-1">
											<Menu.Item>
												{({ active }) => (
													<button
														onClick={() => logout()}
														className={`${active && 'bg-slate-100'
															} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
														<PowerIcon className="mr-2 w-4 text-gray-500" />
														Logout
													</button>
												)}
											</Menu.Item>
										</div>
									</>
								) : (
									<>
										<Menu.Item>
											{({ active }) => (
												<Link
													href="/"
													className={`${active && 'bg-[#24484B]'
														} group flex w-full items-center px-2 py-3 ps-6 text-sm ${pathname == '/' ? 'text-[#00AEB9]' : 'text-gray-500'}`} onClick={() => setIsLottoOpen(false)}>
													<HomeIcon className={`mr-3 w-5 ${pathname == '/' ? 'text-[#00AEB9]' : 'text-gray-500'}`} />
													Home
												</Link>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<Link
													href="/register"
													className={`${active && 'bg-[#24484B]'
														} group flex w-full items-center px-2 py-3 ps-6 border-none text-sm ${pathname == '/register' ? 'text-[#00AEB9]' : 'text-gray-500'}`} onClick={() => setIsLottoOpen(false)}>
													<UserIcon className={`mr-3 w-5 ${pathname == '/register' ? 'text-[#00AEB9]' : 'text-gray-500'}`} />
													Sign up
												</Link>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active,close }) => (
												<>
													<div className={`${active && 'bg-[#24484B]'} group flex w-full items-center px-2 py-3 ps-6 border-none text-sm ${isLottoOpen ? 'text-[#00AEB9] bg-[#FAFAFA]' : 'text-gray-500'}`} onClick={() => setIsLottoOpen(!isLottoOpen)}>
														<CreditCardIcon className={`mr-3 w-5 ${isLottoOpen ? 'text-[#00AEB9]' : 'text-gray-500'}`} />
														Lotteries
													</div>
													{isLottoOpen &&
														<div className="bg-[#FAFAFA] border-none">
															{
																lotteryProducts.map((product,index) => (
																	<div className='ms-3 border-none' onClick={close}>
																		<Link href={`/lotteries/${product.id}`}>
																			<div className={`group flex w-full items-center px-2 py-3 ps-6 text-sm ${pathname == `/lotteries/${product.id}` ? 'text-[#00AEB9]' : 'text-gray-500'}`}>
																				<Image
																					src={`/images/lotteries/${product.lottery.country_code}_S.png`}
																					width={30}
																					height={30}
																					alt="icon"
																					className='mr-2'
																				/>
																				{product.lotteryName}
																			</div>
																		</Link>
																	</div>
																))
															}
														</div>
													}
												</>
											)}
										</Menu.Item>
										<Menu.Item>
											{({ active }) => (
												<Link
													href="/contact-us"
													className={`${active && 'bg-[#24484B]'
														} group flex w-full items-center px-2 py-3 ps-6 border-none text-sm rounded-ee-lg ${pathname == '/contact-us' ? 'text-[#00AEB9]' : 'text-gray-500'}`} onClick={() => setIsLottoOpen(false)}>
													<EnvelopeIcon className={`mr-3 w-5 ${pathname == '/contact-us' ? 'text-[#00AEB9]' : 'text-gray-500'}`} />
													Contact Us
												</Link>
											)}
										</Menu.Item>
									</>
								)}
							</Menu.Items>
						</Transition>
					</div>
				</>
			)}
		</Menu>
	)
}
