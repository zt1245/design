<template>
  <div class="content">
    <IBanner></IBanner>
    <IProduct></IProduct>
    <IRecommand></IRecommand>
    <IMore></IMore>
  </div>
</template>

<script>
import IBanner from '@/views/home/I-Banner.vue'
import IProduct from '@/views/home/I-Product.vue'
import IRecommand from '@/views/home/I-Recommand.vue'
import IMore from '@/views/home/I-More.vue'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    IBanner,
    IProduct,
    IRecommand,
    IMore
  }
}
</script>

<style lang="scss" scoped>

</style>
