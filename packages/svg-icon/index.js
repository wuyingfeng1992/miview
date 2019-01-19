// export { default } from './src/main.vue'
import SvgIcon from './src/main.vue'

SvgIcon.install = function (Vue) {
  Vue.component(SvgIcon.name, SvgIcon)
}

export default SvgIcon
