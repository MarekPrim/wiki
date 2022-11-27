<script setup>
import { useRoute } from 'vue-router';
import Markdown from './Markdown.vue';
// import Markdown from "./Markdown.vue"
const route = useRoute();
const name = route.params.name;
</script>

<template>
  <div>
    <div class="sidebar bg-slate-300 text-black">
				<div class="logo">
					<a href="/"><img src='../../assets/logo.png' alt="logo"></a>
                    <p class="text-xs">Gracefully generated logo by <a href="https://openai.com/dall-e-2/">DALL-E AI</a>. Check out their work !</p>
				</div>
				<div class="navigation ">
					<ul>
						<li><a href="pages">Main page</a></li>
						<li><a href="#">Contents</a></li>
					</ul>
				</div>

			
			</div>
  <article class="bg-slate-50" id="view">
    <div class="article">
      <a :href="'/edit/' + name" class="text-left">Edit</a>
      <Markdown :name="name" />
    </div>
  </article></div>
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
