import Link from 'next/link'
import Logo from './Logo'
import Nav from './Nav'
import UserInfo from './Header/UserInfo'
import MobileMenuPopup from './Header/MobileMenuPopup'

export default () => {
	return (
		<header className="border-b border-b-gray-200 px-1 py-2 md:py-3 md:px-6">
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
					<Logo className="ml-4 w-[100px] md:m-0 md:max-w-xs" />
				</Link>

				<div className="flex-1">
					<UserInfo />
					<Nav />
				</div>
			</div>
		</header>
	)
}
