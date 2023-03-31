<template>
  <q-page class="column items-center">
    
    <div class="menu">
      <span class="app-name">
        Preview
        <br>
        <small>(For reference only)</small>
        <br>
      </span>
      <div class="testarea q-mt-md row items-center justify-between">
        Heat Sound
        <q-btn v-if="!isSound" round color="primary" icon="play_arrow" @click="playSound"/>
        <q-btn v-else round color="primary" icon="stop" @click="pauseSound"/>
      </div>
    </div>
    <div class="q_page">
      <!-- {{debugTxt}} -->
      <!-- Marquee -->
      <div v-if="marq_obj" :style="'height:'+v1+'%;background-color:DodgerBlue;'">
        <marquee-text class="marquee" :duration="marq_obj.duration">{{marq_obj.text}}</marquee-text>
      </div>
      <!-- Temperature  -->
      <div class="temp_dialog">
        <q-card class="temp_card">
          <q-card-section style="padding:6px 16px;">
            <div class="row justify-between">
              <div class="row col items-center">
                <div class="col-auto text-center">
                  <!-- env icon -->
                  <q-icon v-if="temp_obj.event=='env'" class="text-primary" size="30px" name="filter_drama" /> 
                  <!-- human icon -->
                  <q-icon v-if="temp_obj.event!='env'" :class="temp_obj.event!='fever'?(temp_obj.event=='env'?'text-primary':'text-green-6'):'text-negative'" size="30px" name="accessibility" /> 
                </div>
                <div class="col text-center">
                  <!-- {{temp}} -->
                  <a :class="temp_obj.event!='fever'? (temp_obj.event=='env'?'text-primary':'text-green-6'):'text-negative'" style="font-size: 32px;">{{temp_obj.temp}}</a>
                  <a :class="temp_obj.event!='fever'? (temp_obj.event=='env'?'text-primary':'text-green-6'):'text-negative'" style="font-size: 18px;">°C</a>
                </div>  
              </div>
              <div class="column col-4 items-end">
                <div v-if="temp_obj.event=='env'" class="col text-primary temp-state">Env</div>
                <div v-if="temp_obj.event=='normal'" class="col text-green-6 temp-state">Normal</div>
                <div v-if="temp_obj.event=='fever'" class="col text-negative temp-state">Fever</div>

                <div class="col text-right">
                  <a v-if="temp_range" class="text-grey" style="font-size: 10px;">
                    {{temp_range.low}}~{{temp_range.high}}
                  </a>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- VIDEO / PNG -->
      <div class="column" :style="'height:'+(100-v1)+'%'">
        <div class="col-auto">
          <div class="row">
            <!-- Top Video -->
            <div v-if="top_video" class="col-lg-12 col-12">
              <q-media-player
                type="video"
                background-color="black"
                :muted="false"
                :autoplay="true"
                :sources="top_video"
                :loop="true"
                :disabled-seek="true"
                :hide-volume-btn="true"
                :no-controls="true"
                ref="qmp_top_video"
              ></q-media-player>
            </div>
            <!-- Center Video -->
            <div v-if="center_video" class="col-lg-12 col-12">
              <q-media-player
                type="video"
                background-color="black"
                :muted="true"
                :autoplay="true"
                :sources="center_video"
                :loop="true"
                :disabled-seek="true"
                :hide-volume-btn="true"
                :no-controls="true"
                ref="qmp_center_video"
              ></q-media-player>
            </div>
          </div>
        </div>
        <!-- Bottom JPEG -->
        <div class="col">
          <q-img v-if="bottomSrc!=''" :src="bottomSrc" style="height:100%"/>
        </div>
        <!-- <div class="col-auto" :style="'height:'+v2+'vh;background-color:black;'"></div> -->
      </div>
      <!-- Fever Beep -->
      <div class="column items-center q-pt-md" style="display:none">
        <q-media-player
          type="audio"
          background-color="black"
          :muted="false"
          :autoplay="false"
          :sources="heat_sound"
          :loop="false"
          :disabled-seek="false"
          :hide-volume-btn="false"
          :no-controls="false"
          ref="qmp_beep"
        ></q-media-player>
      </div>
    </div>
    <div class="text-center" style="width:1080px;background-color:#000;">
      <img src="../assets/menu.jpg" style="height:65px;vertical-align:bottom;"/>
    </div>
  </q-page>
</template>

<script>

// import { mqtt } from 'vue-mqtt';
import axios from 'axios';
import MarqueeText from "vue-marquee-text-component";

export default {
  name: 'HandWash',
  components:{
    MarqueeText,
  },
  data () {
    return {
      debugTxt:"",
      show_fever:false,
      show_temp: true,
      //mqtt
      temp_obj:{},    //temp
      //database
      temp_range:{},  //temp range
      marq_obj:{},    //marquee
      top_video:[],
      center_video:[],
      heat_sound:[],
      bottomSrc:'',

      isSound:false,
      v1:15,

      // url:"https://raw.githubusercontent.com/howardweng/quasar01/main/database.json",
      local_url:"http://192.168.0.101:9100/database.json",
    }
  },
  async created () {
    // 抓取初始值
    var status = await axios.get(this.local_url)
    .then((res)=>{
      let database = res.data;
      console.log('res:',database);
      // this.debugMethod('res:'+JSON.stringify(database)+'/////');
      this.marq_obj = database.marquee;
      this.temp_range = database.temp_range;
      this.top_video = database.top_video;
      this.center_video = database.center_video;
      this.heat_sound = database.heat_sound;
      this.bottomSrc = database.bottom_img[0].src;
      return 'ok';
    })
    .catch((err)=>{
      // this.debugMethod('res:'+err+'/////');
      console.error(err);
    })

    if(status =='ok'){
      this.subscribe_topic = "handwash/#";
      this.$mqtt.subscribe(this.subscribe_topic);
    }
  },
  mqtt: {
    'handwash/#' (data, topic) {
      this.object = JSON.parse(data)
      if (topic === "handwash/12345/temp") {
        let tempObj = JSON.parse(data)
        this.temp_obj = tempObj;
      }
    }
  },
  methods:{
    debugMethod(txt){
      this.debugTxt += txt +'\n';
    },

    playSound() {
      this.isSound = true;
      this.$refs.qmp_beep.play();
      this.$refs.qmp_top_video.pause();
    },
    pauseSound() {
      this.isSound = false;
      this.$refs.qmp_beep.pause();
      this.$refs.qmp_top_video.play();
    }
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
}
</script>

<style scoped>
  .menu{
    background-color: #fff;
    color: #1976D2;;
    border-radius: 0% 10px 10px 10px;
    padding: 16px;
    font-size: 20px;
    font-weight: 900;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow:
    2px 2px 4px rgba(0, 0, 0, 0.061),
    6.7px 6.7px 14px rgba(0, 0, 0, 0.09),
    5px 5px 12px rgba(0, 0, 0, 0.15);
    z-index: 1;
  }
  .testarea{
    font-size: 16px;
  }
  .q_page{
    background-color: #000;
    height: 1920px;
    width: 1080px;
  }
  .marquee{
    color:whitesmoke;
    font-size: 8em;
    vertical-align:bottom;
    padding-top:65px;
    padding-bottom:15px;
  }
  .temp-state{
    font-size:16px; 
    letter-spacing: 2px; 
    font-weight:500;
  }
  .temp_card{
    width: 250px; 
    opacity:0.7;
  }
  .temp_dialog{
    position: absolute;
    top:0px;
    left: 50%;
    transform: translate(-50%, 0);
  }
</style>