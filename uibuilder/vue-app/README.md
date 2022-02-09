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
```javascript
// vite.config.js
import { createVuePlugin } from 'vite-plugin-vue2'

export default {
  plugins: [
    createVuePlugin(/* options */)
  ],
}
```

Change the main.js and vue files to vue2 format.

Add uibuilder dependency, we are using the uibuilder in src\App.vue to get messages from node-red.

    yarn add node-red-contrib-uibuilder
    yarn add socket.io-client

Add proxy in development mode to ensure the connection to node-red is accessable

```javascript
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
```
## How to use uibuilder.js
In the project, we put the uibilder.start() in the App.vue created() hooks. '/vue-app' is the namespace parameter for uibuilder start method. This arguement '/vue-app' must be the same with the uibuilder node url. Or you will face socket-io invalid namespace issue.
You can also put the uibuilder related staff into a service, register a instance and started in App.vue or main.js.
```javascript
// src/App.vue in the created hook
    ...
  // start uibuilder
  created() {
    uibiulder.start("/vue-app")
  },
  // process the message
  mounted() {
    const that = this;
    uibuilder.onChange('msg', (message)=>{
      console.log(message);
      that.msgReceivedTopic = message.topic;
      this.msgReceivedPayload = message.payload;
    })
  }
```

## How to develope
Start dev server by run below command in shell(CMD, Powershell or Bash) in vue-app folder, default link is http://localhost:3000

    yarn dev

Open Brower and try change something to see the update in web page with following link http://localhost:3000/

You can even use `yarn build --watch` as an option to build the dist files when you change any source files in case your project is small and compact. You will lose time if the project is complex and consuming more time for buiding.
```
yarn build --watch
```

## How to build
Change the base path (`the default path is '/'`) in vite.config.js options:
```javascript
// vite.config.js
export default defineConfig({
  base: './'
})
```
Run build command to generate the dist folder and static files
```
yarn build
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
