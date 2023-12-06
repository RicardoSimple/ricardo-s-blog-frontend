<template>
  <div>
    <el-tag
      :key="tag.id"
      v-for="tag in tags"
      style="margin-right: 10px;margin-top: 6px;"
      :disable-transitions="false"
      @close="handleClose(tag)"
      @click="sendTag(tag)"
    >
      {{tag.name}}
    </el-tag>
  </div>
</template>

<script>
export default {
  name: 'tag-list',
  props: {
    tags: {
      default: []
    },
    getTag: {
      type: Function
    }
  },
  data () {
    return {

    }
  },
  methods: {
    sendTag (tag) {
      this.getTag(tag)
    }
  }
}
</script>