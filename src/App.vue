<template>
  <div id="app">
    <div class="page">
      <router-link to="/toast" class="btn">toast</router-link>
      <router-link to="/table" class="btn">table</router-link>
      <router-view class="main"></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss" scoped>
.page {
  .btn {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    margin: 10px;
    padding: 0 10px;
    text-align: center;
    background-color: lightblue;
    color: #fff;
    font-size: 28px;
    text-decoration: none;
  }
  .main {
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
    border-top: 1px dashed lightcoral;
  }
}
</style>
