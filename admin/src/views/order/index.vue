<template>
  <div class="order">
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="编号"
        width="50">
      </el-table-column>
      <el-table-column
        fixed
        prop="order_no"
        label="订单号"
        width="170">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="姓名"
        width="50">
      </el-table-column>
      <el-table-column
        prop="product_id"
        label="购买的商品名字"
        width="120">
        <template slot-scope="scope">
          <p v-for="(item,index) in proList"
            :key="index"
            v-show="parseInt(item.id) === parseInt(scope.row.product_id.split(',')[0]) || parseInt(item.id) === parseInt(scope.row.product_id.split(',')[1])">{{ item.title }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="city"
        label="市区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="300">
      </el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(row) {
      console.log(row);
    },
    List () {
      this.axios.post('http://localhost:3001/allList').then(res => {
        if (res.data.code === 2) {
          console.log(res)
          this.tableData = res.data.data
          this.proList = res.data.List
        } else {
          alert('查询失败，请稍后重试')
        }
      })
    }
  },
  data () {
    return {
      tableData: [],
      proList: []
    }
  },
  mounted () {
    this.List()
  }
}
</script>
