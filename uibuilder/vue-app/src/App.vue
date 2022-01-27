<template>
  <div>
    Received Message:
    <br />
    Topic: [{{msgReceivedTopic}}]
    <br />
    Payload: [{{msgReceivedPayload}}]
  </div>
</template>

<script>
  import uibuilder from 'node-red-contrib-uibuilder/front-end/src/uibuilderfe.js'

  export default {
    data() {
      return {
        msgReceivedTopic: "",
        msgReceivedPayload: "" ,
      }
    },
    created(){
      // start uibuilder socket.io
      uibuilder.start();
    },
    methods:{
    },
    mounted() {
      const that = this;
      // msg onChange handler
      uibuilder.onChange('msg', (newValue)=>{
        console.log(newValue);
        that.msgReceivedTopic = newValue.topic;
        that.msgReceivedPayload = newValue.payload;
      });
    }
  }

</script>

