import { Bars3Icon } from '@heroicons/react/24/solid'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import IconWallet from './Icons/IconWallet'
import Logo from './Logo'
import Nav from './Nav'
import UserInfo from './Header/UserInfo'

export default () => {
	const TopToolbar = () => (
		<div className="flex items-center justify-end space-x-5">
			<div className="flex flex-col text-right text-xs">
				<span>Current Time: 4:25 PM</span>
				<span>Current Session: 00:14:55</span>
			</div>
			<button
				type="button"
				className="hidden items-center gap-x-2 rounded-lg bg-gradient-to-r from-green-600 to-lime-500 px-6 py-2 text-sm text-white hover:from-lime-500 hover:to-lime-500 md:flex">
				<ArrowDownTrayIcon className="w-4 text-white" />
				Add Funds
			</button>
			<a
				href="#"
				className="hidden items-center text-sm text-gray-700 md:flex">
				<IconWallet className={'mr-2 w-4 fill-current text-gray-500'} />
				Balance: <strong>$45</strong>
			</a>
			<UserInfo />
		</div>
	)

	return (
		<header className="border-b border-b-gray-200 px-1 py-2 md:py-3 md:px-6">
			<div className="container mx-auto flex items-center justify-center md:max-w-6xl md:space-x-20">
				{/*<div className="container mx-auto flex max-w-6xl">*/}
				{/*<Navigation />*/}
				<div className="md:hidden">
					<div className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
						<span className="sr-only">Open menu</span>
						<Bars3Icon className="h-6 w-6" aria-hidden="true" />
					</div>
				</div>

				<Link href="/" className="w-32 flex-shrink-0">
					<Logo className="ml-4 w-[100px] md:m-0 md:max-w-xs" />
				</Link>

				<div className="flex-1">
					<TopToolbar />
					<Nav />
				</div>
			</div>
		</header>
	)
}
