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
        base: "var(--baseC)",
        primary: "var(--accent2)",
        second: "var(--secondC)",
        accent: "var(--accentC)",
        accent2: "var(--primaryC)",
      },
      backgroundColor: {
        base: "var(--baseC)",
        primary: "var(--accent2C)",
        second: "var(--secondC)",
        accent: "var(--accentC)",
        accent2: "var(--primaryC)",
      },
      textColor: {
        base: "var(--base)",
        primary: "var(--accent2)",
        second: "var(--second)",
        accent: "var(--accent)",
        accent2: "var(--primary)",
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
