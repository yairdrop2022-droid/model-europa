import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FAF9F4',
        navy: '#1B2B5E',
        gold: '#C9A84C',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['system-ui', 'ui-sans-serif', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px rgba(0,0,0,0.06)',
      },
      borderRadius: {
        card: '18px',
      },
    },
  },
  plugins: [],
};

export default config;

