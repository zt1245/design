<template>
  <div class="payment">
    <h2 class="container">支付订单</h2>
    <div class="info container">
      <i></i>
      <div class="msg">
        <p>请您及时付款，订单号：132465465</p>
        <p>收款方：深圳市紫火科技有限公司</p>
      </div>
      <p class="price">订单金额：<span>￥1010.00</span></p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.payment {
  padding-top: 90px;
  h2 {
    font-size: 36px;
    color: #4a4a4a;
    text-align: left;
    font-family: 'PingFang-SC-Bold';
    margin-bottom: 26px;
  }
  .info {
    border-top: 1px solid #E8E8E8;
    border-bottom: 1px solid #E8E8E8;
    padding: 54px 123px 40px 84px;
    position: relative;
    display: flex;
    i {
      position: absolute;
      left: 0;
      top: -2px;
      display: block;
      width: 150px;
      height: 4px;
      background: #FF0000;
    }
    .msg {
      p {
        text-align: left;
        color: #4A4A4A;
        font-size: 16px;
      }
      p:nth-child(1) {
        margin-bottom: 25px;
      }
    }
    .price {
      margin-left: 40%;
      font-size: 18px;
      margin-top: 20px;
      span {
        color: #F80000;
        font-weight: bold;
      }
    }
  }
}
</style>
