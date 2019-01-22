const fs = require('fs-extra')
const glob = require('fast-glob')
const path = require('path')
const gulp = require('gulp')
const sass = require('gulp-sass')
// const csso = require('gulp-csso');
const postcss = require('gulp-postcss')

const postcssImport = require('postcss-import')
const postcssPresetEnv = require('postcss-preset-env')
// const cssnano = require('cssnano')

// const resolve = function (dir) {
//   return path.resolve(__dirname, '..', dir)
// }
// const postcssConfig = require(resolve('config/postcss.config.js'))
const postcssPlugins = [
  postcssImport(),
  postcssPresetEnv({
    browsers: 'last 2 versions'
  })
  // cssnano()
]

// console.log('postcssConfig ===> ');
// console.log(JSON.stringify(postcssConfig));

// compile component css
gulp.task('compile', () =>
  gulp
    .src(['../es/**/*.scss', '../lib/**/*.scss'])
    .pipe(
      sass({
        paths: [path.resolve(__dirname, 'node_modules')]
      })
    )
    .pipe(postcss(postcssPlugins))
    // .pipe(csso())
    .pipe(gulp.dest(file => file.base.replace('.scss', '.css')))
)

// icon.less should be replaced by compiled file
gulp.task('default', ['compile'], () =>
  glob(['../es/icon/*.css', '../lib/icon/*.css']).then(files => {
    files.forEach(file => {
      file = path.join(__dirname, file)
      fs.copyFileSync(file, file.replace('.css', '.scss'))
    })
  })
)
