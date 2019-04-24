<template>
  <div class="changepwd">
    <p>修改密码</p>
    <div class="info">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">确定</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm2.checkPass !== '') {
          this.$refs.ruleForm2.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      labelPosition: 'left',
      ruleForm2: {
        pass: '',
        checkPass: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let pwd = this.checkPasss
          let uname = localStorage.getItem('uname')
          this.axios.post('http://localhost:3001/uppwd', {
            pwd,
            uname
          }).then(res => {
            if (res.data.code === 2) {
              this.$notify({
                title: '成功',
                message: '修改成功！',
                type: 'success'
              })
            } else {
              this.$notify.error({
                title: '错误',
                message: '修改失败，请重试'
              })
            }
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: 'error submit!!'
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.changepwd {
  background: #ffffff;
  width: 100%;
  padding: 40px 80px 0 80px;
  p {
    color: #262A2F;
    font-size: 30px;
    text-align: left;
    margin-bottom: 64px;
  }
  .info {
    p {
      color: #262A2F;
      font-size: 18px;
      margin-bottom: 30px;
      input {
        border: 1px solid #B5B5B5;
        height: 30px;
        width: 300px;
        margin-left: 20px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      span {
        width: 140px;
        height: 40px;
        font-size: 16px;
        display: inline-block;
        text-align: center;
        line-height: 40px;
      }
      span:nth-child(1) {
        background: #F80000;
        color: #ffffff;
      }
      span:nth-child(2) {
        border: 1px solid #BFBFBF;
        color: #4A4A4A;
        margin-left: 20px;
      }
    }
  }
}
</style>
