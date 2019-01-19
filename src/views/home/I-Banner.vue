<template>
  <el-carousel :interval="5000" arrow="always" height="700px">
    <el-carousel-item>
      <img src="../../../static/images/banner01.png" alt="">
    </el-carousel-item>
    <el-carousel-item>
      <img src="../../../static/images/banner02.png" alt="">
    </el-carousel-item>
    <el-carousel-item>
      <img src="../../../static/images/banner03.png" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: 'IBanner'
}
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}
</style>
