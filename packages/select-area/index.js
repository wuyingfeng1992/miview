// export { default } from './src/main'

import SelectArea from './src/main'

SelectArea.install = function (Vue) {
  Vue.component(SelectArea.name, SelectArea)
}

export default SelectArea
