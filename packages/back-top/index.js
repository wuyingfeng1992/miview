// export { default } from './src/main'
import BackTop from './src/main'

BackTop.install = function (Vue) {
  Vue.component(BackTop.name, BackTop)
}

export default BackTop
