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
import { reactive, } from 'vue';
import { useRouter } from "vue-router";
import { useStore } from 'vuex';
const store = useStore();
const router = useRouter();
const loginInfo = reactive({
  username: '',
  password: ''
});

async function login() {
  store.dispatch("authentication/authenticate",loginInfo).then((result)=>{
    router.push({ name: 'pokedex' })
  }).catch(err=>{
    console.log(err);
  })
}

</script>