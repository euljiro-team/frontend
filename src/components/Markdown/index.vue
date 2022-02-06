<template>
  <div class="textarea markdown-body" v-html="compiledMarkdown"></div>
</template>

<script>
import {marked} from "marked";

export default {
  name: "MarkdownDisplay",
  props: {
    markdown: {
      type: String,
      required: true,
    }
  },
  // mounted() {
  //   hljs.highlightAll()
  // },
  computed: {
    compiledMarkdown: function () {
      return marked(this.markdown, {sanitize: true})
    }
  }
}
</script>

<style>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 20px;
  text-align: left;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}
</style>
