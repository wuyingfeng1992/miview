import LoadingBar from './src/index.js'

LoadingBar.install = function (Vue) {
  // console.log('LoadingBar: ', LoadingBar.component)
  Vue.prototype.$LoadingBar = LoadingBar
  Vue.component(LoadingBar.component.name, LoadingBar.component)
}

export default LoadingBar
