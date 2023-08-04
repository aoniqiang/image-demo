/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,ts,jsx,js,html}"],
  theme: {
    extend: {
      colors: {
        'icon-color': '#0EA5E9',
        'card-bg': '#317AFF'
      }
    },
  },
  plugins: [],
  important: true
}

