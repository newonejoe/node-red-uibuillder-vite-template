# Vite + Vue2 + UiBuilder

## Setup
This template should help get you started developing with Vue 2 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

    // create the template
    yarn create vite
    // choose vue3 in wizard

    // add vite-plugin-vue2
    yarn add vite-plugin-vue2 -D

    // add vue-template-compiler
    yarn add vue-template-complier


Then we need to change the vite.config.js to use vue2 plugin

    import { createVuePlugin } from 'vite-plugin-vue2'

    export default {
      plugins: [
        createVuePlugin(/* options */)
      ],
    }

Change the main.js and vue files to vue2 format.

Add uibuilder dependency, we are using the uibuilder in src\App.vue to get messages from node-red.

    yarn add node-red-contrib-uibuilder
    yarn add socket.io-client

Add proxy in development mode to ensure the connection to node-red is accessable

    // vite.config.js
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

## How to test
Start dev server in shell in vue-app folder, default link is http://localhost:3000

    yarn dev

Open Brower and test with following link http://localhost:3000/vue-app. <font color='red'>Attention!!!</font>, the url must end with the vue-app. The project folder name, url end and the url in the uibuilder node must be the same. Or you will face socket-io invalid namespace issue.

## How to build
Change the build options:

    build:{
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          manualChunks: undefined,
          assetFileNames: `[name].[ext]`,
        },
      },
      // prevent vendor.css
      cssCodeSplit: false,
      // prevent
    },


    test: yarn dev
    buid: yarn build

Add a format script[scripts/format.js] and use is during build. Change this script accordingly to format the index.html in dist folder.

    // change the package.json build command
    // from
    "build": "vite build
    // to
    "build": "vite build && node ./scripts/format.js",

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
