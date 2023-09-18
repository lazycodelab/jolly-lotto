import { ArrowDownTrayIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import IconWallet from '@/Icons/IconWallet'
import { useAuth } from 'hooks/auth'

export default () => {
	const { user } = useAuth()

	return (
		user &&
		user.statusCode === 200 && (
			<>
				<div className="flex md:flex-col flex-row items-center text-right text-xs">
					<span className='md:block hidden'>Current Time: 4:25 PM</span>
					<span>Current Session: 00:14:55</span>
					<div className='flex md:hidden items-center text-sm text-white rounded p-1 bg-[#99e5eb] ms-2'>
						<UserIcon className="h-6 w-6" />
					</div>
				</div>
				<Link
					href="/user/add-funds"
					type="button"
					className="hidden items-center gap-x-2 rounded-lg bg-gradient-to-r from-green-600 to-lime-500 px-6 py-2 text-sm text-white hover:from-lime-500 hover:to-lime-500 md:flex">
					<ArrowDownTrayIcon className="w-4 text-white" />
					Add Funds
				</Link>
				<div
					className="hidden items-center text-sm text-gray-700 md:flex">
					<IconWallet
						className={'mr-2 w-4 fill-current text-gray-500'}
					/>
					Balance:&nbsp;<strong>{user.wallet.currency.symbol}{user.wallet.available}</strong>
				</div>
			</>
		)
	)
}
