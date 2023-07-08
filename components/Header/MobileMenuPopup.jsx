import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
	Bars3Icon,
	BellIcon,
	PowerIcon,
	QueueListIcon,
	UserIcon,
	WalletIcon,
} from '@heroicons/react/24/solid'
import { useAuth } from '../../hooks/auth'
import Link from 'next/link'

export default () => {
	const { user, logout } = useAuth()

	return (
		<Menu as="div" className="">
			<Menu.Button className="flex items-center text-sm text-gray-700">
				<Bars3Icon className="h-6 w-6" aria-hidden="true" />
			</Menu.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100 z-50"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="absolute left-0 mt-2 w-full max-w-[200px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-2xl focus:outline-none">
					{user && user.statusCode === 200 ? (
						<>
							<div className="px-1 py-1 ">
								<Menu.Item>
									{({ active }) => (
										<Link
											href="/user/dashboard"
											className={`${
												active && 'bg-slate-100'
											} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
											<UserIcon className="mr-2 w-4 text-gray-500" />
											Account
										</Link>
									)}
								</Menu.Item>
							</div>
							<div className="px-1 py-1 ">
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active && 'bg-slate-100'
											} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
											<WalletIcon className="mr-2 w-4 text-gray-500" />
											Add Funds
										</button>
									)}
								</Menu.Item>
							</div>
							<div className="px-1 py-1">
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active && 'bg-slate-100'
											} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
											<QueueListIcon className="mr-2 w-4 text-gray-500" />
											Orders
										</button>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<button
											className={`${
												active && 'bg-slate-100'
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
											className={`${
												active && 'bg-slate-100'
											} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
											<PowerIcon className="mr-2 w-4 text-gray-500" />
											Logout
										</button>
									)}
								</Menu.Item>
							</div>
						</>
					) : (
						<div className="px-1 py-1 ">
							<Menu.Item>
								{({ active }) => (
									<Link
										href="/register"
										className={`${
											active && 'bg-slate-100'
										} group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-500`}>
										<UserIcon className="mr-2 w-4 text-gray-500" />
										Sign up
									</Link>
								)}
							</Menu.Item>
						</div>
					)}
				</Menu.Items>
			</Transition>
		</Menu>
	)
}
