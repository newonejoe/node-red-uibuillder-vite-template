import { defineConfig } from 'vite'
//imort vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    // vue2
    createVuePlugin()
    // vue3
    // vue()
  ],
  optimizeDeps: {
    include: [
      'node-red-contrib-uibuilder/front-end/src/uibuilderfe.js',
    ]
  },
  server:{
    proxy:{
      '/uibuilder':{
        target: "http://localhost:1880/uibuilder",
        changeOrigin: true,
        ws:true,
        rewrite: (path)=>path.replace(/\/uibuilder/, ''),
      },
    }
  }
})
