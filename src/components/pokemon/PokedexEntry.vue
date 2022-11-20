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
  <article id="PokemonStats">
    <!-- <header>
      <h1>{{ pokemon.name }}</h1>
    </header> -->
    <div class="column column-left">
      <section id="PokemonBaseStats">
        <img :src="`http://img.pokemondb.net/artwork/${pokemon.name.toLowerCase()}.jpg`" alt="">
        <h2>Base Stats</h2>
        <dl class="data">
          <dt>HP</dt>
          <dd>{{ pokemon.stats.hp }}</dd>
          <dt>Attack</dt>
          <dd>{{ pokemon.stats.attack }}</dd>
          <dt>Defense</dt>
          <dd>{{ pokemon.stats.defense }}</dd>
          <dt>Special Attack</dt>
          <dd>{{ pokemon.stats.specialAttack }}</dd>
          <dt>Special Defense</dt>
          <dd>{{ pokemon.stats.specialDefense }}</dd>
          <dt>Speed</dt>
          <dd>{{ pokemon.stats.speed }}</dd>
        </dl>
      </section>
      <section id="PokemonBasicInformation">
        <h2>Basic Information</h2>
        <dl class="data">
          <dt>Type</dt>
          <dd><span v-for="(type, idx) in pokemon.types" :key="idx" ><TypeDisplay :type-name="type.toLowerCase()" v-if="type.toLowerCase() != 'none'"></TypeDisplay></span></dd>
          <template v-for="(ability, idx) in pokemon.abilities.basic" :key="idx">
            <dt>Basic Ability {{ idx + 1 }}</dt>
            <dd><span @mouseover="abilityDisplay(ability, true, $event)"
                @mouseleave="abilityDisplay(ability, false, $event)" class="hoverable">{{ ability }}</span></dd>
          </template>
          <template v-for="(ability, idx) in pokemon.abilities.advanced" :key="idx">
            <dt>Advanced Ability {{ idx + 1 }}</dt>
            <dd><span @mouseover="abilityDisplay(ability, true, $event)"
              @mouseleave="abilityDisplay(ability, false, $event)" class="hoverable">{{ ability }}</span></dd>
          </template>
          <dt>High Ability</dt>
          <dd><span @mouseover="abilityDisplay(pokemon.abilities.high[0], true, $event)"
              @mouseleave="abilityDisplay(pokemon.abilities.high[0], false, $event)"
              class="hoverable">{{ pokemon.abilities.high[0] }}</span></dd>
        </dl>
      </section>
      <section id="PokemonEvolution">
        <h2>Evolution</h2>
        <ol class="evolutions data">
          <li v-for="(evo, idx) in pokemon.evolutions" :key="idx">
            <span>{{ evo.level }}</span><span>{{ evo.name }} <small v-if="evo.minimum">Minimum {{ evo.minimum }}</small></span>
          </li>
        </ol>
      </section>
      <section id="PokemonSize">
        <h2>Size</h2>
        <dl class="data">
          <dt>Height</dt>
          <dd>{{ pokemon.size.height.inches }}&rdquo; / {{ pokemon.size.height.metric }}m ({{ pokemon.size.height.scale }})
          </dd>
          <dt>Weight</dt>
          <dd>{{ pokemon.size.weight.pounds }}lbs. / {{ pokemon.size.weight.kilograms }}kg ({{ pokemon.size.weight.scale }})
          </dd>

        </dl>
      </section>
      <section>
        <h2>Breeding</h2>
        <dl class="data">
          <dt>Gender Ratio</dt>
          <dd>{{ pokemon.breeding.ratio.male }}% M / {{ pokemon.breeding.ratio.female }}% F</dd>
          <dt>Egg Group</dt>
          <dd><span v-for="(group, idx) in pokemon.breeding.eggGroups" :key="idx">{{ group }}</span></dd>
          <dt>Average Hatch Rat</dt>
          <dd>{{ pokemon.breeding.hatchRate }} Days</dd>
          <dt>Diet</dt>
          <dd><span v-for="(diet, idx) in pokemon.diet" :key="idx" class="comma-list-item">{{ diet }}</span></dd>
          <dt>Habitat</dt>
          <dd><span v-for="(habitat, idx) in pokemon.habitat" :key="idx" class="comma-list-item">{{ habitat }}</span></dd>
        </dl>
      </section>
    </div>
    <div class="column column-right">
      <section>
        <h2>Capabilities</h2>
        <ul class="data-list">
          <li v-if="pokemon.movement.overland > 0">Overland {{ pokemon.movement.overland }}</li>
          <li v-if="pokemon.movement.sky > 0">Sky {{ pokemon.movement.sky }}</li>
          <li v-if="pokemon.movement.swim > 0">Swim {{ pokemon.movement.swim }}</li>
          <li v-if="pokemon.movement.levitate > 0">Levitate {{ pokemon.movement.levitate }}</li>
          <li v-if="pokemon.movement.burrow > 0">Burrow {{ pokemon.movement.burrow }}</li>
          <li v-if="pokemon.movement.hJump > 0">Jump {{ pokemon.movement.hJump }}/{{ pokemon.movement.lJump }}</li>
          <li v-for="(cap, idx) in pokemon.capabilities" :key="idx">
            {{ cap }}
            <!-- <span v-if="cap.value">{{cap.value}}</span> -->
          </li>
          <li>Naturewalk (<span v-for="(nw, idx) in pokemon.naturewalk" :key="idx"
              class="comma-list-item">{{ nw }}</span>)</li>
        </ul>
      </section>
      <section>
        <h2>Skills</h2>
        <ul class="data-list">
          <li v-if="!(pokemon.skills.acrobatics.dice == 2 && pokemon.skills.acrobatics.modifier == 0)">Acrobatics
            {{ formatting.diceFormat(pokemon.skills.acrobatics) }} </li>
          <li v-if="!(pokemon.skills.athletics.dice == 2 && pokemon.skills.athletics.modifier == 0)">Athletics
            {{ formatting.diceFormat(pokemon.skills.athletics) }} </li>
          <li v-if="!(pokemon.skills.charm.dice == 2 && pokemon.skills.charm.modifier == 0)">Charm
            {{ formatting.diceFormat(pokemon.skills.charm) }} </li>
          <li v-if="!(pokemon.skills.combat.dice == 2 && pokemon.skills.combat.modifier == 0)">Combat
            {{ formatting.diceFormat(pokemon.skills.combat) }} </li>
          <li v-if="!(pokemon.skills.command.dice == 2 && pokemon.skills.command.modifier == 0)">Command
            {{ formatting.diceFormat(pokemon.skills.command) }} </li>
          <li v-if="!(pokemon.skills.focus.dice == 2 && pokemon.skills.focus.modifier == 0)">Focus
            {{ formatting.diceFormat(pokemon.skills.focus) }} </li>
          <li v-if="!(pokemon.skills.guile.dice == 2 && pokemon.skills.guile.modifier == 0)">Guile
            {{ formatting.diceFormat(pokemon.skills.guile) }} </li>
          <li v-if="!(pokemon.skills.intimidate.dice == 2 && pokemon.skills.intimidate.modifier == 0)">Intimidate
            {{ formatting.diceFormat(pokemon.skills.intimidate) }} </li>
          <li v-if="!(pokemon.skills.intuition.dice == 2 && pokemon.skills.intuition.modifier == 0)">Intuition
            {{ formatting.diceFormat(pokemon.skills.intuition) }} </li>
          <li v-if="!(pokemon.skills.perception.dice == 2 && pokemon.skills.perception.modifier == 0)">Perception
            {{ formatting.diceFormat(pokemon.skills.perception) }} </li>
          <li v-if="!(pokemon.skills.stealth.dice == 2 && pokemon.skills.stealth.modifier == 0)">Stealth
            {{ formatting.diceFormat(pokemon.skills.stealth) }} </li>
          <li v-if="!(pokemon.skills.survival.dice == 2 && pokemon.skills.survival.modifier == 0)">Survival
            {{ formatting.diceFormat(pokemon.skills.survival) }} </li>
        </ul>
      </section>
      <section>
        <h2>Moves</h2>
        <ol class="moves-list data">
          <li>
          <span>Level</span><span>Move</span>
          </li>
          <li v-for="(move, idx) in pokemon.moves" :key="idx">
            <span>{{ move.level }}</span><MoveDisplay :moveName="move.name" :displayType="'block'"></MoveDisplay>
            <!-- &ndash; {{move.type}} -->
          </li>
        </ol>
      </section>
      <section>
        <h2>TM/HM Moves</h2>
        <p class="move-text">
          <span v-for="(move, idx) in pokemon.tmHmMoves" :key="idx">{{ move.id }} {{ move.name }}</span>
        </p>
      </section>
      <!-- <section>
        <h2>Egg Moves</h2>
        <p class="move-text">
          <span v-for="(move, idx) in pokemon.eggMoves" :key="idx">{{move}}</span>
        </p>
      </section> -->
      <section>
        <h2>Tutor Moves</h2>
        <p class="move-text">
          <span v-for="(move, idx) in pokemon.tutorMoves" :key="idx">{{ move }}</span>
        </p>
      </section>
    </div>
    <AbilityDetail :ability-name="hoveredAbility.name" :target="hoveredAbility.target"></AbilityDetail>
  </article>
</template>

<style lang="scss">
#PokemonStats {
  margin: 1rem auto;
  max-width: 60rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 2rem;
  position: relative;

  header {
    grid-column: 1 / span 2;
  }

  h2 {
    font-size: 1.5rem;
    padding: 0.25rem 0.5rem;
    position: relative;
    border-bottom: 0.25rem solid $red;
    //clip-path: polygon(0px 100%, 0px 0%, 100% 0, 80% 100%);

  }
  dl.data {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap: 0.125rem;
    background-color: $gray;
    
    dt, dd {
      padding: 0.25rem 0.5rem;
    }
    dt {
      font-weight: bold;
      background: $gray_light;
    }
    dd {
      background: white;
    }
  }
  ol.data {
    background: $gray;
    li {
      display: grid;
      grid-template-columns: 1fr 1fr;
      & > span {
        padding: 0.25rem 0.5rem;
      &:first-child {
        background: $gray_light;
        font-weight: 700;
      }
      &:last-child {
        background: white;
      }
    }
      &+ li {
        margin-top: 0.125rem;
      }
    }
    &.moves-list {
      li {
        grid-template-columns: 4rem 1fr;
        
      }
    }
  }
  ul.data-list {
    background: white;
    padding: 0.25rem 0.5rem;
    li {
      display: inline;
      &::after {
        content: ', ';
      }
      &:last-child::after {
        content: '';
      }
    }
  }
  ol.evolutions,
  ol.move-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  p.move-text {
    span+span {
      &::before {
        content: ', ';
      }
    }
  }

  .comma-list-item+.comma-list-item::before {
    content: ", ";
  }

  .hoverable {
    cursor: help;
    text-decoration: underline dotted #bbb;
  }
}
</style>