

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
          backgroundColor: {
              base: 'var(--color-background-base)',
              second: 'var(--color-background-second)',
              onPrimaryBg: 'var(--onPrimaryBg)',
              primaryBg: 'var(--primaryBg)',
              primary: 'var(--primary)',
          }
      },
  },
  plugins: [require('@headlessui/tailwindcss')],
}



