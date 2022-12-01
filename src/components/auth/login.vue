<template>
    <q-card class="my-card">
        <q-card-section>
        <div class="text-h5"><b>系統登入</b></div>
        </q-card-section>

        <q-card-actions vertical>
        <q-input class="mb-15" bg-color="blue-1" outlined v-model="account.username" placeholder="username">
            <template v-slot:prepend>
            <q-icon name="account_circle" />
            </template>
        </q-input>
        <q-input class="mb-15" bg-color="blue-1" outlined v-model="account.psword" :type="pwdType" placeholder="password">
            <template v-slot:prepend>
                <q-icon name="lock" />
            </template>
            <template v-slot:append>
                <q-btn v-if="isShow" icon="visibility_off" unelevated @click="showMethod"/>
                <q-btn v-else icon="visibility" unelevated @click="showMethod"/>
            </template>
        </q-input>
        </q-card-actions>
        <div class="row justify-between items-center mb-15">
        <div>
            <q-checkbox v-model="isKeep" label="記住密碼" />
        </div>
        <a href="#" @click.prevent="">忘記密碼?</a>
        </div>
        <q-btn class="btn" color="primary" label="登入" size="18px"/>
        <hr>
        <div class="row justify-center mb-15">
        <q-btn class="round-btn google-btn"/>
        <q-btn class="round-btn fb-btn"/>
        </div>
        <div class="row justify-center mb-15">
        <a href="#" @click.prevent="">免費註冊</a>
        </div>
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