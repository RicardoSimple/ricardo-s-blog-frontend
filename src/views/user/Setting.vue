<template>
  <div class="profile-container">
    <el-row>
      <el-col
        :span="20"
        :offset="2"
      >
        <el-card>
          <UserProfile
            v-if="currentUser!=null"
            :user="currentUser"
          ></UserProfile>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import UserProfile from '../../components/user/profile.vue'
import { currentUser } from '../../api/userApi/userApi'

export default {
  data () {
    return {
      currentUser: null
    }
  },
  created () {
    currentUser().then(res => {
      this.currentUser = res.data
      console.log(this.currentUser)
    })
  },
  components: {
    UserProfile
  }
}
</script>

<style>
.profile-container {
  margin-top: 20vh;
}
</style>