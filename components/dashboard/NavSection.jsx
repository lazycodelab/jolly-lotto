import Link from "next/link"

export default ({selected}) => {
    return (
        <nav className="bg-gray-200">
            <div className="container mx-auto flex max-w-md items-center justify-center space-x-5 py-3">
                <Link
                    className={`border-b-2 border-slate-300 hover:border-slate-500 ${selected === 'Profile' ? 'border-slate-500' : ''}`}
                    href="/user/dashboard">
                    Account
                </Link>
                <Link
                    className={`border-b-2 border-slate-300 hover:border-slate-500 ${selected === 'Funds' ? 'border-slate-500' : ''}`}
                    href="/user/add-funds">
                    Wallet
                </Link>
                <Link
                    className={`border-b-2 border-slate-300 hover:border-slate-500 ${selected === 'Order History' ? 'border-slate-500' : ''}`}
                    href="/user/dashboard">
                    Orders
                </Link>
                <Link
                    className={`border-b-2 border-slate-300 hover:border-slate-500 ${selected === 'Notification' ? 'border-slate-500' : ''}`}
                    href="/user/dashboard">
                    Notifications
                </Link>
            </div>
        </nav>
    )
}
