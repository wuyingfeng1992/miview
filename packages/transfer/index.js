// export { default } from './src/main.vue'

import Transfer from './src/main.vue'

Transfer.install = function (Vue) {
  Vue.component(Transfer.name, Transfer)
}

export default Transfer