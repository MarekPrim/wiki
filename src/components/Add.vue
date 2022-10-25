<script>
import FrontMatter from 'front-matter';
import { marked } from 'marked';
import axios from 'axios';
// import Vue from 'vue';

export default {
  name: 'AddPage',
  props: ['name'],
  data: function () {
    return {
      previewMarkdown: false,
      startContent: `---
title:
short_description:
tags:
post_image:
publish: false
---

Write content here
`,
      allContent: '',
      articleData: '',
    };
  },
  computed: {
    compiledMarkdown() {
      let data = FrontMatter(this.allContent);
      return marked(data.body);
    },
  },
  mounted() {
    this.allContent = this.startContent;
    this.previewMarkdown = false;
  },
  methods: {
    postServer() {
      const { body, attributes } = FrontMatter(this.allContent);
      this.$nextTick(() => {
        let articleData = {
          content: body,
          title: attributes.title,
          description: attributes.short_description,
          tags: attributes.tags,
          image: attributes.post_image,
          publish: attributes.publish,
        };
        console.log(articleData);
        axios.post('http://localhost:3030/api/pages', {
          id: this.$props.name,
          author: articleData.title,
          markdown : articleData.content
        }).then((response) => {
          console.log(response);
        }).catch((error) => {
          console.log(error);
        });
      });

      // Then proceed to using articleData object as needed
    },
  },
};
</script>

<template>
  <a>Add the {{ name }} page</a>
  <div id="editor-form-container" class="uk-margin text-black">
    <div id="button-container">
      <button
        v-on:click="previewMarkdown = !previewMarkdown"
        class="uk-button uk-button-primary uk-float-left"
      >
        {{ previewMarkdown ? 'Edit Article' : 'Preview Article' }}
      </button>
    </div>
    <div id="editor-container">
      <textarea
        v-if="!previewMarkdown"
        id="d1"
        v-model="allContent"
        class="uk-textarea editor"
      ></textarea>
      <div v-else class="preview" v-html="compiledMarkdown"></div>
    </div>
    <button v-on:click="postServer" class="uk-button uk-button-primary">
      Send this to the server
    </button>
  </div>
</template>
