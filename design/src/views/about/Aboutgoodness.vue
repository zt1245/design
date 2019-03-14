<template>
  <div class="aboutgoodness">
    <p v-for="(item,index) in goodnessList"
      :key="index">{{ item }}</p>
    <img src="http://localhost:8081/static/images/about.jpg">
  </div>
</template>

<script>
export default {
  data () {
    return {
      goodnessList: ['品牌优势', 'BRAND   ADVANTAGE', '我们坚持采摘纯天然水果，小产区原野原味，至美至鲜的甜品，源于天然雨水和阳光，', '让您尽情品尝大自然的味道。在晴朗的午后，明媚的下午四点，饱满多汁的原季水果在酸性和糖分平衡瞬间成熟，', '便被经验丰富的水果采集师傅及时采摘。果实的原味在恰到好吃的阳光催化下，最张扬的味道得以保留，同时锁住果汁原味，', '驱除露水对糖分的稀释和潮气的影响，味道更为浓郁，口感富有活力。我们保持对新水果的苛刻态度，满足最挑剔的味蕾。']
    }
  }
}
</script>

<style lang="scss" scoped>
.aboutgoodness {
  line-height: 1.8;
  font-size: 16px;
  color: #2a333c;
  p {
    margin-bottom: 10px;
  }
  p:nth-child(1) {
    font-weight: 700;
  }
  img {
    margin: 20px auto 50px;
  }
}
</style>
