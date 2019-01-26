import DragDrawer from './src/main'

DragDrawer.install = function (Vue) {
  Vue.component(DragDrawer.name, DragDrawer)
}

export default DragDrawer
