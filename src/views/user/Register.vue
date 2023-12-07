<template>
  <div style="margin-top: 20vh;">
    <el-row>
      <el-col
        :span="10"
        :offset="7"
      >
        <el-card>
          <el-form
            :model="registerForm"
            label-position="right"
            :rules="rules"
            label-width="90px"
            ref="registerForm"
          >
            <el-form-item
              label="用户名"
              prop="userName"
            >
              <el-input
                v-model="registerForm.userName"
                placeholder="用于登录"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="昵称"
              prop="nickName"
            >
              <el-input v-model="registerForm.nickName"></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <input
                type="file"
                ref="avatarFile"
                @change="handleAvatarChange"
              />
            </el-form-item>
            <el-form-item
              label="真实姓名"
              prop="name"
            >
              <el-input v-model="registerForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select
                v-model="registerForm.gender"
                placeholder="您的性别"
              >
                <el-option
                  label="男"
                  value="male"
                ></el-option>
                <el-option
                  label="女"
                  value="female"
                ></el-option>
                <el-option
                  label="保密"
                  value="other"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="邮箱"
              prop="email"
            >
              <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            <el-form-item
              label="手机号"
              prop="phone"
            >
              <el-input
                v-model="registerForm.phone"
                type="number"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="密码"
              prop="pwd"
            >
              <el-input
                v-model="registerForm.pwd"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item
              label="确认密码"
              prop="comfirmPwd"
            >
              <el-input
                v-model="registerForm.comfirmPwd"
                type="password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="registerSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { register } from '../../api/userApi/userApi';
export default {
  data () {

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.pwd !== '') {
          this.$refs.registerForm.validateField('comfirmPwd');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        userName: "",
        phone: "",
        nickName: "",
        gender: "other",
        name: "",
        email: "",
        pwd: "",
        avatar: null,
        comfirmPwd: ""
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        pwd: [
          { required: true, trigger: 'blur', validator: validatePass },
        ],
        comfirmPwd: [
          { required: true, trigger: 'blur', validator: validatePass2 },
        ]
      },
      file: null,
    }
  },
  methods: {
    handleAvatarChange () {
      // 头像选择改变时的处理
      //e.preventDefault()
      this.file = this.$refs.avatarFile.files[0]
      console.log(this.file)
    },
    registerSubmit () {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('userName', this.registerForm.userName)
          formData.append('phone', this.registerForm.phone)
          formData.append('nickName', this.registerForm.nickName)
          formData.append('gender', this.registerForm.gender)
          formData.append('name', this.registerForm.name)
          formData.append('email', this.registerForm.email)
          formData.append('pwd', this.registerForm.pwd)
          formData.append('avatar', this.file)

          register(formData).then(res => {
            Message.success(res.data)
            window.location.href = '/login'
          })
        } else {
          Message.warning("validate error")
          return false;
        }
      });
      // validate
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
</style>