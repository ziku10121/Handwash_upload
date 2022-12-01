<template>
    <q-card class="my-card">
        <q-card-section>
        <div class="text-h5"><b>建立帳戶</b></div>
        </q-card-section>

        <q-card-actions vertical>
          <div class="row justify-between">
            <q-input class="col-5 mb-15" bg-color="blue-1" outlined v-model="account.first_name" placeholder="Frist name">
              <template v-slot:prepend>
              <q-icon name="person" />
              </template>
            </q-input>
            <q-input class="col-6 mb-15" bg-color="blue-1" outlined v-model="account.last_name" placeholder="Last name">
              <template v-slot:prepend>
              <q-icon name="person" />
              </template>
            </q-input>
          </div>
          <q-input class="mb-15" bg-color="blue-1" outlined v-model="account.email" placeholder="email">
              <template v-slot:prepend>
              <q-icon name="email" />
              </template>
          </q-input>
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
        <q-btn class="btn mb-20" color="primary" label="註冊" size="18px"/>
    </q-card>
</template>
<script>
export default {
  data(){
    return{
      account:{
        first_name:'',
        last_name:'',
        email:'',
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
    width:500px;
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
  }
  .mb-15{
    margin-bottom:15px;
  }
  .mb-20{
    margin-bottom:20px;
  }
</style>