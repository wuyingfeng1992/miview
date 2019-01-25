import Vue from 'vue'
import docConfig from './doc.config'
// import DemoList from './components/DemoList'
import componentDocs from './docs-entry'
// import componentDemos from './demo-entry'
import DemoPages from './components/DemoPages'
// import './utils/iframe-router'

const componentDemos = []

const registerRoute = isDemo => {
  const route = [
    {
      path: '*',
      redirect: () => `/${Vue.prototype.$vantLang}/`
    }
  ]

  Object.keys(docConfig).forEach(lang => {
    if (isDemo) {
      route.push({
        path: `/${lang}`,
        component: DemoList,
        meta: { lang }
      })
    } else {
      route.push({
        path: `/${lang}`,
        redirect: `/${lang}/intro`
      })
    }

    function addRoute (page, lang) {
      let { path, type, name } = page
      if (path) {
        path = path.replace('/', '')

        let component
        if (path === 'demo') {
          component = DemoPages
        } else if (type === 'pages') {
          component = () => import(`./pages/${name}.vue`)
        } else {
          component = isDemo ? componentDemos[path] : componentDocs[`${path}.${lang}`]
        }

        if (!component) {
          return
        }
        if (type === 'pages') {
          route.push({
            name: name,
            component,
            path: path,
            meta: {
              lang,
              path,
              title: page.title
            }
          })
        } else {
          route.push({
            name: lang + '/' + path,
            component,
            path: `/${lang}/${path}`,
            meta: {
              lang,
              path,
              title: page.title
            }
          })
        }
      }
    }

    const navs = docConfig[lang].nav || []
    navs.forEach(nav => {
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(page => addRoute(page, lang))
        })
      } else {
        addRoute(nav, lang)
      }
    })
  })

  return route
}

export default registerRoute
