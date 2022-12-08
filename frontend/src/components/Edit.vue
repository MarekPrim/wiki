<script>
import FrontMatter from 'front-matter';
import { marked } from 'marked';
import feathers from '@feathersjs/client';
import io from 'socket.io-client';
import { useRoute } from 'vue-router';
import Sidebar from './landing/Sidebar.vue';
const app = feathers();
const socket = io('http://localhost:3030', {
  path: '/gallery-socket-io',
  transports: ['websocket'], // mandatory with Vite
});
app.configure(feathers.socketio(socket));
import hljs from 'highlight.js';
// import Vue from 'vue';
marked.setOptions({
  breaks: true,
  highlight: function(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
});
export default {
  name: 'EditPage',
  data: function () {
    return {
      html: 'loading... (2)',
      author: '',
      description: '',
      valid: true,
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
    const app = feathers();
    const socket = io('http://localhost:3030', {
      path: '/gallery-socket-io',
      transports: ['websocket'], // mandatory with Vite
    });
    app.configure(feathers.socketio(socket));
    console.log(this.$props.name);
    const route = useRoute();
    const name = route.params.name;
    console.log(name);
    app
      .service('/api/pages')
      .find({
        query: {
          id: name,
        },
      })
      .then((usersList) => {
        this.html = marked(usersList[0].markdown);
        this.author = usersList[0].author;
        this.description = usersList[0].description;
        this.valid = true;
        this.allContent = `---
author: ${usersList[0].author}
short_description: ${usersList[0].description}
---

${usersList[0].markdown}


`;
      })
      .catch((err) => {
        this.html = 'Page not found';
        this.valid = false;
      });
  },
  methods: {
    patchServer() {
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
        console.log(location.pathname);
        const name = location.pathname.split('/').pop();
        console.log(name);
        app.service('/api/pages').patch(
          name,
          {
            author: articleData.author,
            markdown: articleData.content,
            description: articleData.description,
          },
          null
        );
        app.service('/api/pages').emit('patch', articleData);
        location.assign('/page/' + name);
      });
    },
  },
  components: { Sidebar },
};
</script>

<template>
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
    <article class="bg-slate-50" id="view">
      <Sidebar />
      <div class="article">
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
      </div>
    </article>

    <button
      v-on:click="patchServer"
      class="uk-button uk-button-primary no-print"
    >
      Ajouter cette page sur Wikue
    </button>
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
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#view {
  width: 75vw;
  height: max-content;
  margin: auto;
  padding: 1em;
  background-color: #f5f5f5;
  border-radius: 1em;
}
</style>
