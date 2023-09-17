module.exports = {
  semi: false,
  plugins: [require("prettier-plugin-go-template")],
  overrides: [
    {
      files: ["*.html"],
      options: {
        parser: "go-template",
      },
    },
  ],
}
