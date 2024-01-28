

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      extend: {
          colors: {
              onNeutralBg: 'var(--onNeutralBg)',
              neutralBg: 'var(--neutralBg)',
              onPrimaryBg: 'var(--onPrimaryBg)',
              primaryBg: 'var(--primaryBg)',
              primary: 'var(--primary)',
          }
      },
  },
  plugins: [require('@headlessui/tailwindcss')],
}



