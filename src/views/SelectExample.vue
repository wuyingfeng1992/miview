<template>
  <div class="i-select-demo">
    <i-select
      :options="options"
      custom
      multiple
      filterable
      remote
      :reserve-keyword="true"
      :loading="loading"
      @visible-change="handleVisibleChange"
      @change="handleChangeSelect"
      @remote-method="remoteMethod"
    />
  </div>
</template>

<script>
import ISelect from '../../packages/select/index'
export default {
  components: {
    ISelect
  },
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      selectedValue: ['选项2', '选项3'],
      loading: false,
      list: [],
      states: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming']
    }
  },
  mounted () {
    this.list = this.states.map(item => {
      return { value: item, label: item }
    })
  },
  methods: {
    handleChangeSelect (val) {
      console.log('changeSelect: ', val)
    },
    handleVisibleChange (visible) { // 更改select下拉框的状态(展开/收起)
      console.log('handleVisibleChange: ', visible)
    },
    remoteMethod (query) {
      if (query !== '') {
        console.log('1111');

        this.loading = true
        setTimeout(() => {
          this.loading = false
          this.options = this.list.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style>
</style>
