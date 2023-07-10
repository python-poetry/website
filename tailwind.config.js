const colors = require("tailwindcss/colors")

module.exports = {
  mode: "jit",
  content: ["./layouts/**/*.html", "./assets/src/**/*.js"],
  darkMode: "class",
  theme: {
    fontFamily: {
      mono: '"Jetbrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      sans: '"Inter var", -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif',
    },
    extend: {
      colors: {
        blue: colors.blue,
        gray: colors.slate,
        cyan: colors.cyan,
        red: colors.rose,
        yellow: colors.amber,
        orange: colors.orange,
        primary: {
          50: "#f3f5f9",
          100: "#e6ecf4",
          200: "#c2cfe3",
          300: "#9db1d1",
          400: "#5377af",
          500: "#093D8D",
          600: "#08377f",
          700: "#072e6a",
          800: "#052555",
          900: "#041e45",
        },
        secondary: {
          50: "#f5f5fc",
          100: "#ecebfa",
          200: "#cfcdf2",
          300: "#b2afe9",
          400: "#7973d9",
          500: "#3f37c9",
          600: "#3932b5",
          700: "#2f2997",
          800: "#262179",
          900: "#1f1b62",
        },
        code: colors.sky,
        "light-primary": "#FBFBFF",
        "light-note": "#F7F9FF",
        "light-note-darker": "#F2F6FF",
        "dark-note-darker": "#28394D",
        link: "#6772E5",
        "link-hover": "#32325D",
        "dark-primary": "#D0D4FC",
        "dark-secondary": "#1E293B",
        highlight: "#012a4a",
      },
      fontSize: {
        base: "0.9rem",
      },
      maxWidth: {
        "11/12": "91.666667%",
      },
      zIndex: {
        100: 100,
        200: 200,
        1000: 1000,
      },
      border: {
        primary: "#093D8D",
      },
      boxShadow: {
        "clean-sm": "0 1px 2px 0 hsl(240deg, 20%, 90%)",
        clean:
          "0 1px 3px 0 hsl(240deg, 20%, 90%), 0 1px 2px 0 hsl(240deg, 20%, 90%)",
        "clean-md":
          "0 4px 6px -1px hsl(220deg, 20%, 90%), 0 2px 4px -1px hsl(220deg, 20%, 90%)",
        "clean-lg":
          "0 10px 15px -3px hsl(220deg, 20%, 90%), 0 4px 6px -2px hsl(220deg, 20%, 90%)",
        "clean-dark-sm": "0 1px 2px 0 hsl(217deg, 32%, 12%)",
        "clean-dark":
          "0 1px 3px 0 hsl(217deg, 32%, 12%), 0 1px 2px 0 hsl(217deg, 32%, 12%)",
        "clean-dark-md":
          "0 4px 6px -1px hsl(217deg, 32%, 12%), 0 2px 4px -1px hsl(217deg, 32%, 12%)",
        "clean-dark-lg":
          "0 10px 15px -3px hsl(217deg, 32%, 12%), 0 4px 6px -2px hsl(217deg, 32%, 12%)",
      },
    },
  },
  variants: {
    extend: {
      ringWidth: ["active"],
      ringColor: ["active"],
      borderWidth: ["active"],
      borderColor: ["active"],
    },
  },
}
