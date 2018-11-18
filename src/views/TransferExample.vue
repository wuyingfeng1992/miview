<template>
  <div class="about">
    <ly-transfer v-model="value1" :data="data" filterable filter-placeholder="请输入备选项名称" :left-default-checked="[2, 3]" :right-default-checked="[1]" :titles="['来源', '目标']" :button-texts="['到左边', '到右边']" :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }">
      <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
      <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button>
      <el-button class="transfer-footer" slot="right-footer" size="small">操作</el-button>
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
      for (let i = 1; i <= 15; i++) {
        data.push({
          key: i,
          label: `备选项 ${i}`,
          disabled: i % 4 === 0
        });
      }
      return data;
    };
    return {
      data: generateData(),
      value1: [1, 4]
    };
  }
}
</script>
