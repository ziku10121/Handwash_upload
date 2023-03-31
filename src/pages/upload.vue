<template>
  <q-page class="column items-center q-py-md">
  <!-- class="flex flex-center q-my-md" -->
    <div class="menu row jusitify-center items-center">
      <!-- <img :src="imageSrc" width="40" height="40"> -->
      <q-icon name="front_hand"/>
      <span class="app-name q-pl-md">Hand Sanitizer</span>
      <!-- <button class="btn">預覽</button> -->
    </div>
    <!-- Update Dialog -->
    <q-dialog v-model="update_ok" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="thumb_up" color="primary" text-color="white" />
          <span class="q-ml-sm">Update Success</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- temp range -->
    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Warning Temperature Range</div>
          <div class="text-caption text-grey">
            Chose the lowest and highest temperatur range
          </div>
        </q-card-section>
      </q-item>
      <q-separator />
      <q-card-section>
        <div class="col-12 text-right">
          <q-range
            class="q-pt-lg q-pb-xl q-px-lg"
            color="green"
            :marker-labels="arrayMarkerLabel"
            v-model="tempRange"
            left-label-color="green"
            left-thumb-color="green"
            right-label-color="negative"
            right-thumb-color="negative"
            switch-marker-labels-side
            label-always
            switch-label-side
            :step="0.1"
            :min="30"
            :max="42"
          />
          <q-btn color="primary" label="update" @click="post_temperature(tempRange.min,tempRange.max)"/>
        </div>
      </q-card-section>
    </q-card>
    <!-- Marquee -->
    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Header marquee</div>
          <!-- <div class="text-h6 q-mt-sm q-mb-xs">video in mp4 .mov format</div> -->
          <div class="text-caption text-grey">
            Edit Text for header marquee
          </div>
        </q-card-section>
      </q-item>
      <q-separator/>
      <q-card-section horizontal>
        <q-card-section>
          <div style="width: 400px; height: 200px;">
            <marquee-text v-if="marq_text!=''" class="marquee text-h3" :duration="marq_duration">{{marq_text}}</marquee-text>
          </div>
          <div class="q-px-sm q-mt-sm">
            Selected Duration is: <strong>{{ marq_duration }}</strong>
          </div>
          <div class="q-px-sm q-mt-sm">
            preview will be valid in next loop
          </div>
          <div class="q-px-sm q-mt-sm">
            Please update to save the changes.
          </div>
        </q-card-section>
        <q-separator vertical />
        <q-card-section>
          <!-- input text -->
          <div class="q-pa-sm" style="width: 320px">
            <q-input
              filled
              clearable
              type="textarea"
              color="primary"
              v-model="marq_text"
              label="Please enter marquee text"
            />
          </div>
          <!-- duration -->
          <div class="q-pa-md">
            <q-slider
              v-model="marq_duration"
              :min="0"
              :max="100"
              :inner-min="5"
              :step="5"
              label
              label-always
              color="primary"
            />
          </div>
          <!-- button -->
          <div class="q-mr-sm text-right">
            <q-btn color="primary" label="update" @click="post_marquee(marq_text,marq_duration)"/>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <!-- Top Video -->
    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Top video</div>
          <div class="text-caption text-grey">
            Please upload video in .mov format
          </div>
        </q-card-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section>
          <video class="top-video" :src="topSrc" width="400" height="225" muted autoplay loop controls>
          </video>
        </q-card-section>
        <q-separator vertical />
        <q-card-section>
          <div>
            <q-uploader :url="post_url+'upload'" 
              label="Top video upload(size<40M)"
              max-files="1"
              :filter="checkFileSize"
              :field-name="(file) => 'top.mov'"
              :form-fields="[{name:'command',value:'top_video'}]"
              @added ="previewTop"
              @uploaded ="updateOK"
              accept=".mov"/>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <!-- Center Video -->
    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Center video</div>
          <div class="text-caption text-grey">
            Please upload video in .mov format
          </div>
        </q-card-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section>
          <video class="center-video" :src="centerSrc" width="400" height="225" muted autoplay loop controls>
          </video>
        </q-card-section>
        <q-separator vertical />
        <q-card-section>
          <div>
            <q-uploader :url="post_url+'upload'" 
              label="Center video upload(size<40M)"
              max-files="1"
              :filter="checkFileSize"
              :field-name="(file) => 'center.mov'"
              :form-fields="[{name:'command',value:'center_video'}]"
              @added ="previewCenter"
              @uploaded ="updateOK"
              accept=".mov"/>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <!-- heat Sound -->
    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Heat Sound</div>
          <div class="text-caption text-grey">Please upload audio in .mp3 format</div>
        </q-card-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section >
          <audio class="audio" :src="soundSrc" style="width:400px;" controls>
          </audio>
        </q-card-section>
        <q-separator vertical />
        <q-card-section>
          <div>
            <q-uploader :url="post_url+'upload'" 
              label="Head sound upload(size<40M)"
              max-files="1"
              :filter="checkFileSize"
              :field-name="(file) => 'heat_sound.mp3'"
              :form-fields="[{name:'command',value:'heat_sound'}]"
              @added ="previewSound"
              @uploaded ="updateOK"
              accept=".mp3"/>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
    <!-- Bottom Image -->
    <q-card class="my-card" bordered>
      <q-item>
        <q-card-section vertical>
          <div class="text-h5 text-orange-9">Bottom image</div>
          <div class="text-caption text-grey">Please upload image in .jpg format</div>
        </q-card-section>
      </q-item>
      <q-separator />
      <q-card-section horizontal>
        <q-card-section>
          <div>
            <q-img :src="imageSrc" width="400px" height="155px" />
          </div>
        </q-card-section>
        <q-separator vertical />
        <q-card-section>
          <div>
            <q-uploader :url="post_url+'upload'" 
              label="Bottom image upload(size<40M)"
              max-files="1"
              :filter="checkFileSize"
              :field-name="(file) => 'bottom_img.jpg'"
              :form-fields="[{name:'command',value:'bottom_img'}]"
              @added ="previewImage"
              @uploaded ="updateOK"
              accept=".jpg"/>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>

    <q-btn class="priview-btn" unelevated color="orange" @click="goPreview">
      <div class="txt">Preview</div>
    </q-btn>
  </q-page>
</template>

<script>

import axios from 'axios';
import MarqueeText from "vue-marquee-text-component";

export default {
  name: 'Upload',
  components:{
    MarqueeText,
  },
  data() {
    return {
      update_ok: false,

      // Temp Range value
      tempRange: {
        min: "",
        max: ""
      },
      // Temp Range Label
      arrayMarkerLabel: [
        { value: 30, label: '30°C' },
        { value: 32, label: '32°C' },
        { value: 34, label: '34°C' },
        { value: 36, label: '36°C' },
        { value: 38, label: '38°C' },
        { value: 40, label: '40°C' },
        { value: 42, label: '42°C' },
      ],
      // 跑馬燈
      marq_duration:25,
      marq_text:"",
      topSrc:null,
      centerSrc:null,
      soundSrc:null,
      imageSrc:null,

      // url:"https://raw.githubusercontent.com/howardweng/quasar01/main/database.json",
      local_url:"http://192.168.0.101:9100/database.json",
      post_url:"http://192.168.168.10:1880/",
    }
  },
  created() {
    axios.get(this.local_url).then((res)=>{
      let database = res.data;
      console.log('res:',database);
      this.marq_obj = database.marquee;
      this.temp_range = database.temp_range;

      this.marq_text = database.marquee.text;
      this.marq_duration = database.marquee.duration;
      this.tempRange.min = database.temp_range.low;
      this.tempRange.max = database.temp_range.high;

      this.topSrc = database.top_video[0].src;
      this.centerSrc = database.center_video[0].src;
      this.soundSrc = database.heat_sound[0].src;
      this.imageSrc = database.bottom_img[0].src;
    })
    .catch((err)=>{
      console.error(err);
    })

  },
  methods: {
    post_temperature(_min, _max) {
      let obj ={
        command:"temp_range",
        low:_min,
        high:_max
      };
      // console.log(obj,JSON.stringify(obj));
      axios.post(this.post_url+'upload_temperature', obj)
        .then((res) => {
            console.log("res.data: ", res.data)
            // popup dialog
            this.update_ok = true
          })
        .catch((error) => { console.error(error) })
    },

    post_marquee(_text, _duration) {
      let obj ={
        command:"marquee",
        duration:_duration,
        text:_text
      };
      // console.log(obj);
      axios.post(this.post_url+'upload_marquee', obj)
        .then((res) => {
          console.log("res.data: ", res.data);
          // popup dialog
          this.update_ok = true
        })
        .catch((error) => { console.error(error) })
    },

    checkFileSize (files) {
      return files.filter(files => files.size < 1024*1024*40)
    },
    previewTop(files){
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      this.topSrc = URL.createObjectURL(files[0]).toString();
    },
    previewCenter(files){
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      this.centerSrc = URL.createObjectURL(files[0]).toString();
    },
    previewSound(files){
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      this.soundSrc = URL.createObjectURL(files[0]).toString();
    },
    previewImage(files){
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      this.imageSrc = URL.createObjectURL(files[0]).toString();
    },
    updateOK(info){
      console.log(info);
      if(info.xhr.status==200){
        this.update_ok = true;
      }
    },
    goPreview(){
      const {href}=this.$router.resolve({path:'/handwash'});
      window.open(href, '_blank');
    }
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
  letter-spacing: 1.5px;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow:
  2px 2px 4px rgba(0, 0, 0, 0.061),
  6.7px 6.7px 14px rgba(0, 0, 0, 0.09),
  5px 5px 12px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.my-card{
  width: 100%;
  max-width: 800px;
  margin: 10px;
}

.marquee{
  width:100%;
  height:80px;
  background-color:DodgerBlue;
  color:whitesmoke;
  line-height: 80px;
}

.priview-btn{
  position: fixed;
  right:0;
  top:50%;
  padding: 16px 5px;
  transition: all 0.2s;
}
.priview-btn:hover{
  top:calc(50% - 5px);
  padding: 20px 10px;
}
.priview-btn .txt{
  writing-mode: vertical-rl;
  letter-spacing: 2px;
  font-size: 20px;
}

</style>
