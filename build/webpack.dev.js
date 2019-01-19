const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.base.js')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig('development'), {
  entry: './examples/index.js',
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'examples/index.html',
      filename: 'index.html',
      inject: true
    })
  ],
  devServer: {
    contentBase: resolve('examples'),
    publicPath: '/',
    hot: true,
    hotOnly: true,
    clientLogLevel: 'none',
    quiet: true,
    port: 9999,
    open: true,
    disableHostCheck: true,
    proxy: {}
  }
})
