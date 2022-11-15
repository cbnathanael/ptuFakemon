<template>
  <div class="home">
    <h1>Hi</h1>

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
</div>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const loginInfo = reactive({
  username: "",
  password: ""
});

async function login() {
  store.dispatch("authentication/authenticate",loginInfo).then((result)=>{
    console.log(result)
  }).catch(err=>{
    console.log(err);
  })
}

</script>
