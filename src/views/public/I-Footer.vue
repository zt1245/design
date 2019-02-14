<template>
  <div class="ifooter">
    <div class="icontent">
      <div class="content container">
        <p class="footer-sign">
          <span>i</span>
          dessert
        </p>
        <ul>
          <li v-for="(item,index) in footList"
            :key="index">{{ item }}</li>
        </ul>
        <p>订购专线：xxx xxx xxxx（服务时间 08:00–22:00）</p>
        <p>客服电话：xxx-xxxxxxxx（全国） | kefu@idessert.com（邮箱）</p>
        <p>杭州/广州：提前5小时预订；北京：提前6小时预订；上海：提前5.5-6小时预订；天津/苏州/无锡/深圳：提前8小时预订（部分偏远地区除外，当日22点以后订单，于次日8点开始审核）</p>
        <p>当日蛋糕配送截止下单时间：北京：16:50；上海：16:30；杭州/广州：13:50；天津：10:30；苏州/无锡/深圳：11:00</p>
        <p>网站注册公司名称: xxxxxxxxxxxxxxx 地址: xxxxxxxxxxxxxxxxxxxx</p>
      </div>
    </div>
    <p class="copy">Copyright© idessert蛋糕官网商城 20xx-20xx, 版权所有 xxxxxxxxx-x</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      footList: ['首页', '蛋糕', '果汁', '冰淇淋', '甜甜圈', '新闻资讯', '关于我们', '联系我们']
    }
  }
}
</script>

<style lang="scss" scoped>
.ifooter {
  background: #2B2B2B;
  .copy {
    color: #9a9a9a;
    line-height: 40px;
    font-size: 12px;
  }
  .icontent {
    padding-bottom: 10px;
    border-bottom: 1px solid #9a9a9a;
  }
  .content {
    p {
      color: #9a9a9a;
      line-height: 25px;
      font-size: 12px;
    }
    .footer-sign {
      font-size: 40px;
      padding-top: 30px;
      padding-bottom: 30px;
      color: #ffffff;
      span {
        color: #F54F4F;
      }
    }
    ul {
      display: flex;
      justify-content: space-around;
      color: #ffffff;
      padding: 0 180px;
      padding-bottom: 20px;
      li {
        border-right: 1px solid #ffffff;
        padding-right: 32px;
      }
      li:last-child {
        border: none;
        padding-right: 0;
      }
    }
  }
}
</style>
