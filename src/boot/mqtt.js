import VueMqtt from 'vue-mqtt'
// import fs from 'fs' //not working

export default ({ Vue }) => {
  let options={ 
    username:"frrut",
    password:"abc123",
    clientId: ('WebClient-' + parseInt(Math.random() * 100000)),
  };
  // let url= 'wss://mk100.frrut.net:9000/mqtt';
  let url = 'http://192.168.168.10:9000/mqtt';
  Vue.use(VueMqtt, url, options);
}
