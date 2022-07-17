import { App, provide, reactive, ref } from 'vue'
// @ts-ignore
import uibuilder from 'node-red-contrib-uibuilder/front-end/uibuilder.esm.js'
import IData from '../interface/IData';


export default {
  install: (app: App, options: {nameSpace:string}) => {
    /* our code for the plugin goes here
       app is the result of createApp()
       options is user options passed in. We pass the uibuilder node url here for connection */

    // get nameSpace the same as uibuilder node url. eg: '/vue3-app'
    const { nameSpace } = options;


    // defien the reactive data used for this app
    const reactiveAsyncData = reactive<IData>({
      topic: '',
      payload: '',
      // define more here
    });

    // provide asyncData global
    app.provide('asyncData', reactiveAsyncData);


    // messageHandler
    const messageHandler = () => {
      uibuilder.onChange('msg', (newValue:{topic:string, payload:string}) =>{
        reactiveAsyncData.topic = newValue.topic;
        reactiveAsyncData.payload = newValue.payload;

        // topic logic here
        switch(newValue.topic){

        }
      })
    }

    // start messageHandler
    messageHandler();

    // start uibuilder instance
    uibuilder.start(nameSpace);

    /* send message back to node-red*/
    const send2NR = (topic: string, payload: string):void => {
      console.log(topic, payload);
      uibuilder.send({
        'topic': topic,
        'payload': payload
      });
    }

    /* send control command to node-red*/
    app.provide("send2NR", send2NR);
  }
}
