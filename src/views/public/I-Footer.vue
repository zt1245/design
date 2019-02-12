<template>
  <div class="ifooter">
    <div class="content">
      <p>
        <span>i</span>
        dessert
      </p>
      <ul>
        <li>首页</li>
        <li>首页</li>
        <li>首页</li>
        <li>首页</li>
        <li>首页</li>
        <li>首页</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.ifooter {
  background: #2B2B2B;
  .content {
    p {
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
      color: #ffffff
    }
  }
}
</style>
