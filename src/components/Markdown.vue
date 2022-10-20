<template>
  <p v-html="obj.html"></p>
  <div v-if="!obj.valid"><Add :name="html" /></div>
</template>

<script>
import { marked } from 'marked';
import Add from './Add.vue';
export default {
  name: 'Markdown viewer',
  props: ['html', 'valid'],
  data: function () {
    return {
      obj: {
        html: 'loading... (2)',
        valid: true,
      },
    };
  },
  created: async function () {
    let fileFetch = await this.getMarkdown();
    console.log(fileFetch);
    this.obj.html = marked(fileFetch.message);
    this.obj.valid = fileFetch.exist;
  },
  methods: {
    getMarkdown: async function () {
      const resp = await fetch(`http://localhost:4000/file/${this.html}`).then(
        (response) => {
          return response.json();
        }
      );
      console.log(`test_resp :`, resp);
      return resp;
    },
  },
  components: { Add },
};
</script>
