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
        base: "var(--color-background-base)",
        second: "var(--color-background-second)",
        accent: "var(--color-buttons-base)",
        primaryBg: "var(--primaryBg)",
        primary: "var(--color-primary)",
      },
      textColor: {
        base: "var(--color-primary)",
        second: "var(--color-background-second)",
        accent: "var(--color-buttons-base)",
        primaryBg: "var(--primaryBg)",
        primary: "var(--color-primary)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
