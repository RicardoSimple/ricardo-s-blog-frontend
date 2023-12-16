<template>
  <div>
    <el-row>
      <el-col
        :span="20"
        :offset="2"
      > <el-descriptions title="我的资料">
          <el-descriptions-item label="头像">
            <el-avatar
              :size="50"
              :src="user.avatar"
            ></el-avatar>
          </el-descriptions-item>
          <el-descriptions-item
            label="用户名">{{ user.userName }}</el-descriptions-item>
          <el-descriptions-item
            label="手机号">{{user.phone}}</el-descriptions-item>
          <el-descriptions-item
            label="昵称">{{user.nickName}}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{user.email}}</el-descriptions-item>
          <el-descriptions-item
            label="真实姓名">{{user.name}}</el-descriptions-item>
          <el-descriptions-item label="背景图片"><el-image
              style="height: 100px"
              :src="user.background"
              :fit="fit"
            ></el-image></el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: 'user-profile',
  props: ['user']
}
</script>