<script setup>
import { useRoute } from 'vue-router';
import Sidebar from './landing/Sidebar.vue';
import Markdown from './Markdown.vue';
const route = useRoute();
const name = route.params.name;
</script>

<template>
  <div>
    <Sidebar />
    <article class="bg-slate-50" id="view">
      <div class="article">
        <a :href="'/edit/' + name" class="text-left no-print"
          >Passage au mode édition</a
        >
        <Markdown :name="name" />
      </div>
    </article>
  </div>
</template>
<style scoped>
#view {
  width: 75vw;
  height: fit-content;
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
