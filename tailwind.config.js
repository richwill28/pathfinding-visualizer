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
        visited: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "rgba(147, 51, 234, 0.75)",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "rgba(79, 70, 229, 0.75)",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "rgba(59, 130, 246, 0.75)",
          },
          "100%": {
            transform: "scale(1)",
            backgroundColor: "rgba(34, 211, 238, 1)",
          },
        },
        path: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "rgba(225, 29, 72, 0.75)",
            borderRadius: "100%",
          },
          "50%": {
            backgroundColor: "rgba(234, 88, 12, 0.75)",
          },
          "75%": {
            transform: "scale(1.2)",
            backgroundColor: "rgba(251, 146, 60, 0.75)",
          },
          "90%": {
            transform: "scale(0.8)",
            backgroundColor: "rgba(253, 230, 138, 1)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        wall: {
          "0%": {
            transform: "scale(0.3)",
            backgroundColor: "rgba(55, 61, 81, 1)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
      animation: {
        toggleOff: "toggleOff 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        toggleOn: "toggleOn 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        visited: "visited 1.5s cubic-bezier(0, 0, 0.2, 1)",
        path: "path 1.5s cubic-bezier(0, 0, 0.2, 1)",
        wall: "wall 1s cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
