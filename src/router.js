import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'

Vue.use(Router)

// function generatesRoutes (routes = []) {
//   const routesConfig = []
//   if (Array.isArray(routes)) {
//     routes.forEach(route => {
//       const item = {
//         path: `/${route}`,
//         name: route,
//         component: () => import(/* webpackChunkName: "toast" */ './views/ToastExample.vue')
//       }
//     })
//   }
// }

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'home', component: Home },
    {
      path: '/toast',
      name: 'toast',
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
      component: () => import(/* webpackChunkName: "transfer" */ './views/TransferExample.vue')
    },
    {
      path: '/pdf-preview',
      name: 'pdf-preview',
      component: () => import(/* webpackChunkName: "pdf-preview" */ './views/PdfPreviewExample.vue')
    },
    {
      path: '/dialog',
      name: 'dialog',
      component: () => import(/* webpackChunkName: "dialog" */ './views/DialogExample.vue')
    },
    {
      path: '/select-area',
      name: 'select-area',
      component: () => import(/* webpackChunkName: "select-area" */ './views/SelectAreaExample.vue')
    },
    {
      path: '/tree-select',
      name: 'tree-select',
      component: () => import(/* webpackChunkName: "tree-select" */ './views/TreeSelectExample.vue')
    },
    {
      path: '/select',
      name: 'select',
      component: () => import(/* webpackChunkName: "select" */ './views/SelectExample.vue')
    },
    {
      path: '/simple-img-preview',
      name: 'simple-img-preview',
      component: () => import(/* webpackChunkName: "select" */ './views/SimpleImgPreviewExample.vue')
    },
    {
      path: '/paste-select',
      name: 'paste-select',
      component: () => import(/* webpackChunkName: "paste-select" */ './views/PasteSelectExample.vue')
    }
  ]
})
