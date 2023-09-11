import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import IconTwitter from './Icons/IconTwitter'
import IconFacebook from './Icons/IconFacebook'
import IconEnvelope from './Icons/IconEnvelope'
import IconPhone from './Icons/IconPhone'

export default () => {
	const copyrightSymbol = String.fromCodePoint(0x000a9);
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

				<div className="mt-14 space-y-3 md:space-x-5 flex flex-col md:block md:divide-x md:divide-cyan-900 text-center">
					<a href="https://www.casino.org/responsible-gambling/" target='_blank' className="text-teal-900 underline">Responsible Gaming</a>
					<FooterLink href={'/terms-and-conditions'} className={'md:pl-5'}>
						Terms & Conditions
					</FooterLink>
					<FooterLink href={'/privacy-policy'} className={'md:pl-5'}>
						Privacy Policy
					</FooterLink>
					<FooterLink href={'/contact-us'} className={'md:pl-5'}>
						Contact Us
					</FooterLink>
				</div>

				<div className="mt-10">
					<p className="text-teal-900 text-sm md:text-base text-center mb-3">jollylotto.com (Ralseft Limited) strictly prohibits access and services to those under the legal age of eighteen (18) years old.</p>
					<p className="text-teal-900 text-sm md:text-base text-center mb-3">We encourage responsible gambling and if you feel that you have a problem with gambling contact us and we will assist in locating assistance in your jurisdiction – For the UK please visit GamCare’s website for help and advice at <a href="https://www.gamcare.org.uk" target='_blank' className="text-teal-900 underline">www.gamcare.org.uk</a>. For Ireland go to the responsible play website <a href="https://www.responsibleplay.ie" target='_blank' className="text-teal-900 underline">www.responsibleplay.ie</a> or alternatively <a href="https://www.problemgambling.ie" target='_blank' className="text-teal-900 underline">www.problemgambling.ie</a>.</p>
					<p className="text-teal-900 text-sm md:text-base text-center mb-3">jollylotto.com is owned and operated by Ralseft Limited and its wholly owned subsidiary Ralseft Limited N.V. licenced and regulated By Gaming Curacao under licence 365/JAZ Sub-Licence GLH-OCCHKTW0701192020</p>
					<p className="text-teal-900 text-sm md:text-base text-center mb-3">Copyright {copyrightSymbol} {new Date().getFullYear()}, Ralseft Limited: JollyLotto. E.&O.E.</p>
				</div>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-10">
					<Image
						src="/images/footer/lock-icon.png"
						width={180}
						height={50}
						style={{ width: 'auto', height: 'auto' }}
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
