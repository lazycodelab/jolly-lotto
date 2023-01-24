import React from 'react'
import Image from 'next/image'
import IconEnvelope from './Icons/IconEnvelope'
import IconPhone from './Icons/IconPhone'
import Link from 'next/link'
import IconFacebook from './Icons/IconFacebook'
import IconTwitter from './Icons/IconTwitter'

export default () => {
	const MenuSection = ({ title, children, className }) => {
		return (
			<div>
				<h4 className="text-xl font-semibold text-cyan-500">{title}</h4>
				{/*<ul className="mt-5 ">{children}</ul>*/}
				<ul className={`mt-5 ${className}`}>{children}</ul>
			</div>
		)
	}

	const FooterLink = ({ href, className, children }) => (
		<Link href={href} className={`text-teal-900 underline ${className}`}>
			{children}
		</Link>
	)

	return (
		<footer className="border-t border-gray-200 bg-cyan-50 py-14 px-6 sm:px-16 md:py-20">
			<div className="mx-auto max-w-6xl md:container">
				<div className="grid grid-cols-2 gap-y-8 gap-x-10 md:grid-cols-3 md:grid-rows-2">
					<MenuSection title={'Play Lottery Online'}>
						<li>
							<FooterLink href={'#'}>
								About Lotto Express
							</FooterLink>
						</li>
					</MenuSection>
					<MenuSection title="Play Lotteries Online">
						<li>
							<FooterLink href="/">French Lotto</FooterLink>
						</li>
						<li>
							<FooterLink href="/">Oz Lotto</FooterLink>
						</li>
						<li>
							<FooterLink href="/">Irish Lotto</FooterLink>
						</li>
						<li>
							<FooterLink href="/">Euro Millions</FooterLink>
						</li>
					</MenuSection>
					<MenuSection title="Lottery Results & Winnings">
						<li>
							<FooterLink href="/">French Lotto</FooterLink>
						</li>
						<li>
							<FooterLink href="/">Oz Lotto</FooterLink>
						</li>
						<li>
							<FooterLink href="/">Irish Lotto</FooterLink>
						</li>
						<li>
							<FooterLink href="/">Euro Millions</FooterLink>
						</li>
					</MenuSection>
					<MenuSection title="Useful Links">
						<li>
							<FooterLink href="/">Responsible</FooterLink>
						</li>
						<li>
							<FooterLink href="/">Gaming Contact Us</FooterLink>
						</li>
					</MenuSection>
					<MenuSection
						title="Need Help"
						className={'flex items-center space-x-5'}>
						<li className="w-20">
							<a href="#" className="underline">
								<IconEnvelope
									className={'w-6 fill-current text-teal-900'}
								/>
								Email
							</a>
						</li>
						<li className="w-20">
							<a href="#" className="underline">
								<IconPhone
									className={'w-5 fill-current text-teal-900'}
								/>
								Call
							</a>
						</li>
					</MenuSection>
					<MenuSection
						title="Find us on!"
						className={'flex space-x-5'}>
						<li className="w-20">
							<IconFacebook
								className={'w-12 fill-current text-teal-900'}
							/>
						</li>
						<li className="w-20">
							<IconTwitter
								className={'w-12 fill-current text-teal-900'}
							/>
						</li>
					</MenuSection>
				</div>

				<div className="mt-16 space-x-5 divide-x divide-cyan-900 text-center">
					<FooterLink href={'/'}>Responsible Gaming</FooterLink>
					<FooterLink href={'/'} className={'pl-5'}>
						Terms & Conditions
					</FooterLink>
					<FooterLink href={'/'} className={'pl-5'}>
						Privacy Policy
					</FooterLink>
					<FooterLink href={'/'} className={'pl-5'}>
						Contact Us
					</FooterLink>
				</div>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-10">
					<Image
						src="/images/footer/gc.png"
						alt="GC"
						width={180}
						height={50}
					/>
					<Image
						src="/images/footer/lock-icon.png"
						width={180}
						height={50}
						alt="SSL"
					/>
					<Image
						src="/images/footer/ST_Footer_18.png"
						width={70}
						alt="cio"
						height={70}
					/>
					<Image
						src="/images/footer/ST_Footer_GA.svg"
						width={150}
						height={50}
						alt="cio"
					/>
					<Image
						src="/images/footer/ST_Footer_GC.svg"
						width={150}
						height={50}
						alt="cio"
					/>
				</div>
			</div>
		</footer>
	)
}
