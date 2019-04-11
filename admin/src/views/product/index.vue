<template>
  <div class="pro-add">
    <div class="add" @click="addPro()">新增商品</div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="id" label="编号" width="50" />
      <el-table-column prop="pro_img" label="商品图片" width="120">
        <template slot-scope="scope">
          <img :src="scope.row.pro_img" alt width="100px">
        </template>
      </el-table-column>
      <el-table-column prop="title" label="商品名" width="120" />
      <el-table-column prop="detail" label="描述" width="200" />
      <el-table-column prop="describe" label="详情" width="300" />
      <el-table-column prop="type" label="类型" width="60" />
      <el-table-column prop="sweet" label="甜度" width="80" />
      <el-table-column prop="label" label="标签" width="50" />
      <el-table-column prop="unit_price" label="价格" width="210" />
      <el-table-column prop="detail_img" label="详情图片" width="400">
        <template slot-scope="scope">
          <img
            v-for="(item,index) in scope.row.detail_img.split(',')"
            :key="index"
            :src="item"
            width="50px"
            style="margin: 0 5px;"
          >
        </template>
      </el-table-column>
      <el-table-column prop="maynifier_img" label="放大镜图片" width="280">
        <template slot-scope="scope">
          <img
            v-for="(mitem,mindex) in scope.row.maynifier_img.split(',')"
            :key="mindex"
            :src="mitem"
            width="50px"
            style="margin: 0 5px;"
          >
        </template>
      </el-table-column>
      <el-table-column prop="time" label="上架时间" width="80" />
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="handleClick(scope.row)">编辑</el-button>
          <el-button size="small" type="text">删除</el-button>
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
      <el-form-item label="放大镜图片" prop="proImg">
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
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: '',
      httpApi: 'http://localhost:3001',
      url: '/addImage',
      tableData: [],
      currentPage: 1,
      pagesize: 3,
      count: '',
      show: false,
      ruleForm: {
        name: '',
        detail: '',
        describe: '',
        type: '',
        sweet: null,
        tab: '',
        price: '',
        proImg: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '请输入商品描述', trigger: 'blur' }
        ],
        describe: [{ required: true, message: '请填写商品详情', trigger: 'blur' }],
        type: [{ required: true, message: '请选择商品所属类型', trigger: 'blur' }],
        sweet: [{ required: true, message: '请选择商品甜度', trigger: 'blur' }],
        price: [{ required: true, message: '请填写价格', trigger: 'blur' }],
        proImg: [{ required: true, message: '请选择图片', trigger: 'blur' }]
      }
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
          } else {
            alert('查询失败，请稍后重试')
          }
        })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage, this.pagesize)
      this.list()
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    addPro() {
      this.show = true
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      // 把 res.data 存放到数据库 前端图片用
      // http://localhost:3000/images/  1554716221102_190408171929.png
      this.imageUrl = URL.createObjectURL(file.raw)
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
}
</style>
