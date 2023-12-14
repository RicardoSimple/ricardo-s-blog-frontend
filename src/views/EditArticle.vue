<template>
  <div style="margin-top: 90px;">
    <ArticleEditor
      v-if="data!=null"
      :getHtml="getHtml"
      :currentHtml="html"
      :currentTitle="title"
      :getTitle="getTitle"
    ></ArticleEditor>
    <ArticleMenu
    v-if="data!=null"
      :getSelectedTags="getSelectedTags"
      :currentTags="articleReq.tags"
      :currentBanner="articleReq.banner"
      :getBanner="getBanner"
    ></ArticleMenu>
    <el-card
      class="sticky-footer"
      :style="{height: minied? '30px':'90px'}"
    >
      <el-row>
        <el-col
          :span="12"
          :offset="12"
        >
          <el-button
            type="text"
            icon="el-icon-arrow-down"
            style="position: relative;top: -20px;"
            @click="minied=true"
            v-if="!minied"
          ></el-button>
          <el-button
            type="text"
            icon="el-icon-arrow-up"
            style="position: relative;top: -20px;"
            @click="minied=false"
            v-if="minied"
          ></el-button>
        </el-col>
      </el-row>
      <el-row style="position: relative; top: -25px;">
        <el-col
          :span="3"
          :offset="3"
        >
          <span>全文字数:</span>
        </el-col>
        <el-col
          :span="10"
          :offset="8"
        >
          <el-button
            type="info"
            round
            @click="saveArticalSubmit"
          >保存内容</el-button>
          <el-button
            type="warning"
            round
            @click="publishArticleSubmit"
          >现在发布</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { Message } from 'element-ui';
import { addArticle, getArticleById } from '../api/articleApi/articleApi';
import ArticleEditor from '../components/article/article-editor.vue';
import ArticleMenu from '../components/article/article-menu.vue';
import { getUserInfo } from '../utils/userInfo';

export default {
  data () {
    return {
      html: "",
      title: "",
      minied: false,
      articleReq: {
        userId: getUserInfo().id,
        title: "",
        content: "",
        viewCount: 0,
        tags: [],
        isPublished: false,
        banner: "",
      },
      data: null
    }
  },
  props: ['articleId'],
  components: { ArticleEditor, ArticleMenu },
  created () {
    this.getCurrent()
  },
  methods: {
    getCurrent () {
      getArticleById(this.articleId).then(res => {
        this.data = res.data
        console.log(this.data)
        this.articleReq = this.data
        this.html = this.data.content
        this.title = this.data.title
      })
    },
    getHtml (text) {
      this.articleReq.content = text
    },
    getTitle (title) {
      this.articleReq.title = title
    },
    getSelectedTags (tags) {
      this.articleReq.tags = tags
    },
    getBanner (banner) {
      console.log(banner)
      this.articleReq.banner = banner;
    },
    saveArticalSubmit () {
      console.log(this.articleReq)
      addArticle(this.articleReq).then(res => {
        if (res.data.code == 200) {
          Message.success("保存成功")
          // todo 跳转到该文章页面
        }
      })
    },
    publishArticleSubmit () {
      this.articleReq.isPublished = true
      console.log(this.articleReq)
      addArticle(this.articleReq).then(res => {
        if (res.data.code == 200) {
          Message.success("发布成功")
          // todo 跳转到该文章页面
        }
      })
    }
  }
}
</script>

<style>
.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  /* 可以根据实际情况设置其他样式，例如背景色、阴影等 */
}
</style>
