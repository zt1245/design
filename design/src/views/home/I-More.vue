<template>
  <div class="more">
    <ul class="container">
      <li>
        <i class="iconfont icon-guozhigaojiaobei"></i>
        <p>果汁</p>
        <span>查看更多</span>
      </li>
      <li>
        <i class="iconfont icon-guozhigaojiaobei"></i>
        <p>果汁</p>
        <span>查看更多</span>
      </li>
      <li>
        <i class="iconfont icon-guozhigaojiaobei"></i>
        <p>果汁</p>
        <span>查看更多</span>
      </li>
      <li>
        <i class="iconfont icon-guozhigaojiaobei"></i>
        <p>果汁</p>
        <span>查看更多</span>
      </li>
    </ul>
  </div>
</template>

<script>
import ITitle from '@/views/home/I-Title.vue'
export default {
  name: 'IMore',
  components: {
    ITitle
  }
}
</script>

<style lang="scss" scoped>
.more {
  width: 100%;
  background: url(../../../static/images/banner06.jpg) center;
  padding: 50px 0;
  ul {
    display: flex;
    justify-content: space-around;
    padding: 60px 0;
    li {
      font-size: 16px;
      color: rgba($color: #ffffff, $alpha: 0.8);
      i {
        font-size: 100px;
        display: block;
      }
      p {
        margin: 20px 0;
      }
      span {
        display: inline-block;
        padding: 10px 20px;
        border: 1px solid rgba($color: #ffffff, $alpha: 0.8);
        border-radius: 2px;
      }
      span:hover {
        border: 1px solid #cf4248;
        background: #cf4248;
        color: #ffffff;
      }
    }
    li:hover i {
      color: #cf4248;
      transition: .5s;
      transform: rotateY(360deg);
    }
  }
}
</style>
