module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-unused-vars": ["warn", { "ignoreRestSiblings": true }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true,
    }],
  },
};
