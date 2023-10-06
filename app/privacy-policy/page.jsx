import Link from "next/link"

export const metadata = {
	title: {
		default: 'Privacy Policy',
		template: '%s | Jolly Lotto',
	},
	description: 'Lorem ipsum dolor sit amet.',
	icons: {
		icon: '/favicon/favicon-32x32.png',
		shortcut: '/favicon/favicon-16x16.png',
		apple: '/favicon/apple-touch-icon.png',
	},
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'cyan' },
		{ media: '(prefers-color-scheme: dark)', color: 'pink' },
	],
}

export default () => {
	return (
		<>
			<section className="py-12">
				<div className="container md:max-w-6xl mx-auto px-5">
					<p className="text-2xl text-center my-40">Privacy Policy</p>
					{
						false && (
							<>
								<h2 className="text-start text-3xl text-[#00828b] pb-3 mb-3 border-b-2">
									Privacy Policy
								</h2>
								<p className="text-start text-2xl text-[#00828b] pb-3 mb-2">
									Updated to version 1.1 on 11th of November 2020
								</p>
								<div className="mb-5">
									<button class="bg-[#00d4e3] text-white font-bold py-2 px-7 rounded-[13px] shadow-[0px_2px_0px_#00ACB8]">Print Screen</button>
								</div>
								<p className="text-[#24484B] text-lg mb-5">The policy governs the data which we collect from users and other third parties in the course of our business and the way in which we protect and process such information. Please read this policy carefully to understand how we will treat your personal data. </p>
								<ol className="list-decimal text-[#24484B] text-lg ms-[1rem]">
									<li className="py-2">Data controller</li>
								</ol>
								<p>For the purpose of the General Data Protection Regulation (the “GDPR”)...</p>
							</>
						)
					}
				</div>
			</section>
		</>
	)
}
