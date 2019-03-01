<template>
  <div class="i_title">
    <h2>{{ title }}</h2>
    <p>{{ detail }}</p>
    <span></span>
    <i class="el-icon-star-on"></i>
    <p>{{ sum }}</p>
  </div>
</template>

<script>
export default {
  name: 'ITitle',
  props: ['title', 'detail', 'sum']
}
</script>

<style lang="scss" scoped>
.i_title {
  position: relative;
  h2 {
    padding-top: 50px;
    font-size: 30px;
    font-weight: 700;
  }
  p {
    padding: 10px 0;
  }
  span {
    display: block;
    width: 330px;
    height: 2px;
    background: #cf4248;
    margin: 0 auto;
  }
  .el-icon-star-on {
    color: #cf4248;
    position: absolute;
    top: 108px;
    left: 50%;
    margin-left: -8px;
  }
}
</style>
