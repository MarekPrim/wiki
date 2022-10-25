<template>
  <div>
    <div>
      <div class="flex flex-row justify-around items-center text-black">
        <p class="text-3xl font-bold">
          {{ name }}
        </p>
        <p class="text-xs font-light" v-if="author.length>0">
          par {{ author }}
        </p>
      </div>

      <h4 v-if="description.length>0">
        Brief : {{description}}
      </h4>
    </div>

    <div class="m-10 bg-slate-100">
      <p class="text-black" v-html="html"></p>
    </div>
    


    <div v-if="!valid">
      <Add :name="name" />
    </div>
    
    <div class="mt-10 text-black">Footer</div>
  </div>
</template>

<script>
import { marked } from "marked";
import Add from "./Add.vue";
import feathers from "@feathersjs/client";
import io from "socket.io-client";
marked.setOptions({
  breaks: true,
});
export default {
  name: "Markdown viewer",
  props: ["name"],
  data: function () {
    return {
      html: "loading... (2)",
      author: "",
      description : "",
      valid: true,
    };
  },
  mounted() {
    const app = feathers();
    const socket = io("http://localhost:3030", {
      path: "/gallery-socket-io",
      transports: ["websocket"], // mandatory with Vite
    });
    app.configure(feathers.socketio(socket));
    app
      .service("/api/pages")
      .find({
        query: {
          id: this.$props.name,
        },
      })
      .then((usersList) => {
        this.html = marked(usersList[0].markdown);
        this.author = usersList[0].author;
        this.description = usersList[0].description;
        this.valid = true;
      })
      .catch((err) => {
        this.html = "Page not found";
        this.valid = false;
      });
  },
  components: { Add },
};
</script>
