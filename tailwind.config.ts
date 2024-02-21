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
        base: "var(--base)",
        primary: "var(--accent2)",
        second: "var(--second)",
        accent: "var(--accent)",
        accent2: "var(--primary)",
      },
      backgroundColor: {
        base: "var(--base)",
        primary: "var(--accent2)",
        second: "var(--second)",
        accent: "var(--accent)",
        accent2: "var(--primary)",
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
