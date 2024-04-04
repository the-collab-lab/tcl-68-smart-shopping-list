/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		screens: {
			tiny: '100px',
			xs: '395px',
			...defaultTheme.screens,
		},
		extend: {
			fontFamily: {
				Rubik: ['Rubik', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				eggshell: '#FDFDF2',
				sage: '#BBC893',
				brown: '#D4A373',
				yellow: '#FEFAE0',
				vanilla: '#FAEDCD',
				'pale-green': '#E9EDC9',
				'dark-green': '#4D5A3A',
				'green-hover': '#DAE1A6',
			},
			gridTemplateColumns: {
				addItem: 'max-content 4fr 1fr',
				listItem: 'max-content minmax(10px, 1fr) max-content',
				gridTiny: 'max-content minmax(10px, 1fr)',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
