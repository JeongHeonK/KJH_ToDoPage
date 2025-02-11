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
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "react/jsx-props-no-spreading": "off",
    "react/require-default-props": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/naming-convention": "off",
    "react/button-has-type": "off",
    "no-param-reassign": "off",
  },
};
