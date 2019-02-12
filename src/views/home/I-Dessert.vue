<template>
  <div class="dessert container">
    <ITitle :title="title" :detail="detail" :sum="sum"></ITitle>
    <ul class="dessert-content">
      <li><img src="../../../static/images/juice.jpg"></li>
      <li class="describe">
        <p>果汁</p>
        <span>采购新鲜优质水果，鲜榨果汁，加入为数不多秘制原料，口感更佳。</span>
      </li>
      <li><img src="../../../static/images/ice.jpg"></li>
      <li>
        <div class="describe">
          <p>蛋糕</p>
          <span>采购新鲜原材料，加入为数不多秘制原料，口感更佳。</span>
        </div>
        <img src="../../../static/images/doughnut.jpg">
      </li>
      <li>
        <img src="../../../static/images/caked.jpg">
        <div class="doughnut">
          <p>甜甜圈 </p>
          <span>采购新鲜原材料，加入为数不多秘制原料，口感更佳。有独立蛋糕也有蛋糕和雪糕结合体。</span>
        </div>
      </li>
      <li>
        <div class="describe">
          <p>雪糕</p>
          <span>采购新鲜原材料，加入为数不多秘制原料，口感更佳。有独立蛋糕也有蛋糕和雪糕结合体。</span>
        </div>
        <div class="more-box">
          <i class="more">更多详情</i>
        </div>
      </li>
    </ul>
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
.dessert {
  .dessert-content {
    overflow: hidden;
    padding-top: 50px;
    li {
      float: left;
      .more-box {
        background: #e5383c;
        padding: 147px 21px;
        .more {
          display: inline-block;
          height: 44px;
          width: 142px;
          color: #ffffff;
          border: 1px solid #ffffff;
          background: #e5383c;
          line-height: 44px;
        }
      }
    }
    .describe {
      padding: 78px 48px;
      background: rgba($color: #f8f8f8, $alpha: 0.5);
      p {
        font-size: 22px;
        color: #666666;
      }
      span {
        width: 210px;
        display: inline-block;
        font-size: 14px;
        line-height: 28px;
        padding-top: 8px;
        color: #979696;
        text-align: left;
      }
    }
    .doughnut {
      padding: 69px 48px;
      background: rgba($color: #f8f8f8, $alpha: 0.5);
      p {
        font-size: 22px;
        color: #666666;
      }
      span {
        display: inline-block;
        width: 485px;
        font-size: 14px;
        line-height: 28px;
        padding-top: 8px;
        color: #979696;
        text-align: left;
      }
    }
  }
}
</style>
