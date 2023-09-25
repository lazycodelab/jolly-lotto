'use client';
//import { ShoppingCartIcon } from '@heroicons/react/solid'
import classNames from 'classnames'
import Link from 'next/link'
import IconEnvelopeCircle from './Icons/IconEnvelopeCircle'
import IconPhoneCircle from './Icons/IconPhoneCircle'
import NavDropdown from './NavDropdown';

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
					className,
				)}
				{...props}>
				{children}
			</Link>
		)
	}

	return (
		<div className="hidden items-center justify-between md:flex">
			<nav className="space-x-10 text-sm">
				<NavDropdown navTitle={"Lotteries"} navType={"products"}/>
				<NavDropdown navTitle={"Lottery Results"} navType={"results"}/>
				{/* <NavLink href="/contact">Lottery Results</NavLink> */}
				<NavLink href="/contact-us">Contact Us</NavLink>
			</nav>
			<div className="hidden items-center gap-x-2 md:flex">
				<Link href="/">
					<IconPhoneCircle className="w-6 fill-current text-gray-500" />
				</Link>
				<a href="mailto:contact@jollylotto.com">
					<IconEnvelopeCircle className="w-6 fill-current text-gray-500" />
				</a>
			</div>
		</div>
	)
}
