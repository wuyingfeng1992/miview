<template>
  <div class="select-area-wrap">
    <el-select v-model="curProvinceCode" filterable :placeholder="placeholders[0] ? placeholders[0]: '请选择'">
      <el-option v-for="(val,  key) in provinces" :key="key" :label="val" :value="key"></el-option>
    </el-select>
    <el-select v-if="level >= 1" v-model="curCityCode" filterable :placeholder="placeholders[1] ? placeholders[1]: '请选择'">
      <el-option v-for="(val, key) in citys" :key="key" :label="val" :value="key"></el-option>
    </el-select>
    <el-select v-if="level >= 2" v-model="curAreaCode" filterable :placeholder="placeholders[2] ? placeholders[2]: '请选择'">
      <el-option v-for="(val, key) in areas" :key="key" :label="val" :value="key"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'select-area',
  props: {
    value: { // 默认值
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'code', // code=返回行政区域代码，text-返回文本, all-返回code和text
      validator: val => ['all', 'code', 'text'].includes(val)
    },
    placeholders: {
      type: Array,
      default: () => []
    },
    level: {
      type: Number,
      default: 1, // 0 - 一级联动, 1 - 二级联动, 2 - 三级联动
      validator: val => [0, 1, 2].includes(val)
    },
    size: {
      type: String,
      default: 'medium',
      validator: (val) => ['small', 'medium', 'large'].includes(val)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    },
    disableLinkage: {
      type: Boolean,
      default: false
    }
  },
  data () {
    if (!this.data || !this.data['86']) {
      throw new Error('[select-area]: 需要提供地区数据，格式参考见：https://github.com/dwqs/area-data');
    }
    return {
      // 区域数据
      provinces: this.data['86'],
      citys: {},
      areas: {},

      curProvince: '', // text
      curProvinceCode: '', // code
      curCity: '',
      curCityCode: '',
      curArea: '',
      curAreaCode: '',

      // 设置默认值的判断
      defaults: [],
      isCode: false,
      isSetDefault: false
    }
  },
  watch: {
    curProvinceCode (val, oldVal) {
      this.curProvince = this.provinces[val]
      this.provinceChange(val, oldVal === val)
    },
    curCityCode (val, oldVal) {
      this.curCity = this.citys[val]
      this.cityChange(val, oldVal === val)
    },
    curAreaCode (val, oldVal) {
      this.curArea = this.areas[val]
      this.areaChange(val, oldVal === val)
    },
    value (val) {
      if (!this.isSetDefault && Array.isArray(val) && val.length === this.level + 1) {
        this.beforeSetDefault()
        this.setDefaultValue()
      }

      if (!this.isSetDefault && Array.isArray(val) && val.length && val.length !== this.level + 1) {
        this.$message.warning('设置的默认值和 level 值不匹配')
      }
    }
  },
  methods: {
    provinceChange () { },
    cityChange () { },
    areaChange () { }
  }
}
</script>

<style>

</style>
