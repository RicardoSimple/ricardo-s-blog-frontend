
<template>
  <div>
    <el-card style="margin: 0 auto; width: 50%;margin-top: 20vh;">
      <el-form
        :model="loginReq"
        hide-required-asterisk
        status-icon
        :rules="rules"
        ref="loginReq"
        label-width="100px"
      >
        <el-form-item
          label="账号"
          prop="userName"
        >
          <el-input v-model.number="loginReq.userName"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="pwd"
        >
          <el-input
            type="password"
            v-model="loginReq.pwd"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginReq')"
          >提交</el-button>
          <el-button @click="resetForm('loginReq')">重置</el-button>
          <router-link to="/register">注册</router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { login } from '../../api/userApi/userApi'
import { setRefreshToken, setToken, setUserInfo } from '../../utils/userInfo';

export default {
  data () {
    return {
      loginReq: {
        pwd: '',
        userName: ''
      },
      rules: {
        pwd: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        userName: [
          { required: true, message: '请输入账号', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loginSubmit()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    loginSubmit () {
      login(this.loginReq).then(res => {
        var data = res.data
        console.log(data)
        setToken(data.token)
        setUserInfo(data.currentUser)
        setRefreshToken(data.refreshToken)
        window.location.href = '/'
      })
    }
  }
}
</script>