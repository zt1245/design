<template>
  <div class="content">
    <IBanner></IBanner>
    <IProduct></IProduct>
  </div>
</template>

<script>
import IBanner from '@/views/home/I-Banner.vue'
import IProduct from '@/views/home/I-Product.vue'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    IBanner,
    IProduct
  }
}
</script>

<style lang="scss" scoped>

</style>
