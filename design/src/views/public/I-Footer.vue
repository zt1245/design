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
            :key="index"
            @click="turn(index)">{{ item }}</li>
        </ul>
        <p>订购专线：xxx xxx xxxx（服务时间 08:00–22:00）</p>
        <p>客服电话：xxx-xxxxxxxx | zt1245@aliyun.com（邮箱）</p>
        <p>当日蛋糕配送截止下单时间：11.00 配送地区：江西省章贡区（其他地方暂时无法配送，请勿下单）</p>
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
      footList: ['首页', '蛋糕', '果汁', '冰淇淋', '甜甜圈', '新闻资讯', '关于我们']
    }
  },
  methods: {
    turn (index) {
      if (index === 0) {
        this.$router.push({
          path: '/'
        })
      } else if (index === 1) {
        window.location.reload()
        this.$router.push({
          name: 'Category',
          params: {
            type: 'cake'
          }
        })
      } else if (index === 2) {
        window.location.reload()
        this.$router.push({
          name: 'Category',
          params: {
            type: 'drink'
          }
        })
      } else if (index === 3) {
        window.location.reload()
        this.$router.push({
          name: 'Category',
          params: {
            type: 'ice'
          }
        })
      } else if (index === 4) {
        window.location.reload()
        this.$touter.push({
          name: 'Category',
          params: {
            type: 'sweet'
          }
        })
      } else if (index === 5) {
        this.$router.push({
          path: '/news'
        })
      } else if (index === 6) {
        this.$router.push({
          path: '/about'
        })
      }
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
        cursor: pointer;
      }
      li:last-child {
        border: none;
        padding-right: 0;
      }
      li:hover {
        color: #F54F4F;
      }
    }
  }
}
</style>
