<template>
  <div id="app">
    <div class="page">
      <router-link
        to="/toast"
        class="btn"
      >toast</router-link>
      <router-link
        to="/table"
        class="btn"
      >table</router-link>
      <router-link
        to="/transfer"
        class="btn"
      >transfer</router-link>
      <!-- <router-link
        to="/pdf-preview"
        class="btn"
      >pdf-preview</router-link> -->
      <router-link
        to="/dialog"
        class="btn"
      >dialog</router-link>
      <router-link
        to="/select-area"
        class="btn"
      >select-area</router-link>
      <router-link
        to="/tree-select"
        class="btn"
      >tree-select</router-link>
      <router-link
        to="/select"
        class="btn"
      >select</router-link>
      <router-link
        to="/simple-img-preview"
        class="btn"
      >simple-img-preview</router-link>
      <router-link
        to="/paste-select"
        class="btn"
      >paste-select</router-link>
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
