<script setup lang="ts">
import Pokemon from '@/interfaces/pokemon/pokemon';
import { ref, reactive, computed } from "vue";
import formatting from '@/formatting';
import CoreData from './PokemonCoreData.vue';
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
  const color = formatting.typeColor(props.pokemon.types[0].toLocaleLowerCase());
  return {
    '--pokemon-image': `url(http://img.pokemondb.net/artwork/${props.pokemon.name.toLowerCase()}.jpg)`,
    '--pokemon-color': color?.std,
    '--pokemon-color-dark': color?.dark,
    '--pokemon-color-light': color?.light,
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
    <CoreData :pokemon="pokemon"></CoreData>
    <section class="secondary-data">
      <div class="diet">
        <strong>Diet</strong>
        <span><span v-for="(diet, idx) in pokemon.diet" :key="idx" class="comma-list-item">{{ diet }}</span></span>
      </div>
      <div class="habitat">
        <strong>Habitat</strong>
        <span><span v-for="(habitat, idx) in pokemon.habitat" :key="idx" class="comma-list-item">{{ habitat
        }}</span></span>
      </div>
      <div class="evolution">
        <strong>Evolution</strong>
        <div>
          <span v-for="(evo, idx) in pokemon.evolutions" :key="idx" class="comma-list-item">{{ evo.name }}<small
              v-if="evo.minimum"> Minimum {{ evo.minimum }}</small></span>
        </div>
      </div>
      <div class="egg-group">
        <strong>Egg Group</strong>
        <span><span v-for="(group, idx) in pokemon.breeding.eggGroups" :key="idx" class="comma-list-item">{{ group
        }}</span></span>
      </div>
      <div class="hatch-rate">
        <strong>Hatch Rate</strong>
        <span>{{ pokemon.breeding.hatchRate }} Days</span>
      </div>
      <div class="abilities">
        <strong>Abilities</strong>
        <em>Basic:</em> <span v-for="(ability, idx) in pokemon.abilities.basic" :key="idx"
          @mouseover="abilityDisplay(ability, true, $event)" @mouseleave="abilityDisplay(ability, false, $event)"
          class="hoverable comma-list-item">{{ ability }}</span>
        <em>Advanced: </em>
        <span v-for="(ability, idx) in pokemon.abilities.advanced" :key="idx"
          @mouseover="abilityDisplay(ability, true, $event)" @mouseleave="abilityDisplay(ability, false, $event)"
          class="hoverable comma-list-item">{{ ability }}</span>
        <em>High:</em> <span @mouseover="abilityDisplay(pokemon.abilities.high[0], true, $event)"
          @mouseleave="abilityDisplay(pokemon.abilities.high[0], false, $event)" class="hoverable">{{
              pokemon.abilities.high[0]
          }}</span>
      </div>
      <div class="capabilities">
        <strong>Capabilities</strong>
        <span v-if="pokemon.movement.overland > 0">Overland {{ pokemon.movement.overland }},&nbsp;</span>
        <span v-if="pokemon.movement.sky > 0">Sky {{ pokemon.movement.sky }},&nbsp;</span>
        <span v-if="pokemon.movement.swim > 0">Swim {{ pokemon.movement.swim }},&nbsp;</span>
        <span v-if="pokemon.movement.levitate > 0">Levitate {{ pokemon.movement.levitate }},&nbsp;</span>
        <span v-if="pokemon.movement.burrow > 0">Burrow {{ pokemon.movement.burrow }},&nbsp;</span>
        <span v-if="pokemon.movement.hJump > 0">Jump {{ pokemon.movement.hJump }}/{{ pokemon.movement.lJump
        }},&nbsp;</span>
        <span v-for="(cap, idx) in pokemon.capabilities" :key="idx">
          {{ cap }},&nbsp;
          <!-- <span v-if="cap.value">{{cap.value}}</span> -->
        </span>
        <span>Naturewalk (<span v-for="(nw, idx) in pokemon.naturewalk" :key="idx" class="comma-list-item">{{ nw
        }}</span>)</span>
      </div>
      <div class="skills">
        <strong>Skills</strong>
        <span v-if="!(pokemon.skills.acrobatics.dice == 2 && pokemon.skills.acrobatics.modifier == 0)"
          class="comma-list-item">Acrobatics
          {{ formatting.diceFormat(pokemon.skills.acrobatics) }}</span>
        <span v-if="!(pokemon.skills.athletics.dice == 2 && pokemon.skills.athletics.modifier == 0)"
          class="comma-list-item">Athletics
          {{ formatting.diceFormat(pokemon.skills.athletics) }}</span>
        <span v-if="!(pokemon.skills.charm.dice == 2 && pokemon.skills.charm.modifier == 0)"
          class="comma-list-item">Charm
          {{ formatting.diceFormat(pokemon.skills.charm) }}</span>
        <span v-if="!(pokemon.skills.combat.dice == 2 && pokemon.skills.combat.modifier == 0)"
          class="comma-list-item">Combat
          {{ formatting.diceFormat(pokemon.skills.combat) }}</span>
        <span v-if="!(pokemon.skills.command.dice == 2 && pokemon.skills.command.modifier == 0)"
          class="comma-list-item">Command
          {{ formatting.diceFormat(pokemon.skills.command) }}</span>
        <span v-if="!(pokemon.skills.focus.dice == 2 && pokemon.skills.focus.modifier == 0)"
          class="comma-list-item">Focus
          {{ formatting.diceFormat(pokemon.skills.focus) }}</span>
        <span v-if="!(pokemon.skills.guile.dice == 2 && pokemon.skills.guile.modifier == 0)"
          class="comma-list-item">Guile
          {{ formatting.diceFormat(pokemon.skills.guile) }}</span>
        <span v-if="!(pokemon.skills.intimidate.dice == 2 && pokemon.skills.intimidate.modifier == 0)"
          class="comma-list-item">Intimidate
          {{ formatting.diceFormat(pokemon.skills.intimidate) }}</span>
        <span v-if="!(pokemon.skills.intuition.dice == 2 && pokemon.skills.intuition.modifier == 0)"
          class="comma-list-item">Intuition
          {{ formatting.diceFormat(pokemon.skills.intuition) }}</span>
        <span v-if="!(pokemon.skills.perception.dice == 2 && pokemon.skills.perception.modifier == 0)"
          class="comma-list-item">Perception
          {{ formatting.diceFormat(pokemon.skills.perception) }}</span>
        <span v-if="!(pokemon.skills.stealth.dice == 2 && pokemon.skills.stealth.modifier == 0)"
          class="comma-list-item">Stealth
          {{ formatting.diceFormat(pokemon.skills.stealth) }}</span>
        <span v-if="!(pokemon.skills.survival.dice == 2 && pokemon.skills.survival.modifier == 0)"
          class="comma-list-item">Survival
          {{ formatting.diceFormat(pokemon.skills.survival) }}</span>
      </div>
    </section>
    <section class="moves">
      <section class="moves-list">
        <strong>Move List</strong>
        <ol class="moves-list data">
          <li v-for="(move, idx) in pokemon.moves" :key="idx">
            <span>{{ move.level }}</span>
            <MoveDisplay :moveName="move.name" :displayType="'block'"></MoveDisplay>
            <!-- &ndash; {{move.type}} -->
          </li>
        </ol>
      </section>
      <section class="tmhm-list">
        <strong>TM/HM List</strong>
        <p class="move-text">
          <span v-for="(move, idx) in pokemon.tmHmMoves" :key="idx" class="comma-list-item"><small>{{ move.id }}</small> {{ move.name }}</span>
        </p>
      </section>
      <section class="tutor-list">
        <strong>Tutor List</strong>
        <p class="move-text">
          <span v-for="(move, idx) in pokemon.tutorMoves" :key="idx" class="comma-list-item">{{ move }}</span>
        </p>
      </section>
    </section>


    <AbilityDetail :ability-name="hoveredAbility.name" :target="hoveredAbility.target"></AbilityDetail>
  </article>
</template>

<style scoped lang="scss">
#PokedexEntry {
  @media screen and (min-width: 1024px) {
    width: calc(100vw - 2rem);
    max-width: 60rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 480px 1fr;
  }

 

  .secondary-data {
    width: calc(100vw - 2rem);
    margin: 0 auto;
    border: 2px solid var(--pokemon-color-dark);
    border-top-width: 0;
    background: $off_white;

    strong {
      display: inline-block;
      background: var(--pokemon-color-light);
      padding: 0.5rem;
      align-self: stretch;
      line-height: 1.5;
    }

    .diet,
    .habitat,
    .evolution,
    .egg-group,
    .hatch-rate {
      display: grid;
      grid-template-columns: 6.5rem 1fr;
      grid-column-gap: 0.5rem;
      align-items: center;
      border-bottom: 2px solid var(--pokemon-color-dark);
      padding-right: 0.5rem;
      div {
        padding: 0.25rem 0;
      }
    }

    .abilities,
    .capabilities {
      border-bottom: 2px solid var(--pokemon-color-dark);
    }

    .abilities,
    .capabilities,
    .skills {
      line-height: 2.5;
      padding: 0 0.5rem;

      &::after {
        content: '';
        display: block;
        clear: both;
      }

      strong {
        float: left;
        width: 6.5rem;
        margin-right: 0.5rem;
        margin-left: -0.5rem;
        line-height: 1.5;
      }

      em {
        font-weight: 600;
      }
    }

    @media screen and (min-width: 1024px) {
      width: auto;
      margin: initial;
      border-top-width: 2px;
      border-left-width: 0;
    }
  }

  .moves {
    grid-column: 1 / span 2;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    border: 2px solid var(--pokemon-color-dark);
    border-top-width: 0;
    background: $off_white;
    &>section+section {
      border-left: 2px solid var(--pokemon-color-dark);
    }

    strong {
      display: block;
      background: var(--pokemon-color-light);
      padding: 0.5rem;
    }

    ol {
      li {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.5rem;
        align-items: center;
        position: relative;
        & + li {
          border-top: 1px solid $gray_dark;
        }
        &>span {
          padding: 0.25rem 0.5rem;

          &:first-child {
            background: $gray_light;
            font-weight: 600;
          }

          &:last-child {
            background: white;
          }
        }
      }

      &.moves-list {
        li {
          grid-template-columns: 4rem 1fr;

        }
      }
      
    }
    .tmhm-list, .tutor-list {
        p {
          padding: 0 0.5rem;
          small {
            font-weight: 700;
          }
        }
      }
  }

}
</style>