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
  store.dispatch("pokemon/setActivePokemon", selectedPokemon.name).then(result => {
    selectedPokemon.stats = result;
  })
}

</script>

<template>
  <section id="PokedexEntry">
    <vueSelect class="pokemon-select" :options="pokemonNames" v-model="selectedPokemon.name"
      @option:selected="choosePokemon"></vueSelect>
    <PokedexEntry :pokemon="selectedPokemon.stats" v-if="selectedPokemon.stats"></PokedexEntry>
  </section>
</template>


<style lang="scss">
#PokedexEntry {
  max-width: 60rem;
  margin: 0 auto;


  .pokemon-select {
    font-size: 2.5rem;

    input.vs__search,
    input.vs__search:focus {
      font-size: 2.5rem;
    }

    .vs__dropdown-toggle {
      border: none;
    }

    .vs__selected-options,
    .vs__selected {
      margin: 0;
      padding: 0;
      border: none;
    }

    .vs__selected {
      border-bottom: 1px solid #DBDBDB !important;
      border-radius: 0;
    }

    .vs__dropdown-menu {
      font-size: 1rem !important;
    }

    .vs__dropdown-toggle {

      appearance: none;
      background: transparent;
      display: flex;
      padding: 0 0 4px;
      white-space: normal;
    }

    .vs__dropdown-option {
      clear: both;
      color: $body-font-color;
      cursor: pointer;
      display: block;
      line-height: 1.5;
      padding: 0 0.5rem;
    }

    .vs__dropdown-option--highlight {
      background: $blue;
      color: white;
    }

    .vs__dropdown-option--deselect {
      background: var(--vs-dropdown-option--deselect-bg);
      color: var(--vs-dropdown-option--deselect-color)
    }
  }
}
</style>