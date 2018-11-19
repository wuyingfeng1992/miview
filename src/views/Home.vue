<template>
  <div class="home">
    Home 页面

    <div class="drag">
      <draggable element="el-checkbox-group" :list="data" class="dragArea" :component-data="getComponentData()" @end="dragEnd">
        <!-- <div class="li" :key="index" v-for="(item, index) in data">{{item.label}}</div> -->
        <!-- <el-checkbox-group v-model="checkList"> -->
        <!-- <el-button type="primary" @click="clickMe" size="small">点击我</el-button> -->
        <el-checkbox :label="item['label']" :key="item['index']" v-for="item in data">
        </el-checkbox>
        <!-- </el-checkbox-group> -->
      </draggable>
    </div>
  </div>
</template>

<script>
// 引入拖拽组件
import draggable from 'vuedraggable';

export default {
  name: 'Home',
  components: { draggable },
  data () {
    const generateData = _ => {
      const data = [];
      const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
      const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
      cities.forEach((city, index) => {
        data.push({
          id: pinyin[index],
          label: city,
          key: index,
          pinyin: pinyin[index]
        });
      });
      return data;
    };
    return {
      data: generateData(),
      checkList: [1, 3],
      list: [
        { name: "张三" },
        { name: "李四" },
        { name: "王五" }
      ],
      dragOptions: {
        animation: 0,
        // group: "description",
        // disabled: true,
        // ghostClass: "ghost"
      },
      checked: []
    }
  },
  watch: {
    checkList: {
      deep: true,
      handler (val) {
        console.log('checkList:  ', val);
      }
    }
  },
  methods: {
    clickMe () {
      console.log('点击我');
    },
    getComponentData () {
      return {
        on: {
          change: this.handleChange,
          input: this.handleChange
        },
        props: {
          value: this.checked
        }
      }
    },
    handleChange (value) {
      this.checked = value
    },
    dragEnd (event) {
      let oldIndex = event.oldIndex
      let newIndex = event.newIndex
      // this.query.length ? this._sortDragFilter(this.data, oldIndex, newIndex) : this._sortDrag(this.data, oldIndex, newIndex)
      this._sortDrag(this.data, oldIndex, newIndex)
      this.$forceUpdate()
      let data = this.data.map(item => {
        return item.key
      })
      // this.$emit('dragSort', data)
    },
    // 拖动后元素排序
    _sortDrag (arr, oldIndex, newIndex) {
      let item = arr[oldIndex]
      arr.splice(oldIndex, 1)
      arr.splice(newIndex, 0, item)
    }
  }
}
</script>

<style lang="scss">
.drag {
  border: 1px solid #ccc;
  height: 500px;
  width: 500px;

  .li {
    line-height: 24px;
    padding: 5px 10px;
    border-bottom: 1px solid lightblue;
  }
}
</style>
