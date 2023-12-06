<template>
  <div style="margin-top: 10px;">
    <el-row>
      <el-col
        :span="18"
        :offset="3"
      >
        <el-card>
          <el-form :inline="true">
            <el-form-item>
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

export default {
  data () {
    return {
      selectedTags: [],
      allTags: [],
      visible: false,
      search: ""
    }
  },
  props: ['getSelectedTags'],
  created () {
    getTagList().then(res => {
      this.allTags = res.data
    })
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
    }
  },
  watch: {
    selectedTags (val) {
      this.sendSelectedTags()
    }
  },
  name: 'article-menu',
  components: { TagList }
}
</script>