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
    data: { // 所有城市的数据
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
  created () {
    if (Array.isArray(this.value) && this.value.length === this.level + 1) {
      this.beforeSetDefault()
      this.setDefaultValue()
    }

    if (Array.isArray(this.value) && this.value.length && this.value.length !== this.level + 1) {
      this.$message.warning('设置的默认值和 level 值不匹配')
    }
  },
  methods: {
    provinceChange (val, isEqual) {
      if (this.level === 0) {
        this.selectChange()
      } else if (this.level >= 1) {
        this.citys = this.data[val]
        if (!this.citys) {
          this.citys = {
            [this.curProvinceCode]: this.curProvince
          }
          if (!this.disableLinkage) {
            this.curCity = this.curProvince
            this.curCityCode = this.curCityCode
          }
          return
        }

        let curCity = Object.values(this.citys)[0]
        let curCityCode = Object.keys(this.citys)[0]

        // if (this.defaults[1]) {

        // }

        if (!this.disableLinkage) {
          this.curCity = curCity
          this.curCityCode = curCityCode
        } else if (!isEqual) {
          this.curCity = ''
          this.curCityCode = ''
          this.curArea = ''
          this.curAreaCode = ''
          this.selectChange()
        }
      }
    },
    cityChange (val, isEqual) {
      if (this.level === 1) {
        this.selectChange()
      } else if (this.level >= 2) {
        this.areas = this.data[val]

        let curArea = Object.values(this.areas)[0]
        let curAreaCode = Object.keys(this.areas)[0]

        if (!this.disableLinkage) {
          this.curArea = curArea
          this.curAreaCode = curAreaCode
        } else if (!isEqual) {
          this.curArea = ''
          this.curAreaCode = ''
          this.selectChange()
        }
      }
    },
    areaChange (val) {
      this.curAreaCode = val
      this.selectChange()
    },
    getAreaCode () {
      const codesMap = {
        0: [this.curProvinceCode],
        1: [this.curProvinceCode, this.curProvinceCode === '710000' ? this.curProvinceCode : this.curCityCode],
        // fix #32 710000是台湾省
        2: [this.curProvinceCode, this.curProvinceCode === '710000' ? this.curProvinceCode : this.curCityCode, this.curAreaCode]
      }
      const codes = codesMap[this.level]
      return codes
    },
    getAreaText () {
      const textsMap = {
        0: [this.curProvince],
        // fix #32 710000是台湾省
        1: [this.curProvince, this.curProvinceCode === '710000' ? this.curProvince : this.curCity],
        2: [this.curProvince, this.curProvinceCode === '710000' ? this.curProvince : this.curCity, this.curArea]
      }
      const texts = textsMap[this.level]
      return texts
    },
    getAreaCodeAndText () {
      const cityCode = this.curProvinceCode === '710000' ? this.curProvinceCode : this.curCityCode;
      const cityText = this.curProvinceCode === '710000' ? this.curProvince : this.curCity;
      const textCodesMap = {
        0: [{ [this.curProvinceCode]: this.curProvince }],
        1: [{ [this.curProvinceCode]: this.curProvinceCode }, { [cityCode]: cityText }],
        2: [{ [this.curProvinceCode]: this.curProvince }, { [cityCode]: cityText }, {
          [this.curAreaCode]: this.curArea
        }]
      }

      const textCodes = textCodesMap[this.level]
      return textCodes
    },
    // 选择数据
    selectChange () {
      this.isSetDefault = true
      const areaMap = {
        code: this.getAreaCode(),
        text: this.getAreaText(),
        all: this.getAreaCodeAndText()
      }
      const res = areaMap[this.type]
      this.$emit('input', res)
      this.$emit('change', res)
    },
    beforeSetDefault () {
      // 映射默认值，避免直接更改props
      this.defaults = [].concat(this.value)
      this.isCode = true
      this.isSetDefault = true
    },
    setDefaultValue () {
      let provinceCode = ''
      if (this.isCode) {
        provinceCode = this.defaults[0]
      }
      this.curProvinceCode = provinceCode
      // 还原默认值，避免用户选择出错
      this.$nextTick(() => {
        this.defaults = []
        this.isSetDefault = false
      })
    }
  }
}
</script>

<style>

</style>
