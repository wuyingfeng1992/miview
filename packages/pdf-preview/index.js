// export { default } from './src/main.vue'
import PdfPreview from './src/main.vue'

PdfPreview.install = function (Vue) {
  Vue.component(PdfPreview.name, PdfPreview)
}

export default PdfPreview
