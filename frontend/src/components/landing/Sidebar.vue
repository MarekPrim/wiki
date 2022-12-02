<script setup>
defineProps({
  url: String
})

</script>

<template>
    <div class="sidebar bg-slate-300 text-black">
				<div class="logo">
					<a href="/"><img src='./logo.png' alt="logo"></a>
                    <p class="text-xs">Gracefully generated logo by <a href="https://openai.com/dall-e-2/">DALL-E AI</a>. Check out their work !</p>
				</div>
				<div class="navigation ">
					<ul>
						<li><a href="/">Main page</a></li>
						<li><a href="/pages">Contents</a></li>
					</ul>
				</div>

			
			</div>
</template>

<style scoped>
.sidebar {
    position:fixed;
    top:30%;
    left:1%;
}
</style>