<script setup>
import {onMounted, ref} from 'vue'

defineProps({
  img: String
})

onMounted(() => {
  alert("Image mounted");
})

</script>

<template>


      <div v-if="img.startsWith('i')">
         <p>Contenu de page wiki yadayada{{img}}</p>
      </div>
      <div v-else>
         <p>Cette page n'existe pas, il faut la créer</p>
      </div>

</template>
<style scoped>
.image:hover{
    filter: drop-shadow(0 0 2em #646cffaa);
}
</style>