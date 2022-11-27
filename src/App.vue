<script setup lang="ts">
import SiteHeader from './components/SiteHeader.vue';
</script>
<template>
  <div id="bgwrap" :class="$route.name">
    <SiteHeader></SiteHeader>
    <router-view />
  </div>
</template>

<style lang="scss">
  #bgwrap {
    min-height: 100vh;
    &.pokedex {
      background: linear-gradient(165deg, rgba($red_light,1) 0%, rgba($red,0.5) 100%);
    }
    &.pokeGen {
      background: linear-gradient(165deg, rgba($blue_light,1) 0%, rgba($blue,0.5) 100%);
    }
    
  }
</style>
