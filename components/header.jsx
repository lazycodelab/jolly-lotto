'use client'
import Link from 'next/link'
import Logo from './Logo'
import Nav from './Nav'
import UserInfo from './Header/UserInfo'
import MobileMenuPopup from './Header/MobileMenuPopup'
import UserAccountLink from './Header/UserAccountLink'

export default () => {
	return (
		<header className="border-b border-b-[#C2D4D5] md:border-b-gray-200 px-1 py-2 md:px-6 md:py-3">
			<div className="container mx-auto flex items-center justify-center md:max-w-6xl md:space-x-20">
				{/*<div className="container mx-auto flex max-w-6xl">*/}
				{/*<Navigation />*/}
				<div className="md:hidden">
					<div className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
						<span className="sr-only">Open menu</span>
						<MobileMenuPopup />
					</div>
				</div>

				<Link href="/" className="w-32 flex-shrink-0">
					<Logo className="ml-4 w-[100px] md:w-[125px] md:m-0" />
				</Link>

				<div className="flex-1">
					<div className="flex items-center justify-end space-x-5 py-2">
						<UserInfo />
						<UserAccountLink />
					</div>
					<Nav />
				</div>
			</div>
		</header>
	)
}
