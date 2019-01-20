/* 暂已废弃 */
const path = require('path')
const merge = require('webpack-merge')

const cwd = process.cwd()
const baseConfig = require('./webpack.base.js')

const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = merge(baseConfig('production'), {
  entry: './index.js',
  output: {
    path: path.resolve(cwd, 'lib'),
    filename: 'index.min.js',
    libraryTarget: 'umd'
  }
})
