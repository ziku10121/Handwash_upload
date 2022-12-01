<template>
    <q-card class="my-card">
        <q-card-section>
        <div class="text-h5"><b>系統登出</b></div>
        </q-card-section>

        <q-btn class="btn mb-15" color="primary" label="登入" size="18px"/>
        
    </q-card>
</template>
<script>
export default {
  data(){
    return{
      account:{
        username:'',
        psword:'',
      },
      isKeep:false,
      isShow:false,
      pwdType:'',
    }
  },
  methods:{
    showMethod(){
        this.isShow = !this.isShow;
        if(this.isShow){
            this.pwdType = 'text';
        }else{
            this.pwdType = 'password';
        }
    }
  },
  created(){
    this.pwdType = 'password';
  }
}
</script>
<style scoped lang="scss">
  .q-card__actions{
    padding: 0px;
  }
  .my-card{
    margin:auto;
    width:400px;
    padding:0 20px;
    .text-h5{
      margin-top:10px;
    }
    .input:first-child{
      margin-top:20px;
    }
    a{
      text-decoration: none;
      color:grey;
      cursor:pointer;
    }
    a:hover{
      text-decoration: underline!important;
      color:black;
    }
    hr{
      margin-top: 1rem;
      margin-bottom: 1rem;
      border: 0;
      border-top: 1px solid rgba(0,0,0,.1);
    }
    .btn{
      width:100%;
    }
    .round-btn{
      margin:0 10px;
      width: 50px;
      height: 50px;
      background-repeat: no-repeat;
      background-size: cover;
      border-radius: 50%;
    }
    .google-btn{
      background-image: url("../../../public/icons/google-plus.png");
    }
    .fb-btn{
      background-image: url("../../../public/icons/facebook.png");
    }
  }
  .mb-15{
    margin-bottom:15px;
  }
</style>