<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="编号" width="150" />
      <el-table-column prop="uname" label="姓名" width="120" />
      <el-table-column prop="phone" label="手机号" width="120" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.axios.post('http://localhost:3001/userinfo').then((res) => {
      if (res.data.code === 2) {
        console.log(res)
        this.tableData = res.data.data
      } else {
        alert('查询失败，请稍后重试')
      }
    })
  },
  methods: {
    handleClick(row) {
      console.log(row)
    }
  }
}
</script>
