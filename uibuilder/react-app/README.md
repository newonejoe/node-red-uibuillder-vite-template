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
## How to develope
Start dev server in shell(CMD, Powershell, Bash) in react-app folder, default link is http://localhost:3000
```
yarn dev
```
Open Brower and try changing something to see the update in the webpage with following link http://localhost:3000.

You can even use `yarn build --watch` as an option to build the dist files when you change any source files in case your project is small and compact. You will lose time if the project is complex and consuming more time for buiding.
```
yarn build --watch
```


## How to build
Change the base path (`the default path is '/'`) in the vite.config.js :
```javascript
// vite.config.js
export default defineConfig({
  base: './'
})
```
Run below build command to generate the dist folder and static files.
```
yarn build
```

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/)
