/* eslint-disable */
const version = require('../../package.json').version

module.exports = {
  'zh-CN': {
    header: {
      logo: {
        image: 'https://img.yzcdn.cn/public_files/2017/12/18/fd78cf6bb5d12e2a119d0576bedfd230.png',
        title: 'mview',
        version,
        href: '#/'
      },
      nav: {
        'Vue 组件': 'https://github.com/ly2011/mview',
        lang: {
          text: 'En',
          from: 'zh-CN',
          to: 'en-US'
        },
        github: 'https://github.com/ly2011/mview'
      }
    },
    nav: [
      {
        name: '开发指南',
        groups: [
          {
            list: [
              {
                path: '/intro',
                title: '介绍'
              },
              { path: '/install', title: '安装' },
              {
                path: '/quickstart',
                title: '快速上手'
              },
              // {
              //   path: '/demo',
              //   title: '示例页面'
              // },
              {
                name: 'index',
                path: '/',
                type: 'pages'
              }
            ]
          }
        ]
      },
      {
        name: '组件',
        showInMobile: true,
        groups: [
          {
            groupName: '基础组件',
            list: [
              {
                path: '/dialog',
                title: 'Dialog 弹框'
              },
              {
                path: '/BackToTop',
                title: 'BackTop 回到顶部'
              }
            ]
          },
          {
            groupName: '表单组件',
            list: [
              { path: '/paste-select', title: 'PasteSelect 多行文本复制粘贴' },
              { path: '/select', title: 'Select 选择器' },
              {
                path: '/uploader',
                title: 'Uploader 图片上传'
              }
            ]
          },
          {
            groupName: '反馈组件',
            list: [
              {
                path: '/loading',
                title: 'Loading 加载'
              }
            ]
          },
          {
            groupName: '展示组件',
            list: [
              {
                path: '/simple-img-preview',
                title: 'SimpleImgPreview 图片预览'
              },
              {
                path: '/table',
                title: 'Table 表格'
              }
            ]
          },
          {
            groupName: '导航组件',
            list: [
              {
                path: '/tree-select',
                title: 'TreeSelect 分类选择'
              }
            ]
          },
          {
            groupName: '业务组件',
            list: [
              {
                path: '/area',
                title: 'Area 省市区选择'
              }
            ]
          }
        ]
      }
    ]
  }
}
