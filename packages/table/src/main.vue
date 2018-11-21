<template>
  <div class="i-table">
    <header class="header" v-if="table.title">
      <h3 v-if="table.title" class="single-text-overflow">
        {{ table.title }}
      </h3>
      <nav class="toolbar">
        <template v-for="(tool, idx)in toolbar">
          <el-tooltip :key="idx" :disabled="!tool.tooltip" :content="
        tool.tooltip" placement="top">
            <el-button :type="idx === 0 ? 'primary': ''">
              <i :class="tool.icon"></i>
              {{tool.text}}
            </el-button>
          </el-tooltip>
        </template>
      </nav>
    </header>

    <main ref="table">
      <slot name="info"></slot>
      <slot name="table" :clone="clone" :data="table.data" :columns="columns" :disable="table.disable || false" :loading="loading" :loaded="!loading" :getData="getData" :error="error" :dictList="display.dictList" :dateList="display.dateList" :formatter="formatter">
        <p>暂无数据</p>
      </slot>
    </main>

    <footer class="footer" v-if="table.showPagebar" v-show="clone.length">
      <span class="single-text-overflow">{{ table ? (table.total || 0) : 0 }}条数据，
        共{{ table ? (table.info ? (table.info.totalPage || 0) : 0) : 0 }}页</span>
      <el-pagination ref="page" layout="sizes, prev, pager, next, jumper" :total="table.total || 0" :current-page="pageIndex" :page-size="pageSize" :page-sizes="pageSizes" background @size-change="pageSizeChangeHandler" @current-change="pageIndexChangeHandler"></el-pagination>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    fixHeader: {
      type: Boolean,
      default: true
    },
    fixHeight: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      headerDOM: null,
      tableDOM: null,
      format: {
        dict: this.dictFormatter,
        date: this.dateFormatter,
        mixin: this.mixinFormatter
      },
      editable: this.table.editable || false,
      loading: true,
      currentRow: null,

      // columns
      columns: [],
      treeColumns: [],
      rootColumns: {},
      parentColumns: {},
      dataColumns: {},
      headerColumns: {},

      init: [],
      clone: [],
      count: 0,
      initCount: 0,

      display: {
        dictList: {},
        dateList: {},
        mixinList: {}
      },

      // 分页信息
      pageIndex: this._getPageInfo('pageIndex') || 1,
      pageSize: this._getPageInfo('pageSize') || (window.innerHeight >= 660 ? 10 : 8),
      pageSizes: window.innerHeight >= 660 ? this.$$.table.pageSizes : this.$$.table.smallPageSizes,

      pageTimer: null, // 定时器
      error: {},
      global: {}
    }
  },
  created () { },
  mounted () { },
  methods: {
    /** 防抖 */
    _debounce (fn, later = 0) {
      if (this.pageTimer) {
        clearTimeout(this.pageTimer)
      }
      this.pageTimer = setTimeout(fn, later)
    },

    /**
     * 在多级表格中，构建唯一 prop
     */
    _columnsKeyMap ({ key, prefix, root }) {
      if (root) {
        return prefix ? prefix + '--' + root + '_' : root + '_'
      } else {
        return prefix ? prefix + '--' + key : key
      }
    },

    /**
     * 扁平化数据，用于斗鸡表格下的渲染
     */
    _flattenData (type, data = []) {
      return data ? this.table.multiple ? data.map(row => this._$flattenData(type, row)) : data : []
    },

    /**
     * 递归扁平每一个节点树
     */
    _$flattenData (type, row = {}, prefix = '') {
      return Object.entries(row).reduce((ret, [key, val]) => {
        const root = this[type + 'Columns'][key]
        key = this._columnsKeyMap({ key, prefix, root })

        if (!root) {
          return Object.assign(ret, { [key]: val })
        }

        const rootKey = key.substr(0, key.length - 1)

        if (Array.isArray(val)) {
          this.rootColumns[rootKey] = this.rootColumns[rootKey] ? Math.max(val.length, this.rootColumns[rootKey]) : val.length

          val.map((col, idx) => (ret = Object.assign(ret, {
            ...this._$flattenData(type, col, key + idx)
          })))
        } else if (typeof val === 'object') {
          Object.entries(val).map(([key, val]) => {
            ret[rootKey + '--' + key] = col
          })
        }

        return ret
      }, {})
    },

    _$unFlattenData (row = {}) {

    },

    _initTable () { },

    /**
     * 初始化数据
     */
    _initData (data = this.table.data) {
      data && (this.init = this._flattenData('data', data))
      this.initCount = this.init.length
    },
    _cloneData () { },
    _initHeader () { },
    _initColumns () { },
    _initPage () { },
    _loadedHandler () { },

    /**
     * 设置分页信息
     */
    _setPageInfo ({ pageIndex, pageSize } = {}) {
      pageIndex && (this.pageIndex = pageIndex)
      pageSize && (this.pageSize = pageSize)
    },

    _getPageInfo () { },

    /**
     * 更改pageIndex的回调函数
     */
    pageIndexChangeHandler (pageIndex) {
      const search = this.table.search || {}

      this.loading = true
      this._setPageInfo({ pageIndex })

      this._debounce(() => {
        this.$emit('pageIndexChange', {
          ...search,
          pageIndex,
          pageSize: this.pageSize
        })
      })
    },
    /**
     * 更改pageSize的回调函数
     */
    pageSizeChangeHandler (pageSize) {
      const search = this.table.search || {}

      this.loading = true
      this._setPageInfo({ pageIndex: 1, pageSize })

      this._debounce(() => {
        this.$emit('pageSizeChange', {
          ...search,
          pageIndex: 1,
          pageSize
        })
      })
    }

  }
}
</script>

<style>

</style>
