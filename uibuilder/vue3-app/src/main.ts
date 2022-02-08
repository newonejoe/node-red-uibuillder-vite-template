import { createApp } from 'vue'
import App from './App.vue'
import uibuilderPlugin from './plugin/uibuilderPlugin';

const app = createApp(App);

// use uibuilderPlugin
app.use(uibuilderPlugin, { 'nameSpace': '/vue3-app' });

// mount app
app.mount('#app')
