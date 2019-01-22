<template>
  <div class="dessert container">
    <ITitle :title="title" :detail="detail" :sum="sum"></ITitle>
  </div>
</template>

<script>
import ITitle from '@/views/home/I-Title.vue'
export default {
  name: 'IDessert',
  components: {
    ITitle
  },
  data () {
    return {
      title: '我们的甜品',
      detail: 'Our Dessert',
      sum: '甜品，使人心情愉悦'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
