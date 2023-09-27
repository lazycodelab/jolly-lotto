import { Anton, Heebo, Lato, Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import 'tailwindcss/tailwind.css'

import Header from '@/header'
import Footer from '@/footer'
import { AppProvider } from "@/../context/appProvider";

export const metadata = {
	title: {
		default: 'Home',
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

const heebo = Heebo({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-heebo',
})

const lato = Lato({
	subsets: ['latin'],
	weight: ['400'],
	variable: '--font-lato',
})

const openSans = Open_Sans({
	subsets: ['latin'],
	weight: ['400', '500'],
	variable: '--font-open-sans',
})

const impact = localFont({
	src: '../public/fonts/impact.woff2',
	variable: '--font-impact',
})

export default ({ children }) => {
	return (
		<AppProvider>
			<html lang="en">
				<body
					className={`${heebo.variable} ${lato.variable} ${openSans.variable} ${impact.variable} relative`}>
					<Header />
					<main>{children}</main>
					<Footer />
				</body>
			</html>
		</AppProvider>
	)
}
