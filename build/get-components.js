/* 获取所有packages中需要打包的组件 */
const fs = require('fs')
const path = require('path')

const excludes = [
  'index.js',
  'index.less',
  'style',
  'styles',
  'mixins',
  'utils',
  'directives',
  '.DS_Store',
  'pdf-preview'
]

module.exports = function () {
  const dirs = fs.readdirSync(path.resolve(__dirname, '../packages'))
  return dirs.filter(dirName => excludes.indexOf(dirName) === -1)
}
