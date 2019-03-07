<template>
  <div class="my">
    <div class="myInfo">
      <div class="user_box container">
        <div class="portrait">
          <img src="../../static/images/user_head.jpeg" alt="">
          <div class="right">
            <p>昵称：木子</p>
            <p>手机号：1585933546</p>
            <p>收货地址：cfhufhukfsadfmahfahkh</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.my {
  padding-top: 75px;
  .myInfo {
    background: #f5f5f5;
    padding: 70px 0 20px;
    .user_box {
      background: #ffffff;
    }
    .portrait {
      padding: 50px;
      background: #ffffff;
      display: flex;
      img {
        width: 200px;
        height: 200px;
      }
      .right {
        margin-left: 50px;
        p {
          text-align: left;
          line-height: 30px;
        }
      }
    }
  }
}
</style>
