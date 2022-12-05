import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import mdPlugin, { Mode } from 'vite-plugin-markdown';

// https://vitejs.dev/config/
console.log(Mode);

export default defineConfig({
    plugins: [vue(), mdPlugin({ mode: Mode.VUE })],
    server: {
        port: 3000,
    }
});