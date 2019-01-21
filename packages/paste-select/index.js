// export { default } from './src/main'

import PasteSelect from './src/main'

PasteSelect.install = function (Vue) {
  Vue.component(PasteSelect.name, PasteSelect)
}

export default PasteSelect
