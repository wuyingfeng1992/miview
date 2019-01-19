module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: ['standard', 'plugin:vue/base'],
  plugins: ['vue'],
  rules: {
    semi: 0,
    'no-console': 0,
    'no-debugger': 0,
    'vue/html-self-closing': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/attribute-hyphenation': 0,
    'vue/max-attributes-per-line': 0
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
    ecmaFeatures: {
      jsx: true,
      blockBindings: true
    }
  }
}
