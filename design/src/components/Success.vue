<template>
  <div class="success">
    <h2 class="container">支付成功<span></span></h2>
    <div class="info">
      <i class="el-icon-success"></i>
      <p>支付成功</p>
      <p>5s之后返回首页</p>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goHome () {
      this.$router.push({
        path: '/'
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.goHome()
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
.success {
  padding-top: 90px;
  h2 {
    font-size: 36px;
    color: #4a4a4a;
    text-align: left;
    font-family: "PingFang-SC-Bold";
    margin-bottom: 26px;
    position: relative;
    span {
      position: absolute;
      left: 0;
      bottom: -30px;
      display: block;
      width: 150px;
      height: 4px;
      background: #ff0000;
    }
  }
  div {
    padding: 200px 0;
    i {
      font-size: 100px;
      color: green;
    }
    p {
      line-height: 54px;
      font-size: 24px;
    }
  }
}
</style>
