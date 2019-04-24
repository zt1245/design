<template>
  <div class="pro-add">
    <div class="add" @click="addPro()">新增商品</div>
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column fixed prop="id" label="编号" width="50" />
      <el-table-column prop="pro_img" label="商品图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.pro_img" alt width="100px">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品名" width="120" />
      <el-table-column prop="detail" label="描述" width="200" />
      <el-table-column prop="des" label="详情" width="300" />
      <el-table-column prop="type" label="类型" width="60" />
      <el-table-column prop="sweet" label="甜度" width="80" />
      <el-table-column prop="label" label="标签" width="50" />
      <el-table-column prop="unit_price" label="价格" width="210" />
      <el-table-column prop="detail_img" label="详情图片" width="400">
        <template slot-scope="scope">
          <img
            v-for="(item,index) in JSON.parse(scope.row.detail_img)"
            :key="index"
            :src="item.url"
            width="50px"
            style="margin: 0 5px;"
          >
        </template>
      </el-table-column>
      <el-table-column prop="maynifier_img" label="放大镜图片" width="280">
        <template slot-scope="scope">
          <img
            v-for="(mitem,mindex) in JSON.parse(scope.row.maynifier_img)"
            :key="mindex"
            :src="mitem.url"
            width="50px"
            style="margin: 0 5px;"
          >
        </template>
      </el-table-column>
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
      label-width="100px"
      class="demo-ruleForm"
      style="position:fixed;top:50px;left:30%;background:#fff;z-index:999;padding:20px 50px;border:1px solid #efefef;height:520px;overflow-y:auto;"
    >
      <h2 class="aPro">商品信息<i class="el-icon-circle-close-outline" @click="close()"></i></h2>
      <el-form-item label="商品名字" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="商品描述" prop="detail">
        <el-input v-model="ruleForm.detail" />
      </el-form-item>
      <el-form-item label="商品详情" prop="describe">
        <el-input v-model="ruleForm.describe" type="textarea" />
      </el-form-item>
      <el-form-item label="商品类型" prop="type">
        <el-radio-group v-model="ruleForm.type">
          <el-radio label="cake 蛋糕" />
          <el-radio label="drink 果汁" />
          <el-radio label="ice 冰淇淋" />
          <el-radio label="sweet 甜甜圈" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品甜度" prop="sweet">
        <el-rate v-model="ruleForm.sweet" style="margin-top: 10px;" />
      </el-form-item>
      <el-form-item label="商品标签" prop="tab">
        <el-radio-group v-model="ruleForm.tab">
          <el-radio label="新品" />
          <el-radio label="热卖" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input v-model="ruleForm.price" />
      </el-form-item>
      <el-form-item label="商品图片" prop="proImg">
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
      <el-form-item label="放大镜图片" prop="mImg">
        <el-upload
          class="upload-demo"
          :action='httpApi+""+url'
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          :on-success="handleSuccess"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
      </el-form-item>
      <el-form-item label="详情图片" prop="dImg">
        <el-upload
          class="upload-demo"
          :action='httpApi+""+url'
          :on-preview="handleP"
          :on-remove="handleR"
          :file-list="dList"
          :on-success="handleS"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
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
      // 放大镜图片
      fileList: [],
      // 详情图片
      dList: [],
      currentPage: 1,
      pagesize: 3,
      count: '',
      show: false,
      addShow: false,
      selNum: '',
      loading: true,
      ruleForm: {
        name: '',
        detail: '',
        describe: '',
        type: '',
        sweet: null,
        tab: '',
        price: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        detail: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
        describe: [{ required: true, message: '请填写商品详情', trigger: 'blur' }],
        type: [{ required: true, message: '请选择商品所属类型', trigger: 'blur' }],
        sweet: [{ required: true, message: '请选择商品甜度', trigger: 'blur' }],
        price: [{ required: true, message: '请填写价格', trigger: 'blur' }]
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
      this.axios
        .post('http://localhost:3001/paging', {
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
          let mList = this.fileList
          let dList = this.dList
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
          this.axios
          .post('http://localhost:3001/save', {
            form,
            pImg,
            mList,
            dList,
            cancledate
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
              this.fileList = []
              this.dList = []
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
    // 商品放大镜图片
    handleSuccess(res, file) {
      var obj = {}
      obj.name = file.name
      obj.url = this.httpApi+'/images/'+ res.data
      this.fileList.push(obj)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePreview(file) {
    },
    // 商品详情图片
    handleS(res, file) {
      var obj = {}
      obj.name = file.name
      obj.url = this.httpApi+'/images/'+ res.data
      this.dList.push(obj)
    },
    handleR(file, dList) {
      this.dList = dList
    },
    handleP(file) {
    },
    close () {
      this.show = false
    },
    // 编辑
    handleClick (arr) {
      console.log(arr)
      this.selNum = arr.id
      this.addShow = false
      this.ruleForm.name = arr.title
      this.ruleForm.detail = arr.detail
      this.ruleForm.describe = arr.des
      this.ruleForm.price = arr.unit_price
      this.imageUrl = arr.pro_img
      this.fileList = JSON.parse(arr.maynifier_img)
      this.dList = JSON.parse(arr.detail_img)
      this.show = true
    },
    // 确定修改
    updatePro (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let form = this.ruleForm
          let pImg = this.imageUrl
          let mList = this.fileList
          let dList = this.dList
          let id = this.selNum
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
          this.axios.post('http://localhost:3001/upPro', {
            form,
            pImg,
            mList,
            dList,
            cancledate,
            id
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
        this.axios.post('http://localhost:3001/delPro', {
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
.pro-add {
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
