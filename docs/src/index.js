import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './DocsApp.vue'
import routes from './router'
import demoBlock from './components/demo-block.vue'
// import miview from '../../packages/index'
import './plugins/element.js'
import './plugins/miview.js'
// 引入指令
// import './directives/drag'
Vue.component('demo-block', demoBlock)
// Vue.use(miview)
Vue.use(VueRouter)

let lang = 'zh-CN'
Vue.prototype.$vantLang = lang

const router = new VueRouter({
  mode: 'hash',
  routes: routes()
})
router.beforeEach((route, redirect, next) => {
  // if (isMobile) {
  //   location.replace('mobile.html' + location.hash);
  // }
  // progress.start()
  console.log('title: ', route.meta)
  document.title = route.meta.title || document.title
  next()
})

router.afterEach(() => {
  // progress.done()
  window.scrollTo(0, 0)
  // Vue.nextTick(() => window.syncPath())
})

window.vueRouter = router

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
