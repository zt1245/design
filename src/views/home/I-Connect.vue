<template>
  <div class="connect container">
    <ITitle :title="title" :detail="detail" :sum="sum"></ITitle>
    <div class="connect-box">
      <ul>
        <li>
          <i class="iconfont icon-weibo"></i>
          <p>关注官方微博</p>
          <span>xxxxxx</span>
        </li>
        <li>
          <i class="iconfont icon-weixin"></i>
          <p>关注官方微信</p>
          <span>xxxxxx</span>
        </li>
        <li>
          <i class="iconfont icon-qq"></i>
          <p>在线QQ客服</p>
          <span>xxxxxx</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ITitle from '@/views/home/I-Title.vue'
export default {
  name: 'IDessert',
  components: {
    ITitle
  },
  data () {
    return {
      title: '联系我们',
      detail: 'CONTACT US',
      sum: '如有任何问题请联系我们，我们24小时竭诚为您服务'
    }
  }
}
</script>

<style lang="scss" scoped>
.connect {
  .connect-box {
    ul {
      display: flex;
      justify-content: space-around;
      padding-top: 50px;
      li {
        i {
          font-size: 40px;
          color: rgb(102, 102, 102);
        }
        p {
          font-size: 16px;
          padding: 10px 0;
        }
      }
    }
  }
}
</style>
