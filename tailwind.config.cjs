/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        main: {
          primary: "#0f0f0f",
          secondary: "#141414",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
