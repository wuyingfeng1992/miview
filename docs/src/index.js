import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './DocsApp.vue'
import routes from './router'
import demoBlock from './components/demo-block.vue'
import mview from '../../packages/index'

Vue.component('demo-block', demoBlock)
Vue.use(mview)
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
