<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import vueSelect from "vue-select";
import PokedexEntry from '@/components/pokemon/PokedexEntry.vue';
import TypeDisplay from '@/components/pokemon/TypeDisplay.vue';
const store = useStore();

const pokemonNames = ref([]);
const selectedPokemon = reactive({
  name: '',
  stats: null
});
onBeforeMount(() => {
  store.dispatch("pokemon/getPokemonNames").then(() => {
    pokemonNames.value = store.getters["pokemon/pokemonNames"];
  }).catch(err => {
    console.log(err);
  })
});

function choosePokemon(value?: string) {
  selectedPokemon.stats = null;
  store.dispatch("pokemon/setActivePokemon", selectedPokemon.name).then(result => {
    selectedPokemon.stats = result;
  })
}

</script>

<template>
  <section>
    <vueSelect class="pokemon-select" :options="pokemonNames" v-model="selectedPokemon.name"
      @option:selected="choosePokemon"></vueSelect>
    <PokedexEntry :pokemon="selectedPokemon.stats" v-if="selectedPokemon.stats"></PokedexEntry>
  </section>
</template>


<style lang="scss">

</style>