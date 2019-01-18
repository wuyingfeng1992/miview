<template>
  <div class="img-preview">
    <el-button
      type="primary"
      @click="handlePreview"
    >预览图片</el-button>
    <simple-img-preview
      :visible.sync="previewVisible"
      :previewUrl="previewUrl"
    >
      <!-- <img
        :src="previewUrl"
        alt=""
      > -->
    </simple-img-preview>
  </div>
</template>

<script>
import SimpleImgPreview from '../../packages/simple-img-preview/index'
export default {
  components: {
    SimpleImgPreview
  },
  data () {
    return {
      previewVisible: false,
      previewUrl: 'https://img03.sogoucdn.com/app/a/200841/ea4458111b71267d6583e5fa612fc391'
    }
  },
  methods: {
    handlePreview () {
      this.previewVisible = true
      // this.previewUrl = 'https://img03.sogoucdn.com/app/a/200841/ea4458111b71267d6583e5fa612fc391'
    }
  }
}
</script>

<style>
</style>
