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
import MoveDetailSheet from './MoveDetailSheet.vue';
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
    <article id="PokemonStatBlock">
        <section class="core">
            <header>
                <img :src="`http://img.pokemondb.net/artwork/${data.pokemon?.speciesData.name.toLowerCase()}.jpg`"
                    alt="">
                <div>
                    <h1>{{ pokemon.speciesData.name }}</h1>
                    <div class="type">
                        <TypeDisplay :type-name="type.toLowerCase()"
                            v-for="(type, idx) in data.pokemon?.speciesData.types" :key="idx"></TypeDisplay>
                    </div>
                    <hr>
                    <div class="level-gender">
                        <span><strong>Hit Points:</strong> {{ data.pokemon?.hitPoints }}
                        </span>

                        <span><strong>Gender:</strong> {{ data.pokemon?.gender }}
                        </span>

                        <span><strong>Level:</strong> {{ data.pokemon?.level }}
                        </span>
                    </div>

                </div>
            </header>
            <dl class="stat-group">
                <dt>HP</dt>
                <dd>{{ data.pokemon?.stats.hp.base + data.pokemon?.stats.hp.mod }}</dd>
                <dt>Sp. Attack</dt>
                <dd>{{ data.pokemon?.stats.specialAttack.base + data.pokemon?.stats.specialAttack.mod }}</dd>
                <dt>Attack</dt>
                <dd>{{ data.pokemon?.stats.attack.base + data.pokemon?.stats.attack.mod }}</dd>
                <dt>Sp. Defense</dt>
                <dd>{{ data.pokemon?.stats.specialDefense.base + data.pokemon?.stats.specialDefense.mod }}</dd>
                <dt>Defense</dt>
                <dd>{{ data.pokemon?.stats.defense.base + data.pokemon?.stats.defense.mod }}</dd>
                <dt>Speed</dt>
                <dd>{{ data.pokemon?.stats.speed.base + data.pokemon?.stats.speed.mod }}</dd>
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
            <hr>
            <dl class="abilities">
                <dt>Abilities</dt>
                <dd >
                    <span v-for="(ability, idx) in data.pokemon?.abilities" :key="idx" @mouseover="abilityDisplay(ability, true, $event)"
                        @mouseleave="abilityDisplay(ability, false, $event)" class="hoverable">{{ ability }}</span>
                </dd>
            </dl>
        </section>
        <section class="detail">

        </section>
        <AbilityDetail :ability-name="hoveredAbility.name" :target="hoveredAbility.target"></AbilityDetail>
    </article>
</template>

<style scoped lang="scss">
#PokemonStatBlock {
    //max-width: 60rem;
    margin: 0 1rem;
    background: rgba($off_white, 0.6);
    border-radius: 0.5rem;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0.5rem;

    &>section {
        border-radius: 0.4rem;

    }

    section.core {
        background: $gray_light;
        padding-bottom: 1rem;

        header {
            background: $gray;
            border-radius: 0.4rem 0.4rem 0 0;
            padding: 1rem;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-column-gap: 0.5rem;

            &>div {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-column-gap: 0.5rem;
                grid-auto-rows: min-content;
                align-items: center;
                grid-row-gap: 0.5rem;

                h1 {
                    font-size: 1.25rem;
                    font-weight: 600;
                }

                .type {
                    text-align: right;

                    .type-display-block+.type-display-block {
                        margin-left: 0.5rem;
                    }
                }

                .level-gender {

                    grid-column: 1 / span 2;
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-column-gap: 0.5rem;
                }

                hr {
                    grid-column: 1 / span 2;
                    margin: 0;
                    border-top: 1px solid $gray_med;
                }
            }

        }

        dl.stat-group {
            padding: 1rem;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            dt {
                font-weight: 600;
            }
            & + dl.stat-group {
                padding-top: 0;
            }
        }

        dl.abilities {
            padding: 1rem;
            display: grid;
            grid-template-columns: 1fr 2fr;
            dt {
                font-weight: 600;
            }
            
        }

        hr {
            margin: 0 1rem;
            border-top: 1px solid $gray;
        }
    }

    section.detail {
        background: $body-font-color;
        color: $off_white;
    }
}
</style>