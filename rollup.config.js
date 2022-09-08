import commonjs from "@rollup/plugin-commonjs"
import resolve from "@rollup/plugin-node-resolve"
import babel from "@rollup/plugin-babel"
import eslint from "@rollup/plugin-eslint"
import { terser } from "rollup-plugin-terser"
import postcss from "rollup-plugin-postcss"
import replace from "@rollup/plugin-replace"
import image from "@rollup/plugin-image"

import path from "path"

const dev = {
  input: "src/app.js",
  output: {
    file: "assets/assets/app.js",
    format: "umd",
  },
  context: "window",
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      extract: true,
      minimize: false,
    }),
    eslint(),
    babel({
      exclude: "node_modules/**",
      configFile: path.resolve(__dirname, "babel.config.json"),
      babelHelpers: "bundled",
    }),
    image({
      dom: true,
    }),
  ],
}

const prod = {
  input: "src/app.js",
  output: {
    file: "assets/assets/app.js",
    format: "esm",
  },
  context: "window",
  plugins: [
    resolve({
      preferBuiltins: true,
    }),
    commonjs(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      extract: true,
      minimize: true,
    }),
    eslint(),
    babel({
      exclude: "node_modules/**",
      configFile: path.resolve(__dirname, "babel.config.json"),
      babelHelpers: "bundled",
    }),
    terser(),
    image({
      dom: true,
    }),
  ],
}

const conf = process.env.NODE_ENV == "production" ? prod : dev

export default conf
