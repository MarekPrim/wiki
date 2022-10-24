<script>
import {defineComponent} from 'vue';
import feathers from '@feathersjs/client'
import io from 'socket.io-client'
export default defineComponent({
    async setup() {
        const app = feathers()
        console.log(app.pages);
// with no argument, connection is made with the server which served index.html
        const socket = io("http://localhost:3030",{
            path: '/gallery-socket-io',
            transports: ["websocket"], // mandatory with Vite
        })
        const users = [];
        app.configure(feathers.socketio(socket))
        app.service('pages').find({}).then(usersList => {
            usersList.forEach((e)=>{
                users.push(e)
            })
        })
        //const users = await fetch("http://localhost:3030/api/pages").then(res => res.json());
        console.log(users);
        return {
            users
        }
    }
})
</script>

<template>
    <article class="bg-slate-900" id="view">

            <li v-for="user in users" :key="user.id">
                <p class="text-green-700">{{ user.id }}</p>
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
  font-family: 'Roboto', sans-serif;
  font-size: 1.2em;
  padding: 1em;
}
</style>
