<template>
  <div id="app">
    <li-header></li-header>
    <router-view />
    <li-footer></li-footer>
  </div>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'app',
  components: {
    'li-header': Header,
    'li-footer': Footer
  }
}
</script>

<style lang="scss">
@import "assets/layui/css/layui.css";
@import "assets/css/global.css";
@import "assets/layui/css/modules/layer/default/layer.css";
</style>
