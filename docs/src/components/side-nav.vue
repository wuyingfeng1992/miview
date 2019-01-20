<style lang="scss">
.side-nav {
  display: inline-block;
  margin: 32px 0;
  padding: 0;
  color: #3f536e;
  background-color: #fff;
  z-index: 99;
  .group-container {
    margin-bottom: 32px;
  }
  .side-nav-title {
    padding: 0 24px 8px;
    color: #8dabc4;
    font-size: 12px;
    font-weight: bold;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .side-nav-items {
    font-size: 14px;
    font-weight: normal;
    line-height: 1.8;
    a {
      display: block;
      position: relative;
      padding: 8px 24px;
      color: #3f536e;
      font-weight: normal;
      line-height: 1.5;
      cursor: pointer;
    }
    .side-nav-group {
      display: block;
      position: relative;
      padding: 6px 0 6px 24px;
      color: #2c405a;
      font-weight: bold;
    }
    .slid-nav-component {
      display: block;
      position: relative;
      padding: 6px 24px 6px 32px;
      color: #616367;
      font-size: 14px;
    }
    .active {
      color: #3faaf5;
    }
  }
}
</style>
<template>
  <div class="side-nav">
    <div
      v-for="nav in data"
      class="group-container"
      :key="nav.name"
    >
      <p class="side-nav-title">{{nav.name}}</p>
      <div
        class="side-nav-items"
        v-for="navGroup in nav.groups"
        :key="navGroup.name || navGroup.groupName"
      >
        <router-link
          :class="$route.name === navGroup.name || $route.name === navGroup.groupName ? 'active' : ''"
          v-if="navGroup.path"
          :to="{path: base + navGroup.path}"
        >{{navGroup.name || navGroup.groupName}}</router-link>
        <p
          v-else
          class="side-nav-group"
        >{{navGroup.name || navGroup.groupName}}</p>
        <div
          v-for="(item, index) in navGroup.list"
          :key="index"
        >
          <router-link
            v-if="item.title"
            :to="{path: base + item.path}"
            :class="$route.path === base + item.path ? 'active' : ''"
            class="slid-nav-component"
          >{{item.title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import navConf from '../nav.config.json'
import navConf from '../doc.config.js'
export default {
  data () {
    return {
      data: navConf[this.$vantLang].nav
    }
  },
  computed: {
    base () {
      return `/${this.$vantLang}`;
    }
  }
}
</script>
