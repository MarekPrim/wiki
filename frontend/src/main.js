import { createApp } from 'vue';
import router from './router';
import Markdown from 'vue3-markdown-it';
import App from './App.vue';
import { marked } from 'marked';
import VueResource from 'vue-resource';
const markedMixin = {
  methods: {
    md: function (input) {
      return marked(input);
    },
  },
};

createApp(App).use(router).use(Markdown).mixin(markedMixin).mount('#app');
