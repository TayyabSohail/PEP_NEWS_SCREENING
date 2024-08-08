export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // General colors
        white: "#FFFFFF",
        black: "#000000",
        light_blue: "#F5FAFF",
        gray: "#6D6D6D",
        light_gray: "#E7E7E7",
        blue: "#DEEFFF",
        pink: "#FBDBFE",
        red: "#FFC9C9",
        green: "#CFFFD8",
        // Brand colors,
        primary: "#085FAB",
        secondary: "#08ABA6",
        text_color: "#454545",
        modal_bg: "#E1EEFF",
      },
      fontFamily: {
        lato: ["Lato", "sans-serif"],
      },
    },
  },
  plugins: [],
};
