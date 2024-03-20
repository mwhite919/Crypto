/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "17": "repeat(17, minmax(0, 1fr))",
      },
      colors: {
        base: "var(--base)",
        primary: "var(--primary)",
        second: "var(--second)",
        accent: "var(--accent)",
        accent2: "var(--accent2)",
        navColor: "var(--navColor)",
        navText: "var(--navText)",
        shadowDark: "var(--accentShadow)",
        shadowLight: "var(--accentLight)",
      },
      backgroundColor: {
        base: "var(--base)",
        primary: "var(--accent2)",
        second: "var(--second)",
        accent: "var(--accent)",
        accent2: "var(--primary)",
        navColor: "var(--navColor)",
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
