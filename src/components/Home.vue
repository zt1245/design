<template>
  <div class="content">
    <IBanner></IBanner>
    <IProduct></IProduct>
    <IRecommand></IRecommand>
    <IMore></IMore>
    <IDessert></IDessert>
    <IConnect></IConnect>
  </div>
</template>

<script>
import IBanner from '@/views/home/I-Banner.vue'
import IProduct from '@/views/home/I-Product.vue'
import IRecommand from '@/views/home/I-Recommand.vue'
import IMore from '@/views/home/I-More.vue'
import IDessert from '@/views/home/I-Dessert.vue'
import IConnect from '@/views/home/I-Connect.vue'
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
    IMore,
    IDessert,
    IConnect
  }
}
</script>

<style lang="scss" scoped>

</style>
