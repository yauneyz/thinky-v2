module.exports = {
  env: {
    browser: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": ["warn", { varsIgnorePattern: "_.*" }],
    "react/prop-types": "off",
    "no-debugger": "off",
  },
};
