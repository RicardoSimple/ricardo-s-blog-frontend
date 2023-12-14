<template>
  <div style="margin-top: 10px;">
    <el-row>
      <el-col
        :span="18"
        :offset="3"
      >
        <el-card>
          <el-form>
            <el-form-item label="文章标签">
              <el-tag
                v-for="tag in selectedTags"
                style="margin-right: 10px;"
                :key="tag.name"
                closable
                @close="handleClose(tag)"
                :type="tag.type"
              >
                {{tag.name}}
              </el-tag>
              <el-popover
                placement="top-start"
                width=500
                :visible-arrow=false
                trigger="click"
                v-model="visible"
              > <el-container>
                  <el-header height="100px">
                    <div
                      style="text-align: center;font-size: 20px;line-height: 20px;"
                    >标签</div>
                    <el-divider></el-divider>
                    <div>
                      <el-input
                        v-model="search"
                        width="50px"
                        prefix-icon="el-icon-search"
                        style="width: 300px;margin-right: 20px;"
                        size="medium"
                        placeholder="输入搜索内容"
                      ></el-input>
                      <el-button
                        size="medium"
                        icon="el-icon-search"
                      >搜索</el-button>
                    </div>
                  </el-header>
                  <el-container>
                    <!-- <el-aside width="200px">Aside</el-aside> -->
                    <el-main>
                      <el-tabs
                        tab-position="left"
                        style="height: 200px;"
                      >
                        <el-tab-pane label="全部标签">
                          <TagList
                            :getTag="getTag"
                            :tags="allTags"
                          ></TagList>
                        </el-tab-pane>
                        <el-tab-pane label="编程语言">编程语言</el-tab-pane>
                        <el-tab-pane label="框架">框架</el-tab-pane>
                        <el-tab-pane label="算法">算法</el-tab-pane>
                      </el-tabs></el-main>
                  </el-container>
                </el-container>
                <el-button slot="reference">添加标签</el-button>
              </el-popover>

            </el-form-item>
            <el-form-item label="文章封面">
              <el-upload
                class="avatar-uploader"
                action="/api/static/image"
                :show-file-list="false"
                :on-success="handleBannerSuccess"
                :before-upload="beforeBannerUpload"
                :headers="headers"
              >
                <img
                  v-if="banner"
                  :src="banner"
                  class="avatar"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>

            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import TagList from './tag-list.vue'
import { getTagList } from '../../api/articleApi/tagApi'
import { getToken } from '../../utils/userInfo'

export default {
  data () {
    return {
      selectedTags: [],
      allTags: [],
      visible: false,
      search: "",
      banner: "",
      headers: {
        Authorization: getToken()
      }
    }
  },
  props: ['getSelectedTags', 'getBanner', 'currentTags', 'currentBanner'],
  created () {
    getTagList().then(res => {
      this.allTags = res.data
    })
    if (this.currentTags != undefined) {
      this.selectedTags = this.currentTags
    }
    if (this.currentBanner != undefined) {
      this.banner = this.currentBanner
    }
  },
  methods: {
    getTag (tag) {
      if (!this.selectedTags.includes(tag))
        this.selectedTags.push(tag)
      console.log(this.selectedTags)
    },
    handleClose (tag) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    },
    sendSelectedTags () {
      this.getSelectedTags(this.selectedTags)
    },
    sendBanner () {
      this.getBanner(this.banner)
    },
    handleBannerSuccess (res, file) {
      console.log(res)
      this.banner = res.data.url
    },
    beforeBannerUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/jpg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  watch: {
    selectedTags (val) {
      this.sendSelectedTags()
    },
    banner (val) {
      this.sendBanner()
    }
  },
  name: 'article-menu',
  components: { TagList }
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