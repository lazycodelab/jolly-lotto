export const metadata = {
	title: {
		default: 'About',
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
	return <h1 className="text-center text-2xl my-[10rem]">About Us</h1>
}
