/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      extend: {
        animation: {
          "fade-in": "fadeIn 1.2s ease-out both",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0, transform: "scale(0.95)" },
            "100%": { opacity: 1, transform: "scale(1)" },
          },
        },
      },
    },
  },
  plugins: [],
};
