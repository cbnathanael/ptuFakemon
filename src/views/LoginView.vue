<template>
  <section>
    <form>
      <label>
        Username
        <input type="text" v-model="loginInfo.username">
      </label>
      <label>
        Password
        <input type="password" v-model="loginInfo.password">
      </label>
      <button type="button" @click="login">Log In</button>
    </form>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const loginInfo = reactive({
  username: process.env?.VUE_APP_DEFAULT_USER,
  password: process.env?.VUE_APP_DEFAULT_PW
});

async function login() {
  store.dispatch("authentication/authenticate",loginInfo).then((result)=>{
    console.log(result)
  }).catch(err=>{
    console.log(err);
  })
}

</script>