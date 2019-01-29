import Vue from 'vue'
import Main from './main.vue'

// let LoadingBarConstructor = Vue.extend(Main)

Main.newInstance = options => {
  if (Vue.prototype.$isServer) return
  options = options || {}

  // const data = {}
  // const propsData = {}

  // const instance = new LoadingBarConstructor({
  //   data: {}, // data
  //   propsData: options // props
  // })

  const instance = new Vue({
    data: options,
    render (h) {
      return h(Main, {
        props: options
      })
    }
  })

  const component = instance.$mount()
  document.body.appendChild(component.$el)
  const loading_bar = instance.$children[0]

  return {
    update (options = {}) {
      if ('percent' in options) {
        loading_bar.percent = options.percent
      }
      if (options.status) {
        loading_bar.status = options.status
      }
      if ('show' in options) {
        loading_bar.show = options.show
      }
    },
    component: loading_bar,
    destroy () {
      document.body.removeChild(document.getElementsByClassName('mi-loading-bar')[0])
    }
  }
}

let loadingBarInstance
let color = 'primary'
let failedColor = 'error'
let height = 2
let timer

function getLoadingBarInstance () {
  loadingBarInstance =
    loadingBarInstance ||
    Main.newInstance({
      color,
      failedColor,
      height
    })

  return loadingBarInstance
}

function update (options) {
  let instance = getLoadingBarInstance()
  instance.update(options)
}

function hide () {
  setTimeout(() => {
    update({
      show: false
    })
    setTimeout(() => {
      update({
        percent: 0
      })
    }, 200)
  }, 800)
}

function clearTimer () {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

export default {
  // component: getLoadingBarInstance().component,
  component: Main, // 导出组件
  start () {
    if (timer) return

    let percent = 0

    update({
      percent,
      status: 'success',
      show: true
    })

    timer = setInterval(() => {
      percent += Math.floor(Math.random() * 3 + 1)
      if (percent > 95) {
        clearTimer()
      }
      update({
        percent,
        status: 'success',
        show: true
      })
    }, 200)
  },
  update (percent) {
    clearTimer()
    update({
      percent,
      status: 'success',
      show: true
    })
  },
  finish () {
    clearTimer()
    update({
      percent: 100,
      status: 'success',
      show: true
    })
    hide()
  },
  error () {
    clearTimer()
    update({
      percent: 100,
      status: 'error',
      show: true
    })
    hide()
  },
  config (options) {
    if (options.color) {
      color = options.color
    }
    if (options.failedColor) {
      failedColor = options.failedColor
    }
    if (options.height) {
      height = options.height
    }
  },
  destroy () {
    clearTimer()
    let instance = getLoadingBarInstance()
    loadingBarInstance = null
    instance.destroy()
  }
}
