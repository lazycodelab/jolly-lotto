const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	content: ['./src/**/*.{jsx,js}'],
	theme: {
		extend: {
			fontFamily: {
				heebo: ['Heebo', ...defaultTheme.fontFamily.sans],
				lato: ['Lato', ...defaultTheme.fontFamily.sans],
				'open-sans': ['"Open Sans"', ...defaultTheme.fontFamily.sans],
				impact: ['Impact', ...defaultTheme.fontFamily.sans],
			},
		},
	},
}
