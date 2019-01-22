/* module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'entry',
        targets: {
          browsers: ['last 5 versions', 'ie >= 9']
        }
      }
    ]
  ],
  plugins: [[
    '@babel/plugin-transform-runtime',
    {
      corejs: false,
      helpers: true,
      regenerator: false,
      useESModules
    }
  ],'syntax-dynamic-import', 'transform-vue-jsx']
}
 */

const { BABEL_MODULE, NODE_ENV } = process.env
const useESModules = BABEL_MODULE !== 'commonjs' && NODE_ENV !== 'test'

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: useESModules ? false : 'commonjs'
      }
    ],
    [
      '@vue/babel-preset-jsx',
      {
        functional: true
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules
      }
    ],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-object-assign'
  ]
}
