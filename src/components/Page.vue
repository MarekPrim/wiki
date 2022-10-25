<script setup>
import { useRoute } from 'vue-router';
import Markdown from './Markdown.vue';
// import Markdown from "./Markdown.vue"
const route = useRoute();
const name = route.params.name;
</script>

<template>
  <article class="bg-slate-50" id="view">
    <div class="article">
      <Markdown :name="name" />
    </div>
  </article>
</template>
<style scoped>
#view {
  width: 75vw;
  height: 80vh;
  margin: auto;
  padding: 1em;
  background-color: #f5f5f5;
  border-radius: 1em;
}
textarea {
  width: 40vw;
  height: 100%;
  border: none;
  background-color: #f5f5f5;
  resize: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2em;
  padding: 1em;
}
</style>
