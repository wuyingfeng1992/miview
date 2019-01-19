// export { default } from './src/main.vue'
import BackToTop from './src/main.vue'

BackToTop.install = function (Vue) {
  Vue.component(BackToTop.name, BackToTop)
}

export default BackToTop
