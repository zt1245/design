<template>
  <div class="order">
    <div class="order-meng"></div>
    <div class="order-content">
      <div id="mapInfo"></div>
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
  background: url(http://localhost:8081/static/images/banner05.png);
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
      width: 1000px;
      height: 440px;
      margin-right: 100px;
    }
  }
}
</style>
