/* 打包packages的配置 */
const path = require('path')
const merge = require('webpack-merge')

const cwd = process.cwd()
const baseConfig = require('./webpack.base.js')
const isMinify = process.argv.indexOf('-p') !== -1

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig('production'), {
  entry: './packages/index.js',
  output: {
    path: path.resolve(cwd, 'lib'),
    library: 'miview',
    libraryTarget: 'umd',
    filename: isMinify ? '[name].min.js' : '[name].js',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
    // 'element-ui': 'element-ui'
  },
  performance: false,
  optimization: {
    minimize: isMinify
  }
})
