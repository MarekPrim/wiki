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


      <div v-if="img.startsWith('u')">
         <p>{{img}}</p>
      </div>
      <div v-else>
         <p>QUOI ! Ca ne commence pas par U</p>
      </div>

</template>
<style scoped>
.image:hover{
    filter: drop-shadow(0 0 2em #646cffaa);
}
</style>