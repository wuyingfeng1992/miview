// export { default } from './src/main.vue'
import Toast from './src/main.vue'

Toast.install = function (Vue) {
  Vue.component(Toast.name, Toast)
}

export default Toast
