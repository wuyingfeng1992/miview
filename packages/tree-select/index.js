// export { default } from './src/main.vue'
import TreeSelect from './src/main.vue'

TreeSelect.install = function (Vue) {
  Vue.component(TreeSelect.name, TreeSelect)
}

export default TreeSelect
