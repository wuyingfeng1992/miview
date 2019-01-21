// export { default } from './src/main'

import Dialog from './src/main'

Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog)
}

export default Dialog
