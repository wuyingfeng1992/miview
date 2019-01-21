/* eslint-disable */
// This file is auto gererated by build/build-entry.js
import BackToTop from './BackToTop';
import Dialog from './dialog';
import PasteSelect from './paste-select';
import Select from './select';
import SelectArea from './select-area';
import SimpleImgPreview from './simple-img-preview';
import SvgIcon from './svg-icon';
import Table from './table';
import Toast from './toast';
import Transfer from './transfer';
import TreeSelect from './tree-select';
const version = '0.2.3';
const components = [
  BackToTop,
  Dialog,
  PasteSelect,
  Select,
  SelectArea,
  SimpleImgPreview,
  SvgIcon,
  Table,
  Toast,
  Transfer,
  TreeSelect
];
const install = Vue => {
  components.forEach(Component => {
    Vue.use(Component);
  });
};
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export {
  install,
  version,
  BackToTop,
  Dialog,
  PasteSelect,
  Select,
  SelectArea,
  SimpleImgPreview,
  SvgIcon,
  Table,
  Toast,
  Transfer,
  TreeSelect
};
export default {
  install,
  version
};
