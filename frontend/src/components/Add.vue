<script>
import FrontMatter from 'front-matter';
import { marked } from 'marked';
import feathers from '@feathersjs/client';
import io from 'socket.io-client';

const app = feathers();
const socket = io('http://localhost:3030', {
  path: '/gallery-socket-io',
  transports: ['websocket'], // mandatory with Vite
});
app.configure(feathers.socketio(socket));
// import Vue from 'vue';
marked.setOptions({
  breaks: true,
});
export default {
  name: 'AddPage',
  props: ['name'],
  data: function () {
    return {
      previewMarkdown: false,
      startContent: `---
author: <your name>
short_description: <your short description>
---

# <your title>

<your content>

## Notes et références


## Bibliographie


`,
      allContent: '',
      articleData: '',
    };
  },
  computed: {
    compiledMarkdown() {
      let data = FrontMatter(this.allContent);
      console.log('data_boyd', data.body);

      let md = marked(data.body);
      console.log('md', md);
      return md;
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
          author: attributes.author,
          description: attributes.short_description,
        };
        if (
          articleData.author == '<your name>' ||
          articleData.description == '<your short description>'
        ) {
          alert('Please fill the author and the description');
          return;
        }
        console.log(articleData);
        socket.emit(
          'create',
          '/api/pages',
          {
            id: this.$props.name,
            author: articleData.author,
            markdown: articleData.content,
            description: articleData.description,
          },
          (error, message) => {
            if (error) {
              console.log('error', error);
              //return;
            } else {
              console.log('Page created', message);
              location.assign('/page/' + this.$props.name);
            }
            

            
          }
        );
      });

      // Then proceed to using articleData object as needed
    },
  },
};
</script>

<template>
  <div>
    <a>Add the {{ name }} page with the editor below</a>
    <div
      id="editor-form-container"
      class="flex-col align-middle justify-center p-6"
    >
      <div id="button-container" class="no-print">
        <button
          v-on:click="previewMarkdown = !previewMarkdown"
          class="uk-button uk-button-primary uk-float-left"
        >
          {{ previewMarkdown ? 'Edit Article' : 'Preview Article' }}
        </button>
      </div>
      <div id="editor-container" class="p-6">
        <textarea
          v-if="!previewMarkdown"
          v-model="allContent"
          class="lock p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="markdown-editor"
        ></textarea>
        <div
          v-else
          class="preview my-6 mx-auto p-6 bg-slate-200 text-green-700 w-1/2"
          v-html="compiledMarkdown"
        ></div>
      </div>
      <button
        v-on:click="postServer"
        class="uk-button uk-button-primary no-print"
      >
        Envoyer les mises à jour sur le serveur
      </button>
    </div>
  </div>
</template>

<style scoped>
#editor-form-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#button-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
}

#editor-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#markdown-editor {
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
