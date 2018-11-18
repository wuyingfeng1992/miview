module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: ['standard', 'plugin:vue/recommended'],
  plugins: ['vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-self-closing': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/attribute-hyphenation': 0,
    'vue/max-attributes-per-line': 0
  },
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  }
}
