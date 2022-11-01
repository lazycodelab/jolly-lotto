//import { ShoppingCartIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import Link from 'next/link'

export default () => {
	const NavLink = ({ href, cta, className, children, ...props }) => {
		return (
			<Link
				href={href}
				// @todo: maybe cleanup this logic here?
				className={classNames(
					{
						'relative transition-all': !cta,
					},
					{
						'px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-full shadow-md hover:shadow-lg transition-all duration-200': false,
					},
					{
						'text-purple-600 after:scale-x-100': true,
					},
					className,
				)}
				{...props}>
				{children}
			</Link>
		)
	}

	return (
		<div className="flex justify-between items-center">
			<nav className="space-x-10 text-sm">
				<NavLink href="/designer">Lotteries</NavLink>
				<NavLink href="/about">Promotions</NavLink>
				<NavLink href="/contact">Lottery Results</NavLink>
				<NavLink href="/contact">Contact Us</NavLink>
			</nav>
			<div>
				<a href="#">ContactIcon</a>
				<a href="#">EmailIcon</a>
			</div>
		</div>
	)
}