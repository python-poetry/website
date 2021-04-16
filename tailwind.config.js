const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: {
    content: ["./themes/**/*.html"]
  },
  darkMode: 'media',
  theme: {
    fontFamily: {
      'mono': 'Hack, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      'sans': '"Inter var", -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Ubuntu,sans-serif',
      'subtitle': 'Montserrat, sans-serif'
    },
    extend: {
      colors: {
        blue: colors.lightBlue,
        cyan: colors.cyan,
        primary: '#093D8D',
        code: '#008ADD',
        'light-primary': '#F0F4FC',
        'light-note': '#F6F9FC',
        'link': '#6772E5',
        'link-hover': '#32325D'
      },
      fontSize: {
        'base': '0.9rem',
      },
      maxWidth: {
        '11/12': '91.666667%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
