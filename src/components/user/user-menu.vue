<template>
  <div>
    <el-row>
      <el-col
        :span="14"
        :offset="6"
      >
        <span
          style="font-size: 20px; font-weight: bold;">{{ userInfo.nickName }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div
          style="width: 100%; height: 1px; border-bottom: 1px solid rgb(211, 177, 25); margin: 3px 0;"
        ></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="14"
        :offset="5"
      >
        <el-button
          style="text-align: center;
          color: rgb(151, 82, 59);
          font-size: 16px;"
          class="user-button"
          type="text"
          size="medium"
          icon="el-icon-user"
          @click="mainEvent"
        >个人中心</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="14"
        :offset="5"
      >
        <el-button
          style="text-align: center;
          color: rgb(151, 82, 59);
          font-size: 16px;"
          class="user-button"
          type="text"
          size="medium"
          icon="el-icon-reading"
          @click="myArticleEvent"
        >我的文章</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="14"
        :offset="5"
      >
        <el-button
          style="text-align: center;
          color: rgb(151, 82, 59);
          font-size: 16px;"
          class="user-button"
          type="text"
          size="medium"
          icon="el-icon-edit"
          @click="addArticleEvent"
        >去写文章</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="14"
        :offset="5"
      >
        <el-button
          style="text-align: center;
          color: rgb(151, 82, 59);
          font-size: 16px;"
          class="user-button"
          type="text"
          size="medium"
          icon="el-icon-edit"
          @click="changeSettingEvent"
        >更改资料</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div
          style="width: 100%; height: 1px; border-bottom: 1px solid rgb(211, 177, 25); margin: 3px 0;"
        ></div>
      </el-col>
    </el-row>
    <el-row>
      <el-col
        :span="14"
        :offset="5"
      >
        <el-popconfirm
          confirm-button-text='确认'
          cancel-button-text='取消'
          confirm-button-type="warning"
          placement="left"
          @confirm="quitEvent"
          icon="el-icon-info"
          icon-color="red"
          title="确定退出登录？"
        >
          <el-button
            type="text"
            style="text-align: center;
          color:rgb(79, 8, 8);
          font-size: 16px;"
            class="quit-button"
            size="medium"
            icon="el-icon-error"
            slot="reference"
          >退出登录</el-button>
        </el-popconfirm>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import { clearAll } from '../../utils/storage'
import { getUserInfo } from '../../utils/userInfo'
export default {
  name: 'user-menu',
  data () {
    return {
      userInfo: {
        nickName: ""
      }
    }
  },
  created () {
    this.userInfo = getUserInfo()
  },
  methods: {
    mainEvent () {
      window.location.href = '/main'
    },
    myArticleEvent () {
      window.location.href = '/articles'

    },
    addArticleEvent () {
      window.location.href = '/addArticle'
    },
    changeSettingEvent () {
      window.location.href = '/setting'
    },
    quitEvent () {
      clearAll()
      window.location.reload();
    }
  }
}
</script>


<style>
.user-button :hover {
  color: rgb(80, 48, 9);
}
.quit-button :hover {
  color: coral;
}
</style>