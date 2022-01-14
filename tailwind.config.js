module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        toggleOff: {
          "0%": { transform: "scale(1) rotate(0deg)" },
          "100%": { transform: "scale(0.5) rotate(-360deg)", opacity: 50 },
        },
        toggleOn: {
          "0%": { transform: "scale(0.5) rotate(-180deg)", opacity: 50 },
          "60%": { transform: "scale(1) rotate(-380deg)" },
          "80%": { transform: "rotate(25deg)" },
          "100%": { transform: "rotate(-5deg)" },
        },
      },
      animation: {
        toggleOff: "toggleOff 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        toggleOn: "toggleOn 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
