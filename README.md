# node-red-uibuillder-vite-template

## This is a tempalte about Node-Red uibuilder and vite
Vite (French word for "quick", pronounced /vit/, like "veet") is a new breed of frontend build tool that significantly improves the frontend development experience. It consists of two major parts:Vite is most powerful

## How does this tempalte works?
The rule for uibuilder is simple and elegant: "Make sure there is index.html in the src or dist folder and all its resources available". During my struggle with following the vue and webpack approach from the nodered forum, the main problem is comming from the src path(.js .css .icon .svg) in the dist index.html. It finally worked after changing those path to uibuilder rule (eg: from src="/index.js" to src="index.js" or src="./index.js"). The second problem: poor debugging feedback because you have to build first and then check the change.

### uibuilder dist folder formatting
The answer is add a format.js script and exceute this after build

    // package.json
    build: vite buid && node ./scripts/format.js

### better debugging experience
Run vite dev command

    // package.json
    yarn dev

You will get an socket.io invalid namespace error if check the default url 'http://localhost:3000'. In side the uibuilder.js, there is a wrapper about socket.io which would check if the io namespace is equal to uibuilder node's url(eg: vue-app) in the flow. The uibuilder.js would get it from the url 'http://localhost:3000' and get 'undefined', which causing the socke.io connection issue. The walkaround is add the namespace at the url end: 'http://localhost:3000/vue-app'. Bingo, you can feel the power of vite and pick any front-end lib(React, Vue, Svelte) or framework you like.


## Steps
    // Create a project in the node red.

    // Change the Project Settings-Dependencies
        Add node-red-contrib-uibuilder

    // Create a uibuilder node
        Create a simple flow and drag a uibuider node in
        Double click this node
            Change Properties 'Name' and 'URL' to 'react-app' or 'vue-app'
            Expand Advanced Settings: set Template to 'dist' instead of 'src'
        Save and deploy

    // Go to uibuilder folder and create react-app or vue-app with vite
    
Reference the README file inside each folder [vue-app](https://github.com/newonejoe/node-red-uibuillder-vite-template/tree/main/uibuilder/vue-app) [react-app](https://github.com/newonejoe/node-red-uibuillder-vite-template/tree/main/uibuilder/react-app) .



