<template>
  <div class="transfer-wrapper">
    <ly-transfer v-model="selectedCourseId" :data="data" filterable filter-placeholder="请输入城市拼音" :titles="['未选科目', '已选科目']" :button-texts="['到左边', '到右边']" :render-content="renderFunc" :isRightDraggable="true" width="380px">
      <!-- <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span> -->
      <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button> -->
      <!-- <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button> -->
    </ly-transfer>
  </div>
</template>
<script>
import Transfer from '../../packages/transfer/index'

export default {
  name: 'TransferExample',
  components: {
    LyTransfer: Transfer
  },
  data () {
    const generateData = _ => {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      data: generateData(),
      selectedCourseId: [1, 3, 5, 7]
    };
  },
  watch: {
    selectedCourseId: {
      handler (val) {
        console.log('selectedCourseId: ', val)
      }
    }
  },
  methods: {
    renderFunc (h, option) {
      return (
        <div>
          <div style="float:left">{option.label}</div>
          <div style="float:right;padding-right: 10px;">{option.pinyin}</div>
        </div>
      )
    }
  }
}
</script>
