import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
