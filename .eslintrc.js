module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/core-web-vitals",
    "airbnb",
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/dot-notation": "error",
    "react/react-in-jsx-scope": "off",
    "import/prefer-default-export": "off",
    "import/extensions": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "global-require": "off",
  },
};
