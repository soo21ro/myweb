/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: { colors: { berry: '#E11D48', leaf: '#15803D', cream: '#FFFBF7' }, fontFamily: { sans: ['"Noto Sans TC"', 'sans-serif'] } } },
  plugins: []
}
