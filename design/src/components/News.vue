<template>
  <div class="news">
    <img src="http://localhost:8081/static/images/newban.png" class="ban">
    <div class="newsmenu">
      <IMenu></IMenu>
    </div>
  </div>
</template>

<script>
import IMenu from '@/views/news/I-Menu.vue'
export default {
  data () {
    return {
      barNum: 0
    }
  },
  components: {
    IMenu
  }
}
</script>

<style lang="scss" scoped>
.news {
  .ban {
    width: 100%;
  }
  .newsmenu {
    .new_nav {
      margin-bottom: 10px;
      box-shadow: 0 2px 2px 0 rgba(195, 195, 195, 0.5);
      ul {
        display: flex;
        justify-content: center;
        padding: 20px 0;
        li {
          padding: 10px 20px;
          background: #f8f8f8;
          color: #666666;
          cursor: pointer;
          margin: 0 10px;
        }
        li:hover {
          background: #cf4248;
          color: #ffffff;
        }
        .navBar {
          background: #cf4248;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
