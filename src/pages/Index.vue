<template>
  <q-page>
    <div class="wrap column">
      <Login></Login>
      <Register></Register>
    </div>
  </q-page>
</template>
<script>
import Login from '../components/auth/login.vue';
import Register from '../components/auth/register.vue';
export default {
  name:'Index',
  components: {
    Login,
    Register
  },
  data(){
    return{
    }
  }
}
</script>
<style scoped lang="scss">
  .wrap{
    height: 100vh;
  }
</style>