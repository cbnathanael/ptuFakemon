<script setup lang="ts">
import { ref, reactive, onBeforeMount, onUpdated } from 'vue';
import { useStore } from 'vuex';
import PokemonCharacter from '@/interfaces/pokemon/pokemonCharacter';

import formatting from '@/formatting';
import TypeDisplay from './TypeDisplayBlock.vue';
import AbilityDetail from './AbilityDetail.vue';
import MoveDisplay from "./MoveDisplay.vue";
import VueSelect from 'vue-select';
import PokemonNature from '@/interfaces/pokemon/PokemonNature';
const store = useStore();
interface Props {
    pokemon: PokemonCharacter;
}
interface sheetData {
    natureList: PokemonNature[],
    pokemon?: PokemonCharacter
}
const natureList = ref();
const data: sheetData = reactive({
    natureList: [],
    pokemon: undefined
});
onBeforeMount(() => {
    data.pokemon = Object.assign({}, props.pokemon)
    let nL = store.getters['pokemon/allNatures'];
    if (nL.length == 0) {
        store.dispatch("getAllNatures").then(natures => {
            nL = natures;
        })
    }
    natureList.value = nL;
});

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
// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
</script>
<template>
    <article id="PokemonCharacterSheet">
        <section class="stats">
            <div class="stat-column">
                <dl class="stat-group">
                    <dt class="species">
                        Species
                    </dt>
                    <dd class="species"><input type="text" :value="pokemon.speciesData.name" /></dd>
                    <dt class="type">
                        Type
                    </dt>
                    <dd class="type">
                        <TypeDisplay :type-name="type.toLowerCase()" v-for="(type, idx) in pokemon.speciesData.types"
                            :key="idx"></TypeDisplay>
                    </dd>
                    <dt class="level">
                        Level
                    </dt>
                    <dd class="level">{{ data.pokemon?.level }}</dd>
                    <dt class="exp">
                        EXP
                    </dt>
                    <dd class="exp"><input type="number" value="0" />/<input type="number" value="0" /></dd>
                    <dt class="item">
                        Held Item
                    </dt>
                    <dd class="item"></dd>
                    <dt class="loyalty">
                        Loyalty
                    </dt>
                    <dd class="loyalty"></dd>
                    <dt class="gender">
                        Gender
                    </dt>
                    <dd class="gender">{{ pokemon.gender }}</dd>
                    <dt class="nature">
                        Nature
                    </dt>
                    <dd class="nature">
                        {{ data.pokemon?.nature?.nature }}
                        (+{{ data.pokemon?.nature?.raise }} / -{{ data.pokemon?.nature?.lower }})
                    </dd>
                    <dt class="abilities">Abilities</dt>
                    <dd class="abilities">
                        <span v-for="(ability, idx) in data.pokemon?.abilities" :key="idx"
                            @mouseover="abilityDisplay(ability, true, $event)"
                            @mouseleave="abilityDisplay(ability, false, $event)" class="hoverable">{{ ability }}</span>
                        <!-- <input type="text" :value="pokemon.abilities[0]"/>
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                        <input type="text" /> -->
                    </dd>
                    <dt>Height/Size</dt>
                    <dd>{{ data.pokemon?.size.height.inches }}&rdquo; / {{ data.pokemon?.size.height.metric }} m
                        ({{ data.pokemon?.size.height.scale }})</dd>
                    <dt>Weight Class</dt>
                    <dd>{{ data.pokemon?.size.weight.pounds }} lbs. / {{ data.pokemon?.size.weight.kilograms }} kg
                        ({{ data.pokemon?.size.weight.scale }})</dd>
                    <dt class="capabilities">Capabilities</dt>
                    <dd class="capabilities">Overland {{ data.pokemon?.movement.overland.base }}, Swim
                        {{ data.pokemon?.movement.swim.base }}, Jump
                        {{ data.pokemon?.movement.lJump.base }}/{{ data.pokemon?.movement.hJump.base }},
                        Power {{ data.pokemon?.power }}, <span v-for="(cap, idx) in data.pokemon?.capabilities"
                            :key="idx">{{ cap }}, </span>
                    </dd>
                    <dt class="skills">Skills</dt>
                    <dd class="skills">
                        <span
                            v-if="!(data.pokemon?.skills.acrobatics.dice == 2 && data.pokemon?.skills.acrobatics.modifier == 0)">Acrobatics
                            {{ formatting.diceFormat(data.pokemon?.skills.acrobatics) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.athletics.dice == 2 && data.pokemon?.skills.athletics.modifier == 0)">Athletics
                            {{ formatting.diceFormat(data.pokemon?.skills.athletics) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.charm.dice == 2 && data.pokemon?.skills.charm.modifier == 0)">Charm
                            {{ formatting.diceFormat(data.pokemon?.skills.charm) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.combat.dice == 2 && data.pokemon?.skills.combat.modifier == 0)">Combat
                            {{ formatting.diceFormat(data.pokemon?.skills.combat) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.command.dice == 2 && data.pokemon?.skills.command.modifier == 0)">Command
                            {{ formatting.diceFormat(data.pokemon?.skills.command) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.focus.dice == 2 && data.pokemon?.skills.focus.modifier == 0)">Focus
                            {{ formatting.diceFormat(data.pokemon?.skills.focus) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.guile.dice == 2 && data.pokemon?.skills.guile.modifier == 0)">Guile
                            {{ formatting.diceFormat(data.pokemon?.skills.guile) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.intimidate.dice == 2 && data.pokemon?.skills.intimidate.modifier == 0)">Intimidate
                            {{ formatting.diceFormat(data.pokemon?.skills.intimidate) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.intuition.dice == 2 && data.pokemon?.skills.intuition.modifier == 0)">Intuition
                            {{ formatting.diceFormat(data.pokemon?.skills.intuition) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.perception.dice == 2 && data.pokemon?.skills.perception.modifier == 0)">Perception
                            {{ formatting.diceFormat(data.pokemon?.skills.perception) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.stealth.dice == 2 && data.pokemon?.skills.stealth.modifier == 0)">Stealth
                            {{ formatting.diceFormat(data.pokemon?.skills.stealth) }} </span>
                        <span
                            v-if="!(data.pokemon?.skills.survival.dice == 2 && data.pokemon?.skills.survival.modifier == 0)">Survival
                            {{ formatting.diceFormat(data.pokemon?.skills.survival) }} </span>
                    </dd>

                </dl>
                <div class="sub-group">
                    <dl class="stat-group stat-block">
                        <dt class="hit-points">Hit Points</dt>
                        <dd class="hit-points">{{data.pokemon?.hitPoints}} / {{data.pokemon?.hitPoints}}</dd>
                        <dt>HP</dt>
                        <dd>{{data.pokemon?.stats.hp.base + data.pokemon?.stats.hp.mod}}</dd>
                        <dt>SpAtk</dt>
                        <dd>{{data.pokemon?.stats.specialAttack.base + data.pokemon?.stats.specialAttack.mod}}</dd>
                        <dt>Atk</dt>
                        <dd>{{data.pokemon?.stats.attack.base + data.pokemon?.stats.attack.mod}}</dd>
                        <dt>SpDef</dt>
                        <dd>{{data.pokemon?.stats.specialDefense.base + data.pokemon?.stats.specialDefense.mod}}</dd>
                        <dt>Def</dt>
                        <dd>{{data.pokemon?.stats.defense.base + data.pokemon?.stats.defense.mod}}</dd>
                        <dt>Spd</dt>
                        <dd>{{data.pokemon?.stats.speed.base + data.pokemon?.stats.speed.mod}}</dd>
                    </dl>
                    <dl class="stat-group">
                        <dt>Phys Evade</dt>
                        <dd></dd>
                        <dt>Spec Evade</dt>
                        <dd></dd>
                        <dt>Speed Evade</dt>
                        <dd></dd>
                        <dt>Injuries</dt>
                        <dd></dd>
                    </dl>
                </div>
            </div>
        </section>
        <AbilityDetail :ability-name="hoveredAbility.name" :target="hoveredAbility.target"></AbilityDetail>
    </article>
</template>

<style scoped lang="scss">
#PokemonCharacterSheet {
    max-width: 60rem;
    margin: 0 auto;

    .stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 1rem;
    }
    .sub-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.125rem;
        margin-top: 0.5rem;
    }
    dl.stat-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-row-gap: 0.125rem;
        background-color: $gray;

        dt,
        dd {
            padding: 0.25rem 0.5rem;

            &.level,
            &.exp {
                input {
                    width: 5rem;
                }
            }

            &.nature {
                input {
                    width: 3rem;
                }
            }

            &.capabilities {
                input[type=number] {
                    width: 1.5rem;
                }
            }

            &.skills {
                input {
                    width: 4rem;
                }
            }
        }

        dt {
            font-weight: bold;
            background: $gray_light;
        }

        dd {
            background: white;

            input {
                width: 100%;
                border-bottom: none;
            }
        }
        &.stat-block {
            grid-template-columns: repeat(4,1fr);
            border: 0.125rem solid $gray;
            
            dt.hit-points {
                grid-column: 1 / span 2
            }
            dd.hit-points {
                grid-column: 3 / span 2
            }
        }
        dd.skills {
            span+span::before {
                content: ', ';
            }
        }
    }


    .abilities {

        input {
            display: inline;

        }
    }
}
</style>