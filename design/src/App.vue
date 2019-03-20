<template>
  <div id="app">
    <IHeader></IHeader>
    <router-view/>
    <IFooter></IFooter>
  </div>
</template>

<script>
import IHeader from '@/views/public/I-Header.vue'
import IFooter from '@/views/public/I-Footer.vue'
export default {
  name: 'App',
  components: {
    IHeader,
    IFooter
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
.el-loading-spinner {
  position: fixed !important;
}
</style>
