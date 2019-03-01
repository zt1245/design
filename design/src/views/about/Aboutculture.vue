<template>
  <div class="aboutculture">
    <p v-for="(item,index) in cultureList"
      :key="index">{{ item }}</p>
    <img src="../../../static/images/about.jpg">
  </div>
</template>

<script>
export default {
  data () {
    return {
      cultureList: ['追求卓越 PURSUING EXCELLENCE', '不断创新，勇争第一，让客户满意，一直是港基人追求的目标', '以人为本 PEOPLE ORIENTED', '员工是企业最大的财富，我们坚信，培养优秀的人才是港基成功的基石', '群策群力 WORK AND PULL TOGETHER', '我们倡导协同一致的团队精神，企业内部以及与合作伙伴的团结合作是群策群力的具体表现']
    }
  }
}
</script>

<style lang="scss" scoped>
.aboutculture {
  line-height: 1.8;
  font-size: 16px;
  color: #2a333c;
  p {
    margin-bottom: 10px;
  }
  p:nth-child(2n+1) {
    font-weight: 700;
  }
  img {
    margin: 20px auto 50px;
  }
}
</style>
