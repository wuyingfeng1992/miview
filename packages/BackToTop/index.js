// export { default } from './src/main'
import BackToTop from './src/main'

BackToTop.install = function (Vue) {
  Vue.component(BackToTop.name, BackToTop)
}

export default BackToTop
