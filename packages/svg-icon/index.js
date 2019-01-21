// export { default } from './src/main'
import SvgIcon from './src/main'

SvgIcon.install = function (Vue) {
  Vue.component(SvgIcon.name, SvgIcon)
}

export default SvgIcon
