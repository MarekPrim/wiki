<template>
  <div>
    <h1>{{name}}</h1>
    <p class="text-black" v-html="html"></p>
  <div v-if="!valid"><Add :name="name" /></div>
  </div>
  
</template>

<script>
import { marked } from 'marked';
import Add from './Add.vue';
import feathers from "@feathersjs/client";
import io from "socket.io-client";

export default {
  name: 'Markdown viewer',
  props: ['name'],
  data: function () {
    return {

        html: 'loading... (2)',
        valid: true,

    };
  },
  mounted (){
    const app = feathers();
    const socket = io("http://localhost:3030",{
        path: '/gallery-socket-io',
        transports: ["websocket"], // mandatory with Vite
    })
    app.configure(feathers.socketio(socket))
    app.service('/api/pages').find({
        query:{
            id: this.$props.name
        }
    }).then(usersList => {
        this.html = marked(usersList[0].markdown);
        this.valid = true;
    }).catch(err => {
        this.html = 'Page not found';
        this.valid = false;
    })
  },
  components: { Add },
};
</script>
