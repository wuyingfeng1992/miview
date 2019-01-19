// export { default } from './src/main.vue'
import SimpleImgPreview from './src/main.vue'

SimpleImgPreview.install = function (Vue) {
  Vue.component(SimpleImgPreview.name, SimpleImgPreview)
}

export default SimpleImgPreview
