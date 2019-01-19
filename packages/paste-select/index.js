// export { default } from './src/main.vue'

import PasteSelect from './src/main.vue'

PasteSelect.install = function (Vue) {
  Vue.component(PasteSelect.name, PasteSelect)
}

export default PasteSelect
