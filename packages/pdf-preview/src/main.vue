<template>
  <div
    ref="pdf"
    class="pdf-wrapper"
  ></div>
</template>

<script>
/**
 * 描述：预览pdf格式文件的组件
 * 属性：url：pdf文件的路径
 * 使用：<i-pdf :url=""></i-pdf>
 * 参考：https://github.com/mikecousins/react-pdf-js
 */
import PdfObj from 'pdfobject'

export default {
  name: 'MPdfPreview',
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      options: {
        pdfOpenParams: {
          // navpanes: 0,
          // toolbar: 0,
          // statusbar: 0,
          // pagemode: 'thumbs',
          // view: 'FitV'
        }
      }
    }
  },
  mounted () {
    this.showPdf()
  },
  methods: {
    showPdf () {
      PdfObj.embed(this.url, this.$refs.pdf, this.options)
    }
  }
}
</script>

<style lang="scss" scoped>
.pdf-wrapper {
  &.pdfobject-container {
    width: 100%;
    height: 100%;
    margin: auto;
  }
}
</style>
