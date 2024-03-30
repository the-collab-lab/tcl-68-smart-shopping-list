/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		colors: {
			eggshell: '#FDFDF2',
			sage: '#BBC893',
			brown: '#D4A373',
			yellow: '#FEFAE0',
			vanilla: '#FAEDCD',
			'pale-green': '#E9EDC9',
		},
		extend: {
			fontFamily: {
				Rubik: ['Rubik', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
};
