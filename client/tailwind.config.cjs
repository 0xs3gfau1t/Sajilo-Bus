/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			width: {
				"max": "80%",
			},
			colors: {
				"bg1": "#030413",
				"black1": "rgb(24, 24, 24)",
			},
		},
	},
	plugins: [],
}
