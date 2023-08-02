module.exports = {
	content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,jsx}'],
	theme: {
		fontFamily: {
			heebo: ['var(--font-heebo)'],
			'open-sans': ['var(--font-open-sans)'],
			lato: ['var(--font-lato)'],
			impact: ['var(--font-impact)'],
		},
		extend: {
			backgroundImage: {
				'get-connected': "url('/images/get-connected-banner.png')",
			},
		},
	},
}
