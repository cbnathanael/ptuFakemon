<script setup lang="ts">
import Pokemon from '@/interfaces/pokemon/pokemon';
import { ref, reactive, computed } from "vue";
import formatting from '@/formatting';
import TypeDisplay from './TypeDisplayBlock.vue';
import AbilityDetail from './AbilityDetail.vue';
import MoveDisplay from "./MoveDisplay.vue";
interface Props {
  pokemon: Pokemon;
}
// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
const hoveredAbility = reactive({
  name: '',
  target: null
});
const cssVars = computed(() => {
  return {
    '--pokemon-image': `url(http://img.pokemondb.net/artwork/${props.pokemon.name.toLowerCase()}.jpg)`,
  }
})

function abilityDisplay(abilityName: string, show: boolean, event: any) {
  if (show) {
    hoveredAbility.name = abilityName;
    hoveredAbility.target = event.target;
  } else {
    hoveredAbility.name = '';
    hoveredAbility.target = null;
  }

}
</script>

<template>
  <article id="PokedexEntry" :style="cssVars">
    <section class="core-data">
      <div class="title">
        <h1>{{ pokemon.name }}</h1>
        <h2>The name pokemon</h2>
      </div>
      <div class="types">
        <TypeDisplay v-for="(type, idx) in pokemon.types" :key="idx" :type-name="type.toLowerCase()"></TypeDisplay>
      </div>
      <img :src="`http://img.pokemondb.net/artwork/${pokemon.name.toLowerCase()}.jpg`" alt="" />
      <div class="physical">
        <div>
          <strong>Height</strong>&nbsp;
          <span>{{ pokemon.size.height.inches }}&rdquo; / {{ pokemon.size.height.metric }}m ({{
              pokemon.size.height.scale
          }})
          </span>
        </div>
        <div>
          <strong>Weight</strong>&nbsp;
          <span>{{ pokemon.size.weight.pounds }}lbs. / {{ pokemon.size.weight.kilograms }}kg ({{
              pokemon.size.weight.scale
          }})</span>
        </div>
      </div>
      <div class="stats">
        <div><strong>HP</strong> <span>{{ pokemon.stats.hp }}</span></div>
        <div><strong>ATK</strong> <span>{{ pokemon.stats.attack }}</span></div>
        <div><strong>DEF</strong> <span>{{ pokemon.stats.defense }}</span></div>
        <div><strong>SATK</strong> <span>{{ pokemon.stats.specialAttack }}</span></div>
        <div><strong>SDEF</strong> <span>{{ pokemon.stats.specialDefense }}</span></div>
        <div><strong>SPD</strong> <span>{{ pokemon.stats.speed }}</span></div>
      </div>
    </section>

    <!-- <AbilityDetail :ability-name="hoveredAbility.name" :target="hoveredAbility.target"></AbilityDetail> -->
  </article>
</template>

<style scoped lang="scss">
#PokedexEntry {
  .core-data {
    width: calc(100vw - 2rem);
    border: 2px solid $type_grass;
    margin: 0 auto;
    background-color: white;
    // background-image: var(--pokemon-image);
    // background-position: center;
    // background-repeat: no-repeat;
    position: relative;

    .title {
      background: $type_grass;
      color: $off_white;
      width: 100%;
      padding: 0.25rem 0.5rem;

      h1 {
        font-size: 1.25rem;
      }

      h2 {
        font-size: 1rem;
        text-align: right;
      }

    }

    .types {
      padding: 0.25rem 0.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
    }

    img {
      display: block;
      margin: 0 auto;
    }
    .physical, .stats {
      display: grid;
      div {
        border: 1px solid $type_grass;
        border-width: 1px 1px 0 1px;
        padding: 0.25rem 0.5rem;
        text-align: center;

        &:first-child {
          border-left: none;
        }

        &:last-child {
          border-right: none;
        }

        span {
          display: block;
        }
      }
    }
    .physical {
      grid-template-columns: repeat(2, 1fr);
    }
    .stats {
      grid-template-columns: repeat(6, 1fr);
    }
    @media screen and (min-width:1024px) {
      width: 512px;
      min-width: 512px;
      min-height: 512px;
      background-image: var(--pokemon-image);
      background-position: center;
      background-repeat: no-repeat;
      background-size: auto 360px;
      display: flex;
      flex-direction: column;
      img {
        display: none;
      }
      .title, .types {
        width: 50%;
      }
      .physical {
        margin-top: auto;
      }
      .physical, .stats {
        text-align: left;
        div span {
          display: inline-block;
        }
      }
    }
  }
}
</style>