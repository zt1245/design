<template>
  <div class="content">
    <IBanner></IBanner>
    <IProduct></IProduct>
    <IRecommand></IRecommand>
  </div>
</template>

<script>
import IBanner from '@/views/home/I-Banner.vue'
import IProduct from '@/views/home/I-Product.vue'
import IRecommand from '@/views/home/I-Recommand.vue'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    IBanner,
    IProduct,
    IRecommand
  }
}
</script>

<style lang="scss" scoped>

</style>
