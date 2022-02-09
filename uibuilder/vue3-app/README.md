# Vue 3 + Vite + Typescript + Node-Red + Uibuilder
In this template, we will use uibuilder with vue3 and typescript.


## Setup
This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.


    // create the template
    yarn create vite
    // choose vue3  and typescript in wizard


Add uibuilder dependency, we are using the uibuilder to get message from node-red and also send it back.

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
## How to use uibuilder.js with vue 3 plugin provide and inject pattern
In the project, we create a vue plugin, src/plugin/uibuilderPlugin.ts. It's used to receive and process message from node-red. Expose data and method globally. With this approach, we can inject the messages or processed datum in any vue component with the injection. You can treat this as a compact vuex store instance for small projects.

### Create the uibuilderPlugin
In this plugin, we define the asyncData and send2NR for globally access. The uibuilder instance is also started.
```typescript
// src/plugin/uibuilderPlugin.ts
export default {
  install: (app: App, options: {nameSpace:string}) => {
    /* our code for the plugin goes here
       app is the result of createApp()
       options is user options passed in. We pass the uibuilder node url here for connection */

    // get nameSpace the same as uibuilder node url. eg: '/vue3-app'
    const { nameSpace } = options;


    // define the reactive data used for this app
    const reactiveAsyncData = reactive<IData>({
      topic: '',
      payload: '',

      // define more here
    });

    // provide asyncData globally
    app.provide('asyncData', reactiveAsyncData);


    // messageHandler
    const messageHandler = () => {
      uibuilder.onChange('msg', (newValue:{topic:string, payload:string}) =>{
        reactiveAsyncData.topic = newValue.topic;
        reactiveAsyncData.payload = newValue.payload;

        // topic process logic here
        switch(newValue.topic){

        }
      })
    }

    // start messageHandler
    messageHandler();

    // start uibuilder instance
    uibuilder.start(nameSpace);

    // send message back to node-red
    const send2NR = (topic: string, payload: string):void => {
      console.log(topic, payload);
      uibuilder.send({
        'topic': topic,
        'payload': payload
      });
    }

    // provide send command to node-red globally
    app.provide("send2NR", send2NR);
  }
}
```
### Register plugin in src/main.ts
```typescript
// src/main.ts
import {createApp} from 'vue'
import App from './App.vue'
import uibuilderPlugin from './plugin/uibuilderPlugin';

const app = createApp(App);

// use uibuilderPlugin
app.use(uibuilderPlugin, {'nameSpace': '/vue3-app'});

// mount app
app.mount('#app')
```

### Use data and method by injection in component src/components/HelloWorld.vue
In the component, we inject the data and method provided by the plugin and then use it in the tempalte for data access or sending the message back to node-red.
```typescript
// src/components/HelloWorld.vue
<script setup lang="ts">
import { ref, inject  } from 'vue'
import IData from '../interface/IData'
...
const send2NR = inject('send2NR') as (topic: string, payload: string) => void;

const asyncData = inject('asyncData') as IData;
...
</script>
<template>
...
      <h2>Received</h2>
      <input className="box-topic" readonly type="text" placeholder="Received Topic"  v-model="asyncData.topic"/>
      <textarea className="box-message" readonly type="text" placeholder="Received Payload" v-model="asyncData.payload" />
...
      <h2>Send</h2>
      <input className="box-topic" type="text" placeholder="type topic" v-model="topic"/>
      <textarea className="box-message" type="text" placeholder="press enter to send" v-model="payload" @keyup.enter.exact="send2NR(topic, payload)"/>
...
</template>
```



## How to develope
Start dev server in shell(CMD, Powershell, Bash) in vue3-app folder, default link is http://localhost:3000
```
yarn dev
```
Open Brower and try changing something to see the update in the web page with following link http://localhost:3000/

You can even use `yarn build --watch` as an option to build the dist files when you change any source files in case your project is small and compact. You will lose time if the project is complex and consuming more time for buiding.
```
yarn build --watch
```
## How to build
Change the build options:
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
