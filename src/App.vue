<template>
  <div id="app">
    <IHeader></IHeader>
    <router-view/>
  </div>
</template>

<script>
import IHeader from '@/views/public/I-Header.vue'
export default {
  name: 'App',
  components: {
    IHeader
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
  background: url(../static/images/bg.jpg) no-repeat;
  background-size: cover;
}
</style>
