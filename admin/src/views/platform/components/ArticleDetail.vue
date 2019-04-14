<template>
  <div class="createPost-container">
    <el-button class="button" type="success" @click="release">发布</el-button>
    <el-form ref="postForm" :model="postForm" class="form-container">
      <div class="createPost-main-container">
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" :height="300" v-model="postForm.content"/>
        </el-form-item>
        <el-form-item prop="image_uri" style="margin-bottom: 30px;">
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
const defaultForm = {
  status: "draft",
  content: "", // 文章内容
  image_uri: "", // 文章图片
  id: undefined,
  platforms: ["a-platform"],
};

export default {
  name: "ArticleDetail",
  components: {
    Tinymce,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      tempRoute: {}
    };
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id;
      this.fetchData(id);
    } else {
      this.postForm = Object.assign({}, defaultForm);
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
    this.tempRoute = Object.assign({}, this.$route);
  },
  methods: {
    release() {
      console.log( this.postForm.content )
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/mixin.scss";
.createPost-container {
  position: relative;
  .createPost-main-container {
    padding: 20px 45px 20px 50px;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      .postInfo-container-item {
        float: left;
      }
    }
  }
  .word-counter {
    width: 40px;
    position: absolute;
    right: -10px;
    top: 0px;
  }
  .button {
    margin: 20px 0 0 50px
  }
}
</style>
