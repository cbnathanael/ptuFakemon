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
import StatRaiseLower from './StatRaiseLower.vue';
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
function getNatureType(stat: string) {
    if (data.pokemon?.nature?.raise == stat && data.pokemon?.nature?.lower == stat) {
        return null;
    }
    if (data.pokemon?.nature?.raise == stat) {
        return 'raise'
    }
    if (data.pokemon?.nature?.lower == stat) {
        return 'lower'
    }
    return null;
}
// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
</script>
<template>
    <article id="PokemonStatBlock">
        <section class="core">
            <header>
                    <img :src="`https://img.pokemondb.net/artwork/vector/large/${data.pokemon?.speciesData.name.toLowerCase()}.avif`"
                    alt="">
                <div>
                    <h1>{{ pokemon.speciesData.name }}</h1>
                    <div class="type">
                        <TypeDisplay :type-name="type.toLowerCase()"
                            v-for="(type, idx) in data.pokemon?.speciesData.types" :key="idx"></TypeDisplay>
                    </div>
                    <hr>
                    <div class="level-gender">
                        <span><strong>Hit Pts:</strong> {{ data.pokemon?.hitPoints }}
                        </span>

                        <span class="gender" :class="[data.pokemon?.gender]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
                                v-if="data.pokemon?.gender == 'Male'">
                                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8H424c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80l0 0h0v0zM176 416c61.9 0 112-50.1 112-112s-50.1-112-112-112s-112 50.1-112 112s50.1 112 112 112z" />
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"
                                v-if="data.pokemon?.gender == 'Female'">
                                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                                <path
                                    d="M304 176c0 61.9-50.1 112-112 112s-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1V384H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V349.1z" />
                            </svg>
                        </span>

                        <span class="level"><strong>Lv:</strong> {{ data.pokemon?.level }}
                        </span>
                    </div>

                </div>
            </header>
            <dl class="stat-group">
                <dt>
                    <StatRaiseLower :type="getNatureType('hp')"></StatRaiseLower>HP
                </dt>
                <dd>{{ data.pokemon?.stats.hp.base + data.pokemon?.stats.hp.mod }}</dd>
                <dt>
                    <StatRaiseLower :type="getNatureType('satk')"></StatRaiseLower>
                    <span class="desktop-only">Sp. Attack</span><span class="mobile-only">SpAtk</span>
                </dt>
                <dd>{{ data.pokemon?.stats.specialAttack.base + data.pokemon?.stats.specialAttack.mod }}</dd>
                <dt>
                    <StatRaiseLower :type="getNatureType('atk')"></StatRaiseLower>
                    <span class="desktop-only">Attack</span><span class="mobile-only">Atk</span>
                </dt>
                <dd>{{ data.pokemon?.stats.attack.base + data.pokemon?.stats.attack.mod }}</dd>
                <dt>
                    <StatRaiseLower :type="getNatureType('sdef')"></StatRaiseLower>
                    <span class="desktop-only">Sp. Defense</span><span class="mobile-only">SpDef</span>
                </dt>
                <dd>{{ data.pokemon?.stats.specialDefense.base + data.pokemon?.stats.specialDefense.mod }}</dd>
                <dt>
                    <StatRaiseLower :type="getNatureType('def')"></StatRaiseLower>
                    <span class="desktop-only">Defense</span><span class="mobile-only">Def</span>
                </dt>
                <dd>{{ data.pokemon?.stats.defense.base + data.pokemon?.stats.defense.mod }}</dd>
                <dt>
                    <StatRaiseLower :type="getNatureType('spd')"></StatRaiseLower>
                    <span class="desktop-only">Speed</span><span class="mobile-only">Spd</span>
                </dt>
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
                <dd>
                    <span v-for="(ability, idx) in data.pokemon?.abilities" :key="idx"
                        @mouseover="abilityDisplay(ability, true, $event)"
                        @mouseleave="abilityDisplay(ability, false, $event)" class="hoverable">{{ ability }}</span>
                </dd>
            </dl>
        </section>
        <section class="detail">
            <nav>

            </nav>
            <section class="moves">
                <ul>
                    <li v-for="(move, idx) in data.pokemon?.moves" :key="idx">
                        <MoveDisplay :moveName="move.name" :displayType="'block'"></MoveDisplay>
                        <!-- &ndash; {{move.type}} -->
                    </li>
                </ul>
            </section>
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

    grid-template-columns: 1fr;
    grid-row-gap: 0.5rem;

    @media screen and (min-width:1024px) {
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.5rem;
    }

    &>section {
        border-radius: 0.4rem;

    }

    section.core {
        background: $gray_light;
        padding-bottom: 0.5rem;

        header {
            background: $gray;
            border-radius: 0.4rem 0.4rem 0 0;
            padding: 0.5rem;
            display: grid;
            grid-template-columns: 1fr 2fr;
            grid-column-gap: 0.5rem;

            &>div {
                //display: grid;
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
                    grid-template-columns: 2fr 2rem 1fr;
                    grid-column-gap: 0.5rem;

                    .gender {
                        border-radius: 1000px;
                        width: 1.5rem;
                        display: flex;
                        align-content: center;
                        justify-content: center;

                        svg {
                            width: 12px;
                            fill: $off-white;
                        }

                        &.Male {
                            background: $red;
                        }

                        &.Female {
                            background: $blue;
                        }
                    }

                    .level {
                        text-align: right;
                    }
                }

                hr {
                    grid-column: 1 / span 2;
                    margin: 0.5rem 0;
                    border-top: 1px solid $gray_med;
                }
            }

        }

        dl.stat-group {
            padding: 0.5rem;
            display: grid;
            grid-template-columns: repeat(4, 1fr);

            dt {
                font-weight: 600;
                display: flex;
                align-items: center;

                .stat-raise-lower {
                    margin-right: 0.5rem;
                }
            }

            &+dl.stat-group {
                padding-top: 0;
            }
        }

        .stat-nature {
            display: inline-block;

        }

        dl.abilities {
            padding: 0.5rem;
            display: grid;
            grid-template-columns: 1fr 2fr;

            dt {
                font-weight: 600;
            }

        }

        hr {
            margin: 0 0.5rem;
            border-top: 1px solid $gray;
        }
    }

    section.detail {
        background: $body-font-color;
        color: $off_white;
        padding: 0.5rem;


        .moves {
            li + li {
                margin-top: 0.5rem;
            }
        }
    }
}
</style>