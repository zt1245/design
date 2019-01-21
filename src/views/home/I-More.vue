<template>
  <div class="more">
    <ul>
      <li>
        <i class="iconfont icon-guozhigaojiaobei"></i>
        <p>果汁</p>
        <span>查看更多</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'IMore'
}
</script>

<style lang="scss" scoped>
.more {
  background: url(../../../static/images/banner03.png);
  width: 100%;
  padding: 20px;
  ul {
    li {
      font-size: 16px;
      color: #ffffff;
      i {
        font-size: 70px;
        display: block;
      }
      p {
        margin: 20px 0;
      }
      span {
        padding: 10px 20px;
        border: 1px solid #ffffff;
        border-radius: 2px;
      }
    }
  }
}
</style>
