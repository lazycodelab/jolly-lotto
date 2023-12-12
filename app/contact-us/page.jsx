import { ContactForm } from '@/contact-form/form'

export const metadata = {
	title: {
		default: 'Contact Us',
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
		<section className="container mx-auto my-10 items-center bg-white shadow-lg md:max-w-5xl py-0 md:p-12">
			<div className="container mx-auto px-5">
				<h1 className="text-center text-2xl font-bold uppercase text-teal-600 md:block">
					Contact Us
				</h1>
				<p className="text-teal-600 md:block mt-4">
					We want to hear from you
				</p>
				<p className="mt-4">
					Please feel free to contact our friendly and professional
					staff. They will be happy to assist you or answer any
					questions you may have. You can reach us by chat, email via
					our contact form or just give us a phone call.
				</p>
				<div className="grid grid-cols-2">
					<div className="col-span-1">
						<ul className="mt-10 space-y-4">
							<li className="flex items-center gap-x-4">
								<img
									src="https://cdn1.lottoexpress.com/resources/images/ContactEmail.svg"
									alt="contact"
								/>
								<p>Email</p>
								<a href="mailto:info@jollylotto.com">
									info@jollylotto.com
								</a>
							</li>
							<li className="flex items-center gap-x-4">
								<img
									src="https://cdn1.lottoexpress.com/resources/images/ContactCall.svg"
									alt="contact"
								/>
								<p>Call</p>
								<a href="#">1111111111</a>
							</li>
						</ul>
					</div>
					<div className="col-span-1">
						<ContactForm />
					</div>
				</div>
			</div>
		</section>
	)
}
