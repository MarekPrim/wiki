

<template>
  <article class="bg-slate-900" id="view">
    <li v-for="page of data" :key="page.id">
      <p class="text-green-700">{{ page.id }}</p>
    </li>
  </article>
</template>
<style scoped>
#view {
  width: 75vw;
  height: 80vh;
  margin: auto;
  padding: 1em;
  border-radius: 1em;
}
textarea {
  width: 40vw;
  height: 100%;
  border: none;
  background-color: #f5f5f5;
  resize: none;
  font-family: "Roboto", sans-serif;
  font-size: 1.2em;
  padding: 1em;
}
</style>

<script>
import feathers from "@feathersjs/client";
import io from "socket.io-client";
export default {
  name: "List page",
  data() {
    return {
      data: false,
    };
  },
  mounted() {
    const app = feathers();
    const socket = io("http://localhost:3030",{
        path: '/gallery-socket-io',
        transports: ["websocket"], // mandatory with Vite
    })
    app.configure(feathers.socketio(socket))
    app.service('/api/pages').find({}).then(usersList => {
        this.data = usersList;
        console.log(this.data);
    })
  }
};
</script>