<template>
  <div class="about">
    <img src="http://localhost:8081/static/images/newban.png" class="ban">
    <div class="about-nav">
      <ul class="container">
        <li v-for="(item,index) in aboutNav"
          :key="index"
          :class="{ aboutActive: aboutAct === index }"
          @click="aboutChange(index)">{{ item }}</li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data () {
    return {
      aboutNav: ['关于我们', '公司介绍', '企业文化', '品牌优势'],
      aboutAct: 0
    }
  },
  methods: {
    aboutChange (index) {
      this.aboutAct = index
      if (index === 0) {
        this.$router.push({
          path: '/about'
        })
      } else if (index === 1) {
        this.$router.push({
          path: '/about/aboutcompany'
        })
      } else if (index === 2) {
        this.$router.push({
          path: '/about/aboutculture'
        })
      } else if (index === 3) {
        this.$router.push({
          path: '/about/aboutgoodness'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  .ban {
    width: 100%;
  }
  .about-nav {
    border-bottom: 1px solid #cf4248;
    margin-bottom: 20px;
    ul {
      display: flex;
      justify-content: center;

      li {
        padding: 10px;
        background: #f8f8f8;
        color: #666666;
        margin: 20px;
        cursor: pointer;
      }
      li:hover {
        background: #cf4248;
        color: #ffffff;
      }
      .aboutActive {
        background: #cf4248;
        color: #ffffff;
      }
    }
  }
}
</style>
