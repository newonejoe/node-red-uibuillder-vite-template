import { defineConfig } from 'vite'
//imort vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
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
  build:{
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        manualChunks: undefined,
        assetFileNames: `[name].[ext]`,
        // format: 'cjs',
      },
    },
    // prevent vendor.css
    cssCodeSplit: false,
    // prevent
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
