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

Open Brower and test with following link http://localhost:3000/react-app. <font color='red'>Attention!!!</font>, the url must end with the react-app. The project folder name, url end and the url in the uibuilder node must be the same. Or you will face socket-io invalid namespace issue.

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
