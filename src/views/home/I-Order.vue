<template>
  <div class="order">
    <div class="order-meng"></div>
    <div class="order-content">
      <div id="mapInfo"></div>
      <div class="table">
        <p>在线订餐</p>
        <ul>
          <li>
            <p>您的姓名</p>
            <input type="text">
          </li>
          <li>
            <p>联系方式</p>
            <input type="text">
          </li>
          <li>
            <p>用餐人数</p>
            <input type="text">
          </li>
          <li>
            <p>更多描述</p>
            <input type="text">
          </li>
          <li>
            <span>提交</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    var map = new BMap.Map('mapInfo')
    var point = new BMap.Point(116.404, 39.915)
    map.centerAndZoom(point, 15)
    var myGeo = new BMap.Geocoder()
    myGeo.getPoint('广东省深圳市宝安区众里创新社区兴东', function (point) {
      if (point) {
        map.centerAndZoom(point, 16)
        map.addOverlay(new BMap.Marker(point))
      }
    }, '深圳市')
  }
}
</script>

<style lang="scss" scoped>
.order {
  background: url(../../../static/images/banner05.png);
  position: relative;
  .order-meng {
    padding: 270px 0;
    background: rgba($color: #000000, $alpha: 0.5)
  }
  .order-content {
    position: absolute;
    top: 50px;
    display: flex;
    left: 50%;
    margin-left: -525px;
    #mapInfo {
      width: 600px;
      height: 440px;
      margin-right: 100px;
    }
    .table {
      color: #ffffff;
      ul {
        overflow: hidden;
        li {
          p {
            text-align: left;
            padding-bottom: 20px;
            padding-top: 20px;
          }
          input {
            width: 336px;
            height: 25px;
            outline: none;
            padding-left: 10px;
          }
          span {
            display: block;
            padding: 15px 50px;
            background: #e5383c;
            margin-top: 30px;
            float: left;
          }
        }
      }
    }
  }
}
</style>
