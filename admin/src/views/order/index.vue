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
        prop="status"
        label="订单状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="user_name"
        label="姓名"
        width="50">
      </el-table-column>
      <el-table-column
        prop="proTitle"
        label="购买的商品名字"
        width="300">
        <template slot-scope="scope">
          <p v-for="(item,index) in scope.row.proTitle.split(',')"
          :key="index">{{ item }}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="proImg"
        label="商品图片"
        width="500">
        <template slot-scope="scope">
          <div style="display:flex;">
            <img v-for="(item,index) in scope.row.proImg.split(',')"
              :key="index"
              :src="item"
              style="width:100px;height:100px;margin:0 10px;"/>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
        width="100">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.quantity.split(',')"
            :key="index"
            style="margin:0 5px 0 0;">{{ item }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="unit_price"
        label="单价"
        width="120">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.unit_price.split(',')"
            :key="index"
            style="margin:0 5px 0 0;">{{ item }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="total_price"
        label="总价"
        width="50">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="70">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="parseInt(count)"
      :page-size="3"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: '',
      currentPage: 1,
      pagesize: 3,
      tableData: []
    }
  },
  methods: {
    handleClick(row) {
      console.log(row.id);
      let id = row.id
      this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.axios.post('http://localhost:3001/delo',{
          id
        }).then(res => {
          if (res.data.code === 2) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.List()
          } else {
            this.$message.error('删除失败，请重试！')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
      this.List()
    },
    List () {
      const pagesize = this.pagesize
      const currentPage = this.currentPage
      this.axios.post('http://localhost:3001/allList',{
        pagesize,
        currentPage
      }).then(res => {
        if (res.data.code === 2) {
          console.log(res)
          this.tableData = res.data.data
          this.count = res.data.count
        } else {
          alert('查询失败，请稍后重试')
        }
      })
    }
  },
  mounted () {
    this.List()
  }
}
</script>
