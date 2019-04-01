<template>
  <div class="prinfo">
    <p>个人信息</p>
    <div class="info-box">
      <img src="../../../static/images/header.png" alt="">
      <div class="info">
        <p>基础资料<span>编辑</span></p>
        <p>昵称：</p>
        <p>性别：</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.prinfo {
  background: #ffffff;
  width: 100%;
  padding: 40px 80px 0 80px;
  p {
    color: #262A2F;
    font-size: 30px;
    text-align: left;
    margin-bottom: 64px;
  }
  .info-box {
    display: flex;
    img {
      width: 104px;
      height: 104px;
    }
    .info {
      margin-left: 134px;
      p {
        color: #4A4A4A;
        font-size: 16px;
        margin-bottom: 30px;
      }
      p:nth-child(1) {
        font-size: 18px;
        color: #4A4A4A;
        font-weight: 700;
        position: relative;
        span {
          color: #F80000;
          font-size: 16px;
          position: absolute;
          top: 50%;
          width: 50px;
          margin-top: -8px;
          left: 400px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
