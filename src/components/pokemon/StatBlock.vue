<script setup lang="ts">
  import Pokemon from '@/interfaces/pokemon/pokemon';
  import { reactive, computed } from "vue";
  import formatting from '@/formatting';
  interface Props {
    pokemon: Pokemon;
  }
  // eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
  const props = defineProps<Props>();

</script>

<template>
  <article id="PokemonStats">
    <header>
      <h1>{{pokemon.name}}</h1>
    </header>
    <div class="column column-left">
      <section id="PokemonBaseStats">
        <h2>Base Stats</h2>
        <dl>
          <dt>HP</dt>
          <dd>{{pokemon.stats.hp}}</dd>
          <dt>Attack</dt>
          <dd>{{pokemon.stats.attack}}</dd>
          <dt>Defense</dt>
          <dd>{{pokemon.stats.defense}}</dd>
          <dt>Special Attack</dt>
          <dd>{{pokemon.stats.specialAttack}}</dd>
          <dt>Special Defense</dt>
          <dd>{{pokemon.stats.specialDefense}}</dd>
          <dt>Speed</dt>
          <dd>{{pokemon.stats.speed}}</dd>
        </dl>
      </section>
      <section id="PokemonBasicInformation">
        <h2>Basic Information</h2>
        <dl>
          <dt>Type</dt>
          <dd><span v-for="(type, idx) in pokemon.types" :key="idx" class="comma-list-item">{{type}}</span></dd>
          <!-- <div v-for="(ability, idx) in pokemon.basic.abilities" :key="idx">
            <dt>Basic Ability {{idx + 1}}</dt>
            <dd>{{ability}}</dd>
          </div>
          <div v-for="(ability, idx) in pokemon.basic.advancedAbilities" :key="idx">
            <dt>Advanced Ability {{idx + 1}}</dt>
            <dd>{{ability}}</dd>
          </div>
          <dt>High Ability</dt>
          <dd>{{pokemon.basic.highAbility}}</dd> -->
        </dl>
      </section>
      <section id="PokemonEvolution">
        <h2>Evolution</h2>
        <ol class="evolutions">
        <!-- <li v-for="(evo, idx) in pokemon.evolution" :key="idx">
          {{evo.stage}} &ndash; {{evo.name}} <span v-if="evo.minimum > 0">Minimum {{evo.minimum}}</span>
        </li> -->
        </ol>
      </section>
      <section id="PokemonSize">
        <h2>Size Information</h2>
        <!-- <dl>
          <dt>Height</dt>
          <dd>{{pokemon.height.imperial}} / {{pokemon.height.metric}} ({{pokemon.height.scale}})</dd>
          <dt>Weight</dt>
          <dd>{{pokemon.weight.imperial}} / {{pokemon.weight.metric}} ({{pokemon.weight.scale}})</dd>
        </dl> -->
      </section>
      <section>
        <h2>Breeding Information</h2>
        <!-- <dl>
          <dt>Gender Ratio</dt>
          <dd>{{pokemon.breeding.gender.male}}% M / {{pokemon.breeding.gender.female}}</dd>
          <dt>Egg Group</dt>
          <dd><span v-for="(group, idx) in pokemon.breeding.eggGroup" :key="idx">{{group}}</span></dd>
          <dt>Average Hatch Rat</dt>
          <dd>{{pokemon.breeding.hatchRate}} Days</dd>
          <dt>Diet</dt>
          <dd><span v-for="(diet, idx) in pokemon.breeding.diet" :key="idx">{{diet}}</span></dd>
          <dt>Habitat</dt>
          <dd><span v-for="(habitat, idx) in pokemon.breeding.habitat" :key="idx">{{habitat}}</span></dd>
        </dl> -->
      </section>
    </div>
    <div class="column column-right">
      <section>
        <h2>Capability List</h2>
        <ul>
          <li v-for="(cap, idx) in pokemon.capabilities" :key="idx">
            {{cap}}
             <!-- <span v-if="cap.value">{{cap.value}}</span> -->
          </li>
        </ul>
      </section>
      <section>
        <h2>Skill List</h2>
        <ul>
        <li v-if="!(pokemon.skills.acrobatics.dice == 2 && pokemon.skills.acrobatics.modifier == 0)">acrobatics {{formatting.diceFormat(pokemon.skills.acrobatics)}} </li>
        <li v-if="!(pokemon.skills.athletics.dice == 2 && pokemon.skills.athletics.modifier == 0)">athletics {{formatting.diceFormat(pokemon.skills.athletics)}} </li>
        <li v-if="!(pokemon.skills.charm.dice == 2 && pokemon.skills.charm.modifier == 0)">charm {{formatting.diceFormat(pokemon.skills.charm)}} </li>
        <li v-if="!(pokemon.skills.combat.dice == 2 && pokemon.skills.combat.modifier == 0)">combat {{formatting.diceFormat(pokemon.skills.combat)}} </li>
        <li v-if="!(pokemon.skills.command.dice == 2 && pokemon.skills.command.modifier == 0)">command {{formatting.diceFormat(pokemon.skills.command)}} </li>
        <li v-if="!(pokemon.skills.focus.dice == 2 && pokemon.skills.focus.modifier == 0)">focus {{formatting.diceFormat(pokemon.skills.focus)}} </li>
        <li v-if="!(pokemon.skills.guile.dice == 2 && pokemon.skills.guile.modifier == 0)">guile {{formatting.diceFormat(pokemon.skills.guile)}} </li>
        <li v-if="!(pokemon.skills.intimidate.dice == 2 && pokemon.skills.intimidate.modifier == 0)">intimidate {{formatting.diceFormat(pokemon.skills.intimidate)}} </li>
        <li v-if="!(pokemon.skills.intuition.dice == 2 && pokemon.skills.intuition.modifier == 0)">intuition {{formatting.diceFormat(pokemon.skills.intuition)}} </li>
        <li v-if="!(pokemon.skills.perception.dice == 2 && pokemon.skills.perception.modifier == 0)">perception {{formatting.diceFormat(pokemon.skills.perception)}} </li>
        <li v-if="!(pokemon.skills.stealth.dice == 2 && pokemon.skills.stealth.modifier == 0)">stealth {{formatting.diceFormat(pokemon.skills.stealth)}} </li>
        <li v-if="!(pokemon.skills.survival.dice == 2 && pokemon.skills.survival.modifier == 0)">survival {{formatting.diceFormat(pokemon.skills.survival)}} </li>
          <!-- <li v-for="(skill, idx) in pokemon.skills" :key="idx">
            {{skill.name}} {{skill.dieValue.dieNumber}}d{{skill.dieValue.diceType}}<span v-if="skill.dieValue.modifier>0">+{{skill.dieValue.modifier}}</span>
          </li> -->
        </ul>
      </section>
      <section>
        <h2>Move List</h2>
        <!-- <ol class="move-list">
          <li v-for="(move, idx) in pokemon.moves" :key="idx">
            {{move.level}} {{move.name}} &ndash; {{move.type}}
          </li> 
        </ol> -->
      </section>
      <section>
        <h2>TM/HM Move List</h2>
        <!-- <p class="move-text">
          <span v-for="(move, idx) in pokemon.thmhMoves" :key="idx">{{move.level}} {{move.name}}</span>
        </p> -->
      </section>
      <section>
        <h2>Egg Move List</h2>
        <!-- <p class="move-text">
          <span v-for="(move, idx) in pokemon.eggMoves" :key="idx">{{move}}</span>
        </p> -->
      </section>
      <section>
        <h2>Tutor Move List</h2>
        <!-- <p class="move-text">
          <span v-for="(move, idx) in pokemon.tutorMoves" :key="idx">{{move}}</span>
        </p> -->
      </section>
    </div>
  </article>
</template>

<style lang="scss">
#PokemonStats {
  margin: 1rem auto;
  max-width: 50rem;
  display: grid;
  grid-template-columns: 1fr 1fr;

  header {
    grid-column: 1 / span 2;
  }

  dl {
    dt,
    dd {
      display: inline-block;
      width: 50%;
      margin: 0;
    }

    dt {
      font-weight: bold;

      &:after {
        content: ":";
      }
    }

    dd:after {
      content: "\a";
      white-space: pre;
    }
  }
  ol.evolutions, ol.move-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  p.move-text {
    span + span {
      &::before {
        content: ', ';
      }
    }
  }
  .comma-list-item + .comma-list-item::before {
    content: ", ";
  }
}
</style>