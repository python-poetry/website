const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    content: ["./themes/**/*.html", "./assets/src/js/**/*.js"]
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      'mono': '"Jetbrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      'sans': '"Inter var", -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif',
    },
    extend: {
      colors: {
        blue: colors.lightBlue,
        gray: colors.blueGray,
        cyan: colors.cyan,
        red: colors.rose,
        yellow: colors.amber,
        primary: '#093D8D',
        code: '#0284C7',
        'light-primary': '#F0F4FC',
        'light-note': '#F7F9FF',
        'light-note-darker': '#F2F6FF',
        'dark-note-darker': '#28394D',
        'link': '#6772E5',
        'link-hover': '#32325D',
        'dark-primary': '#D0D4FC',
        'dark-secondary': '#1E293B',
        'table-header': '#EAEFFF'
      },
      fontSize: {
        'base': '0.9rem',
      },
      maxWidth: {
        '11/12': '91.666667%'
      },
      zIndex: {
        '100': 100,
        '200': 200,
        '1000': 1000,
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
