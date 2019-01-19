<template>
  <div class="i_title">
    <h2>新品上市</h2>
    <p>New products listed</p>
    <span></span>
    <i class="el-icon-star-on"></i>
    <p>理应追逐最新的，向更好、更高处进发</p>
  </div>
</template>

<script>
export default {
  name: 'ITitle'
}
</script>

<style lang="scss" scoped>
.i_title {
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
    background: #7aadb1;
    margin: 0 auto;
  }
  .el-icon-star-on {
    color: #7aadb1;
    margin-top: -10px;
  }
}
</style>
