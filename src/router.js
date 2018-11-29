import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/toast',
      name: 'toast',
      // route level code-splitting
      // this generates a separate chunk (toast.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "toast" */ './views/ToastExample.vue')
    },
    {
      path: '/table',
      name: 'table',
      // route level code-splitting
      // this generates a separate chunk (table.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "table" */ './views/TableExample.vue')
    },
    {
      path: '/transfer',
      name: 'transfer',
      // route level code-splitting
      // this generates a separate chunk (transfer.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "transfer" */ './views/TransferExample.vue')
    },
    {
      path: '/pdf-preview',
      name: 'pdf-preview',
      // route level code-splitting
      // this generates a separate chunk (pdf-preview.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "pdf-preview" */ './views/PdfPreviewExample.vue')
    },
    {
      path: '/dialog',
      name: 'dialog',
      // route level code-splitting
      // this generates a separate chunk (dialog.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "dialog" */ './views/DialogExample.vue')
    },
    {
      path: '/select-area',
      name: 'select-area',
      // route level code-splitting
      // this generates a separate chunk (select-area.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "select-area" */ './views/SelectAreaExample.vue')
    }
  ]
})
