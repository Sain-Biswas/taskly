// prettier.config.js

/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const configuration = {
  semi: true,
  trailingComma: "es5",
  experimentalTernaries: true,
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
};

export default configuration;
