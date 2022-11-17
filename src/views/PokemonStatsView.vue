<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import StatBlockVue from '@/components/pokemon/StatBlock.vue';
import TypeDisplay from '@/components/pokemon/TypeDisplay.vue';
const store = useStore();

const pokemonNames = ref([]);
const selectedPokemon = reactive({
  name: '',
  stats: null
});
// onBeforeMount(() => {
//   store.dispatch("pokemon/getPokemonNames").then(()=>{
//     pokemonNames.value = store.getters["pokemon/pokemonNames"];
//   }).catch(err=>{
//     console.log(err);
//   })
// });

// function choosePokemon(){
//   store.dispatch("pokemon/setActivePokemon", selectedPokemon.name).then(result=>{
//     console.log("fds")
//     selectedPokemon.stats = result;
//   })
// }

</script>

<template>
  <div class="home">
    <h1>Hi</h1>
    
    <!-- <select name="pokemon" v-model="selectedPokemon.name" @change="choosePokemon">
      <option :value="name" v-for="name in pokemonNames" :key="name">{{name}}</option>
    </select>
    <StatBlockVue :pokemon="selectedPokemon.stats" v-if="selectedPokemon.stats"></StatBlockVue> -->
</div>
</template>


<style lang="scss">

</style>