module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        targets: {
          browsers: ['last 5 versions', 'ie >= 9']
        }
      }
    ]
  ],
  plugins: [
    'syntax-dynamic-import',
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 2
      }
    ],
    'transform-vue-jsx'
  ]
}
