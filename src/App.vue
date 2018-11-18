<template>
  <div id="app">
    <div>
      <el-button>el-button</el-button>
      <toast />
    </div>

  </div>
</template>

<script>

import Toast from '../packages/toast/index'
export default {
  name: 'App',
  components: {
    Toast
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
