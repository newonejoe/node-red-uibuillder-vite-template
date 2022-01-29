# Vite + React + UiBuilder

## Setup
This template should help get you started developing with React in Vite.

    // create the template
    yarn create vite
    // choose react.js in wizard

Add uibuilder dependency, we are using the uibuilder in src\App.jsx to get messages from node-red.

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
In the project, we put the uibilder.start() in the App.jsx useEffect() hooks. '/react-app' is the namespace parameter for uibuilder start method. It must be the same with uibuilder node url setting. Or you will face socket-io invalid namespace issue.
You can also put the uibuilder related staff into a service, register a instance and started in App.jsx or main.js.
```javascript
// src/App.jsx
import uibuilder from 'node-red-contrib-uibuilder/front-end/src/uibuilderfe.js'
  ...
  const [receivedTopic, setReceivedTopic] = useState('');
  const [receivedPayload, setReceivedPayload] = useState('');

  useEffect(() => {
    // start uibuilder
    uibuilder.start('/react-app');
    // process the message
    uibuilder.onChange('msg', (message)=>{
      console.log(message);
      setReceivedTopic(message.topic);
      setReceivedPayload(message.payload);
    })
  },[]);
  ...
```
## How to test
Start dev server in shell in vue-app folder, default link is http://localhost:3000

    yarn dev

Open Brower and test with following link http://localhost:3000.

## How to build
Change the build options:
```javascript
// vite.config.js
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
```

Add a format script[scripts/format.js] and use is during build. Change this script accordingly to format the index.html in dist folder.

```json
    "build": "vite build
```
```json
    "build": "vite build && node ./scripts/format.js",
```
## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
