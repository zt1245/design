<template>
  <div class="category">
    <div class="type container">
      <dl class="cat-list">
        <dt>分类：</dt>
        <dd v-for="(item,index) in typeList"
          :key="index"
          :class="{ select: selnum === index }"
          @click="selection(index)">
        {{ item }}
        </dd>
      </dl>
    </div>
    <div class="pro-list container">
      <ul>
        <li v-for="(item,index) in 10"
          :key="index">
          <img src="../../static/images/caking.jpg">
          <p>百利甜情人</p>
          <span>￥298.00/2.0磅</span>
          <div class="label-entrance">
            <i>人气 ></i>
            <i>新品 ></i>
          </div>
          <div class="car">
            <i class="iconfont icon-jiarugouwuche"></i>
            加入购物车
          </div>
          <div class="label">
            <i class="iconfont icon-renqibiaoqian1"></i>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      typeList: ['全部分类', '蛋糕', '果汁', '冰淇淋', '甜甜圈'],
      selnum: 0
    }
  },
  mounted () {
    if (this.$route.name === 'Category') {
      this.selnum = 1
    }
  },
  methods: {
    selection (index) {
      this.selnum = index
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  padding-top: 100px;
  .car {
    font-size: 14px;
    line-height: 18px;
    margin-top: 10px;
    i {
      display: inline-block;
      font-size: 18px;
      padding-right: 5px;
    }
  }
  .car:hover {
    color: #cf4248;
  }
  .type {
    font-size: 13px;
    margin-bottom: 35px;
    border-top: #f2f2f2 solid 1px;
    border-bottom: #f2f2f2 solid 1px;
    padding: 8px 0;
    .cat-list {
      line-height: 50px;
      height: 50px;
      display: flex;
      dt {
        color: #9B9B9B;
        margin-right: 38px;
        text-align: left;
        margin: 0 13px;
      }
      dd {
        margin: 0 13px;
        cursor: pointer;
      }
      .select {
        color: #cf4248;
      }
    }
  }
  .pro-list {
    ul {
      overflow: hidden;
      li {
        float: left;
        padding: 0 18px;
        margin: 0 18px;
        position: relative;
        margin-bottom: 50px;
        .label {
          i {
            display: inline-block;
            color: #cf4248;
            font-size: 30px;
          }
          position: absolute;
          top: 0;
        }
        .label-entrance {
          padding-top: 5px;
          i {
            display: inline-block;
            padding: 5px 10px;
            border: 1px solid #cf4248;
            font-size: 14px;
            border-radius: 100px;
            color: #cf4248;
          }
        }
        img {
          width: 228px;
          height: 246px;
        }
        p {
          font-size: 14px;
          line-height: 20px;
        }
        span {
          display: block;
          line-height: 18px;
          margin-top: 5px;
          font-size: 14px;
          color: #cf4248;
        }
      }
    }
  }
}
</style>
