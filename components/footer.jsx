import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import IconTwitter from './Icons/IconTwitter'
import IconFacebook from './Icons/IconFacebook'
import IconEnvelope from './Icons/IconEnvelope'
import IconPhone from './Icons/IconPhone'

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
		<footer className="border-t border-gray-200 bg-cyan-50 px-6 py-14 sm:px-16 md:py-20">
			<div className="mx-auto md:container md:max-w-4xl">
				<div className="grid grid-cols-2 gap-y-8 md:grid-cols-3 md:grid-rows-2">
					<MenuSection title={'Play Lottos Online'}>
						<li>
							<FooterLink href={'/about-us'}>
								About Jolly Lotto
							</FooterLink>
						</li>
					</MenuSection>
					<MenuSection title="Play Lotteries Online">
						<li>
							<FooterLink href="/lotteries/1">Australian 6/45</FooterLink>
						</li>
						<li>
							<FooterLink href="/lotteries/3">Euro Millions</FooterLink>
						</li>
						<li>
							<FooterLink href="/lotteries/2">Canadian 6/49</FooterLink>
						</li>
					</MenuSection>
					<MenuSection title="Lotto Results">
						<li>
							<FooterLink href="/lotteries/1">Australian 6/45</FooterLink>
						</li>
						<li>
							<FooterLink href="/lotteries/3">Euro Millions</FooterLink>
						</li>
						<li>
							<FooterLink href="/lotteries/2">Canadian 6/49</FooterLink>
						</li>
					</MenuSection>
					<MenuSection
						title="Need Help"
						className={'flex items-center space-x-5'}>
						<li className="w-20">
							<a href="mailto:contact@jollylotto.com" className="underline">
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
					<a href="https://www.casino.org/responsible-gambling/" target='_blank' className="text-teal-900 underline">Responsible Gaming</a>
					<FooterLink href={'/terms-and-conditions'} className={'pl-5'}>
						Terms & Conditions
					</FooterLink>
					<FooterLink href={'/privacy-policy'} className={'pl-5'}>
						Privacy Policy
					</FooterLink>
					<FooterLink href={'/contact-us'} className={'pl-5'}>
						Contact Us
					</FooterLink>
				</div>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-10">
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
				</div>
			</div>
		</footer>
	)
}
