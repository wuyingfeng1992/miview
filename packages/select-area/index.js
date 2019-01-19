// export { default } from './src/main.vue'

import SelectArea from './src/main.vue'

SelectArea.install = function (Vue) {
  Vue.component(SelectArea.name, SelectArea)
}

export default SelectArea
