# node-red-uibuillder-vite-template

## This is a tempalte about Node-Red uibuilder and vite
[Vite](https://vitejs.dev/) (French word for "quick", pronounced /vit/, like "veet") is a new breed of frontend build tool that significantly improves the frontend development experience. 

## How does this tempalte works?
The rule for uibuilder is simple and elegant: "Make sure there is index.html in the src or dist folder and all its resources available". During my struggle with following the vue and webpack approach from the nodered forum, the main problem is comming from the src path(.js .css .icon .svg) in the dist index.html. It finally worked after changing those path to uibuilder rule (eg: from src="/index.js" to src="index.js" or src="./index.js"). The second problem: poor debugging feedback because you have to build first and then check the change.

### Uibuilder dist folder formatting
The answer is add a format.js script and exceute this after build
```json
// package.json
build: vite buid && node ./scripts/format.js
```
### Better debugging experience
Run vite dev command

    yarn dev

### How to use uibuilder frontend library
Install libraries

    yarn add node-red-contrib-uibuilder
    yarn add socket.io-client

Add optimizaDeps in vite.config.json
```javascript
// vite.config.json
defineConfig({
  ...
  optimizeDeps: {
      include: [
          'node-red-contrib-uibuilder/front-end/src/uibuilderfe.js'
      ]
  }
  ...
})
```

## Steps
    // Create a project in the node red.

    // Change the Node-Red Project Settings-Dependencies
        Add node-red-contrib-uibuilder

    // Create a uibuilder node
        Create a simple flow and drag a uibuider node in
        Double click this node
            Change Properties 'Name' and 'URL' to 'react-app' or 'vue-app'
            Expand Advanced Settings: set Template to 'dist' instead of 'src'
        Save and deploy

    // Go to uibuilder folder and create react-app or vue-app with vite

Reference the README file inside each folder [vue-app](https://github.com/newonejoe/node-red-uibuillder-vite-template/tree/main/uibuilder/vue-app) [react-app](https://github.com/newonejoe/node-red-uibuillder-vite-template/tree/main/uibuilder/react-app) for details.



