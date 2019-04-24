<template>
  <div class="new-add">
    <div class="add" @click="addPro()">新增新闻</div>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column fixed prop="id" label="编号" width="50" />
      <el-table-column prop="imgSrc" label="新闻配图" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.imgSrc" alt width="100px">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="新闻标题" width="200" />
      <el-table-column prop="recommend" label="是否为推荐新闻" width="100" align="center" />
      <el-table-column prop="content" label="新闻内容" width="800" />
      <el-table-column prop="time" label="上架时间" width="160" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleClick(scope.row)">编辑</el-button>
          <el-button size="small" type="text" @click="handle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="parseInt(count)"
      :page-size="3"
      style="margin: 20px 400px;"
      @current-change="handleCurrentChange"
    />
    <el-form
      v-show="show"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="110px"
      class="demo-ruleForm"
      style="position:fixed;top:50px;left:30%;background:#fff;z-index:999;padding:20px 50px;border:1px solid #efefef;height:520px;overflow-y:auto;width:700px;"
    >
      <h2 class="aPro">新闻信息<i class="el-icon-circle-close-outline" @click="close()"></i></h2>
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="新闻内容" prop="content">
        <el-input v-model="ruleForm.content" type="textarea"/>
      </el-form-item>
      <el-form-item label="是否为推荐新闻" prop="recommend">
        <el-switch
          v-model="value2"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="新闻配图" prop="proImg">
        <el-upload
          class="avatar-uploader"
          :action="httpApi+''+url"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" v-show="addShow">添加</el-button>
        <el-button type="primary" @click="updatePro('ruleForm')" v-show="addShow === false">修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name:"shoping",
  data() {
    return {
      imageUrl: '',
      httpApi: 'http://localhost:3001',
      url: '/addImage',
      tableData: [],
      value2: true,
      currentPage: 1,
      pagesize: 3,
      count: '',
      show: false,
      addShow: false,
      selNum: '',
      loading: true,
      ruleForm: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入新闻标题', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        content: [{ required: true, message: '请输入新闻内容', trigger: 'blur' }]
      },
      // 商品主图
      pImg: ''
    }
  },
  mounted() {
    this.list()
  },
  methods: {
    list() {
      const pagesize = this.pagesize
      const currentPage = this.currentPage
      this.axios.post('http://localhost:3001/Newpaging', {
          currentPage,
          pagesize
        })
        .then(res => {
          if (res.data.code === 2) {
            this.tableData = res.data.data
            this.count = res.data.count
            this.loading = false
          } else {
            alert('查询失败，请稍后重试')
          }
        })
    },
    handleCurrentChange(currentPage) {
      this.loading = true
      this.currentPage = currentPage
      this.list()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let form = this.ruleForm
          let pImg = this.httpApi+'/images/'+this.pImg
          let recommend = this.value2
          console.log(recommend, form, pImg)
          // 生成当前时间（订单开始时间）
          var date = new Date()
          var seperator1 = '-'
          var seperator2 = ':'
          var month = date.getMonth() + 1
          var strDate = date.getDate()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
          }
          var cancledate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
          console.log(cancledate)
          this.axios.post('http://localhost:3001/addNews', {
            form,
            pImg,
            cancledate,
            recommend
          })
          .then(res => {
            if (res.data.code === 2) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.show = false
              this.list()
              this.imageUrl = ''
              this.resetForm(formName)
              this.loading = false
            } else {
              this.$message.error('添加失败，请重试')
            }
          })
        } else {
          this.$message({
          message: '输入有误，请重试',
          type: 'warning'
        })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addPro() {
      this.show = true
      this.addShow = true
    },
    // 商品主图
    handleAvatarSuccess(res, file) {
      // 把 res.data 存放到数据库 前端图片用
      // http://localhost:3000/images/  1554716221102_190408171929.png
      this.imageUrl = URL.createObjectURL(file.raw)
      this.pImg = res.data
    },
    close () {
      this.show = false
    },
    // 编辑
    handleClick (arr) {
      console.log(arr)
      this.selNum = arr.id
      this.addShow = false
      this.ruleForm.title = arr.title
      this.ruleForm.content = arr.content
      this.imageUrl = arr.imgSrc
      this.show = true
    },
    // 确定修改
    updatePro (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let form = this.ruleForm
          let pImg = this.imageUrl
          let id = this.selNum
          let recommend = this.value2
          // 生成当前时间（订单开始时间）
          var date = new Date()
          var seperator1 = '-'
          var seperator2 = ':'
          var month = date.getMonth() + 1
          var strDate = date.getDate()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
          }
          var cancledate = date.getFullYear() + seperator1 + month + seperator1 + strDate + ' ' + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
          this.axios.post('http://localhost:3001/upNew', {
            form,
            pImg,
            cancledate,
            id,
            recommend
          }).then(res => {
            if (res.data.code === 2) {
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.show = false
              this.list()
            } else {
              this.$message.error('修改失败，请重试')
            }
          })
        } else {
          this.$message({
          message: '输入有误，请重试',
          type: 'warning'
        })
          return false
        }
      })
    },
    // 删除
    handle (arr) {
      let num =arr.id
      console.log(num)
      this.$confirm('此操作将删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios.post('http://localhost:3001/delNew', {
          num
        }).then(res => {
          if (res.data.code === 2) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.list()
          } else {
            this.$message.error('删除失败，请重试')
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })       
      })
    }
  }
}
</script>

<style lang="scss">
.new-add {
  position: relative;
  .add {
    font-size: 20px;
    border: 1px solid #409eff;
    background: #409eff;
    color: #fff;
    display: inline-block;
    padding: 10px 20px;
    margin: 10px;
    cursor: pointer;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .aPro {
    font-size: 20px;
    text-align: center;
    margin: 5px 0 20px;
    position: relative;
    i {
      position: absolute;
      right: -30px;
      font-size: 30px;
      color: #ccc;
      cursor: pointer;
      top: -10px;
    }
    i:hover {
      color: red;
    }
  }
}
</style>
