<template>
  <div class="editor-container">
    <el-row>
      <!-- <el-col :span="6">
        <div style=" background-color: #f1f1f1;">
          list
          <ul
            @mousedown="scollToTitle"
            id="header-container"
          ></ul>
        </div>
      </el-col> -->
      <el-col
        :span="18"
        :offset="3"
      >
        <el-card>
          <!-- 工具栏 -->
          <Toolbar
            class="article-tool"
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
          />
          <!-- 编辑器 -->
          <div class="title-container">
            <input
              style="height: 70px;line-height: 70px;font-size: 35px;font-weight: bold;width: 93%;padding: 3px;border: none;outline: none;"
              placeholder="请输入标题..."
              :maxlength="maxTitleLength"
              @change="sendTitle"
              v-model="title"
            />
            <span>{{titleLength}}/{{ maxTitleLength }}</span>
            <div
              style="width: 100%;height: 1px; border-bottom: 1px solid #ccc;">
            </div>
          </div>
          <Editor
            class="article-editor"
            style="height: 80vh; overflow-y: hidden"
            :defaultConfig="editorConfig"
            v-model="html"
            @onChange="onChange"
            @onCreated="onCreated"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getToken } from '../../utils/userInfo';
import { Message } from 'element-ui'
/** markdown */
import { Boot } from '@wangeditor/editor'
import markdownModule from '@wangeditor/plugin-md'

Boot.registerModule(markdownModule)
export default {
  name: "article-editor",
  components: { Editor, Toolbar },
  data () {
    return {
      editor: null,
      html: "<h1></h1>",
      title: "",
      titleLength: 0,
      maxTitleLength: 40,
      toolbarConfig: {
        // toolbarKeys: [ /* 显示哪些菜单，如何排序、分组 */ ],
        excludeKeys: ['fullScreen'],
      },
      editorConfig: {
        placeholder: "请输入内容...",
        scroll: false,
        // autoFocus: false,

        // 所有的菜单配置，都要在 MENU_CONF 属性下
        MENU_CONF: {
          uploadImage: {
            server: '/api/static/image',
            fieldName: 'file',
            headers: {
              Authorization: getToken()
            },
          }
        },
      },
    };
  },
  props: ['getHtml', 'getTitle', 'currentHtml', 'currentTitle'],
  watch: {
    title (val) {
      this.titleLength = val.length
      this.title = val
      if (this.titleLength > this.maxTitleLength) {
        Message.warning(`最多允许${this.maxTitleLength}个字`)
        return false
      }
    },
  },
  created () {
    if (this.currentHtml != undefined) {
      this.html = this.currentHtml
    }
    if (this.currentTitle != undefined) {
      this.title = this.currentTitle
    }
  },
  methods: {
    onCreated (editor) {
      this.editor = Object.seal(editor); // 【注意】一定要用 Object.seal() 否则会报错
      console.log(this.editor)
    },
    onChange (editor) {
      this.sendHtml()
      console.log("onChange", editor.getHtml()); // onChange 时获取编辑器最新内容
    },
    getEditorText () {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getText()); // 执行 editor API
    },
    printEditorHtml () {
      const editor = this.editor;
      if (editor == null) return;

      console.log(editor.getHtml()); // 执行 editor API
    },
    sendHtml () {
      this.getHtml(this.html)
    },
    sendTitle () {
      this.getTitle(this.title)
    }
  },
  // mounted () {
  //   //模拟 ajax 请求，异步渲染编辑器
  //   setTimeout(() => {
  //     this.html = "<p>Ajax 异步设置内容 HTML</p>";
  //     const toolbar = DomEditor.getToolbar(this.editor)

  //     const curToolbarConfig = toolbar.getConfig()
  //     console.log(curToolbarConfig.toolbarKeys) // 当前菜单排序和分组
  //   }, 1500);
  // },
  beforeDestroy () {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁 editor ，重要！！！
  },
};
</script>

<style>
/* 默认的标题样式 */
h1 {
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
}

h2 {
  display: block;
  font-size: 1.5em;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
}

h3 {
  display: block;
  font-size: 1.17em;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
}

h4 {
  display: block;
  margin-block-start: 1.33em;
  margin-block-end: 1.33em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
}

h5 {
  display: block;
  font-size: 0.83em;
  margin-block-start: 1.67em;
  margin-block-end: 1.67em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
}

h6 {
  display: block;
  font-size: 0.67em;
  margin-block-start: 2.33em;
  margin-block-end: 2.33em;
  margin-inline-start: 0;
  margin-inline-end: 0;
  font-weight: bold;
}
</style>
<style src="@wangeditor/editor/dist/css/style.css">
</style>
