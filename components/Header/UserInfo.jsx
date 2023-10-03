import { ArrowDownTrayIcon, UserIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import IconWallet from '@/Icons/IconWallet'
import { useAuth } from 'hooks/auth'
import { useEffect } from 'react'
import { useGlobalContext } from "@/../context/appProvider";

export default () => {
	const { user } = useAuth()
	const { walletBalance } = useGlobalContext();

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
					Balance:&nbsp;
					<strong>
					{
						<>
							<div className='flex'>
								<span>{user.wallet.currency.symbol}</span> 
								<p>{walletBalance !== '' ? walletBalance :
								<>
									<svg className="animate-spin h-[15px] w-[15px] ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
									</svg>
								</>}</p> 
							</div>
						</>
					}
					</strong>
				</div>
			</>
		)
	)
}
