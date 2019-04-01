<template>
  <div class="changepwd">
    <p>修改密码</p>
    <div class="info">
      <p>原密码
        <input type="text">
      </p>
      <p>新密码
        <input type="text">
      </p>
      <p>
        <span>确认</span>
        <span>取消</span>
      </p>
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
.changepwd {
  background: #ffffff;
  width: 100%;
  padding: 40px 80px 0 80px;
  p {
    color: #262A2F;
    font-size: 30px;
    text-align: left;
    margin-bottom: 64px;
  }
  .info {
    p {
      color: #262A2F;
      font-size: 18px;
      margin-bottom: 30px;
      input {
        border: 1px solid #B5B5B5;
        height: 30px;
        width: 300px;
        margin-left: 20px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      span {
        width: 140px;
        height: 40px;
        font-size: 16px;
        display: inline-block;
        text-align: center;
        line-height: 40px;
      }
      span:nth-child(1) {
        background: #F80000;
        color: #ffffff;
      }
      span:nth-child(2) {
        border: 1px solid #BFBFBF;
        color: #4A4A4A;
        margin-left: 20px;
      }
    }
  }
}
</style>
