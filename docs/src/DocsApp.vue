<template>
  <div class="app">
    <!-- <van-doc
      :base="base"
      :config="config"
      active="Vue 组件"
      :simulators="simulators"
      :current-simulator="currentSimulator"
    > -->
    <!-- <router-view /> -->
    <!-- </van-doc> -->
    <div class="main">
      <mainHeader></mainHeader>
      <div
        class="container"
        v-if="!isIndex"
      >
        <sideNav class="nav"></sideNav>
        <router-view class="view"></router-view>
      </div>
      <router-view
        class="page"
        v-else
      ></router-view>
      <mainFooter v-if="!isIndex"></mainFooter>
    </div>
  </div>
</template>

<script>
import docConfig from './doc.config';
import mainHeader from './components/header.vue'
import mainFooter from './components/footer.vue'
import sideNav from './components/side-nav.vue'
import "highlight.js/styles/color-brewer.css"
export default {
  name: 'DocsApp',
  components: {
    mainHeader,
    sideNav,
    mainFooter,
  },
  data () {
    return {
      // simulators: [`mobile.html${location.hash}`],
      demoURL: '',
      init: false,
      isIndex: true
    };
  },
  computed: {
    base () {
      return `/${this.$vantLang}`;
    },
    config () {
      return docConfig[this.$vantLang];
    },
    currentSimulator () {
      const { name } = this.$route;
      return name && name.indexOf('demo') !== -1 ? 1 : 0;
    }
  },
  watch: {
    $route () {
      console.log('routeName: ', this.$route.name);
      this.isIndex = this.$route.name === 'index'
    }
  },
  mounted () {
    //  这里模拟数据请求
    setTimeout(() => {
      this.init = true
    }, 250)
  },
  methods: {
    onChangeDemoURL (url) {
      // this.simulators = [this.simulators[0], url];
    }
  }
};
</script>

<style lang="scss">
@import "./styles/index.scss";
.van-doc-intro {
  padding-top: 40px;
  text-align: center;
  font-family: "Dosis", "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  &__youzan {
    width: 32px;
    height: 32px;
    display: block;
    margin: 25px 0 0;
  }
  &__logo {
    width: 120px;
    height: 120px;
  }
  h2 {
    font-size: 36px;
    line-height: 60px;
    font-weight: normal;
  }
  p {
    font-size: 15px;
    color: #455a64;
  }
}
</style>
