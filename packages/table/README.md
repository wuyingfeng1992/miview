# 表格组件

## 安装依赖

```bash
lerna add @element-ui-extends/webpack-build-scripts --scope=@element-ui-extends/table
```

## 参数

```js
@param:
	tableData: 表格数据列表
	tableKey: 表格对应名称和关键字
	isExpand: 是否显示展开行(true or false)
	isExpandOne: 展开行是否只显示一行(true of false)
	isSelect: 是否显示勾选框(true or false)
	isIndex: 是否显示索引列(true or false)
	fixedHeight: 固定高度
	pagination: 表格分页信息
	@sub param
		operate: 是否使用template模板(true or false)
		name: 对应列名
		value: 对应列的关键字
		width: 宽度
		minWidth: 最小宽度
		fixed: 是否固定列(left or right)
		sortable: 是否启用排序(true or false or 'custom'=>服务器排序)
		renderHeader: 定制表头
@method:
	cellClick: 表格点击
	sortChange: 排序
	selectionChange: 勾选变化
	handleExpandRow: 展开行
@example
<sl-table :tableData="tableData" :tableKey="tableKey">
	<template slot="option" slot-scope="scope">
		<el-button size="small" type="text" @click="handleRowEdit(scope.$index,scope.row)">编辑</el-button>
	</template>
</sl-table>
tableKey: [{
	operate:false,
	name: 'ID',
	value: 'Id'
},{
	operate: false,
	name: '名称',
	value: 'name'
},{
	operate: false,
	name: '排序',
	value: 'sort'
},{
	operate: true,
	name: '操作',
	value: 'option'
}]
```