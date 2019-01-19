<template>
  <div class="toast-example">
    <!-- <toast /> -->
    <el-row>
      <el-col :span="6">
        <div class="select-box">
          <el-select
            popper-class="select-box-popover"
            v-model="value"
            multiple
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import Toast from '../../packages/toast/index'

export default {
  name: 'ToastExample',
  // components: {
  //   Toast
  // },
  data () {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: []
    }
  }
}
</script>
