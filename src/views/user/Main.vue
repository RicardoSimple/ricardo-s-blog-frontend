<template>
  <div class="home">
    <banner
      v-if="userInfo.background!=undefined&&userInfo.background!=''"
      isHome="false"
      :userInfo="userInfo"
      :src="userInfo.background"
    ></banner>
    <banner
      v-else
      isHome="false"
      :userInfo="userInfo"
    ></banner>
    <div class="site-content animate">
      <!--通知栏-->
      <!-- <div class="notify">
        <div
          class="search-result"
          v-if="hideSlogan"
        >
          <span v-if="searchWords">搜索结果："{{searchWords}}" 相关文章</span>
          <span v-else-if="category">分类 "{{category}}" 相关文章</span>
        </div>
        <quote v-else>{{notice}}</quote>
      </div> -->
      <!--文章列表-->
      <main
        class="site-main"
        :class="{'search':hideSlogan}"
      >
        <section-title>他的文章</section-title>
        <template v-for="item in postList">
          <post
            :post="item"
            :key="item.id"
          ></post>
        </template>
        <div v-if="postList.length<=0">他还没有发过文章</div>
      </main>

      <!--加载更多-->
      <div
        class="more"
        v-show="hasNextPage"
      >
        <div
          class="more-btn"
          @click="loadMore"
        >More</div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from '@/components/banner'
import Feature from '@/components/feature'
import sectionTitle from '@/components/section-title'
import Post from '@/components/post'
import SmallIco from '@/components/small-ico'
import Quote from '@/components/quote'
import { fetchFocus, fetchList } from '../../api'
import { getArticleUnderUser } from '../../api/articleApi/articleApi'
import { getUserInfo } from '../../utils/userInfo'

export default {
  name: 'Home',
  props: ['cate', 'words'],
  data () {
    return {
      features: [],
      postList: [],
      currPage: 1,
      hasNextPage: false,
      userInfo: "",
    }
  },
  components: {
    Banner,
    Feature,
    sectionTitle,
    Post,
    SmallIco,
    Quote
  },
  computed: {
    searchWords () {
      return this.$route.params.words
    },
    category () {
      return this.$route.params.cate
    },
    hideSlogan () {
      return this.category || this.searchWords
    },
    notice () {
      return this.$store.getters.notice
    }
  },
  methods: {
    fetchFocus () {
      fetchFocus().then(res => {
        this.features = res.data || []
      }).catch(err => {
        console.log(err)
      })
    },
    fetchList () {
      fetchList().then(res => {
        this.postList = res.data.items || []
        this.currPage = res.data.page
        this.hasNextPage = res.data.hasNextPage
      }).catch(err => {
        console.log(err)
      })
    },
    loadMore () {
      fetchList({ page: this.currPage + 1 }).then(res => {
        this.postList = this.postList.concat(res.data.items || [])
        this.currPage = res.data.page
        this.hasNextPage = res.data.hasNextPage
      })
    },
  },
  mounted () {
    this.fetchFocus();
    // this.fetchList();
  },
  created () {
    this.userInfo = getUserInfo()
    getArticleUnderUser(this.userInfo.id).then(res => {
      console.log(res.data)
      this.postList = res.data
    })
  }
}
</script>
<style scoped lang="less">
.site-content {
  .notify {
    margin: 60px 0;
    border-radius: 3px;
    & > div {
      padding: 20px;
    }
  }

  .search-result {
    padding: 15px 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 400;
    border: 1px dashed #ddd;
    color: #828282;
  }
}

.top-feature {
  width: 100%;
  height: auto;
  margin-top: 30px;

  .feature-content {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;

    .feature-item {
      width: 32.9%;
    }
  }
}

.site-main {
  padding-top: 80px;

  &.search {
    padding-top: 0;
  }
}

.more {
  margin: 50px 0;
  .more-btn {
    width: 100px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #adadad;
    border: 1px solid #adadad;
    border-radius: 20px;
    margin: 0 auto;
    cursor: pointer;
    &:hover {
      color: #8fd0cc;
      border: 1px dashed #8fd0cc;
    }
  }
}

/******/
@media (max-width: 800px) {
  .top-feature {
    display: none;
  }

  .site-main {
    padding-top: 40px;
  }

  .site-content {
    .notify {
      margin: 30px 0 0 0;
    }

    .search-result {
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
}

/******/
</style>
