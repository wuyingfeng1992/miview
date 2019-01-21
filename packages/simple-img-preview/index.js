// export { default } from './src/main'
import SimpleImgPreview from './src/main'

SimpleImgPreview.install = function (Vue) {
  Vue.component(SimpleImgPreview.name, SimpleImgPreview)
}

export default SimpleImgPreview
