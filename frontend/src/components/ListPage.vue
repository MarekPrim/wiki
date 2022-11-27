

<template>
  <article class="bg-slate-900" id="view">
    <li v-for="page of data" :key="page.id"
      @mouseover="hover=page.id"
      @mouseleave="hover=false"
      class="flex flex-col justify-center items-center p-4 m-4 bg-slate-50 rounded-lg shadow-lg"
    >
      <a
      :href="'/page/' + page.id"
      class="text-green-700"
      >
        {{ page.id }}
    </a>
      <span v-if="hover==page.id" class="text-black font-light text-base">{{page.description}}</span>
    </li>
  </article>
</template>


<script>
import feathers from "@feathersjs/client";
import io from "socket.io-client";
export default {
  name: "List page",
  data() {
    return {
      data: false,
      hover: false,
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
    app.service('/api/pages')
      .on('created', message => {
        console.log('New message created', message);
        this.data.push(message);
      });
  }
};
</script>

<style scoped>
#view {
  width: 75vw;
  height: min-content;
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