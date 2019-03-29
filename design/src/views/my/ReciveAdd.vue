<template>
  <div class="reciveadd">
    <p>收货地址</p>
    <ul>
      <li>
        <i>+</i>
        <p>添加新地址</p>
      </li>
      <li>
        
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.reciveadd {
  background: #ffffff;
  width: 100%;
  padding: 40px 80px 0 80px;
  p {
    color: #262A2F;
    font-size: 30px;
    text-align: left;
    margin-bottom: 64px;
  }
  ul {
    display: flex;
    li {
      width: 33%;
      border: 1px solid #DCDCDC;
      margin-right: 16px;
    }
    li:nth-child(1) {
      i {
        width: 42px;
        height: 42px;
        background: #DCDCDC;
        border-radius: 50%;
        display: block;
        font-size: 36px;
        color: #ffffff;
        line-height: 36px;
        margin: 65px auto 14px;
      }
      p {
        font-size: 14px;
        color: #4A4A4A;
        text-align: center;
      }
    }
  }
}
</style>
