<script setup lang="ts">
import PokemonCharacter from '@/interfaces/pokemon/pokemonCharacter';

import formatting from '@/formatting';
import TypeDisplay from './TypeDisplayBlock.vue';
import AbilityDetail from './AbilityDetail.vue';
import MoveDisplay from "./MoveDisplay.vue";
interface Props {
    pokemon: PokemonCharacter;
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
                        <TypeDisplay :type-name="type.toLowerCase()" v-for="(type, idx) in pokemon.speciesData.types" :key="idx"></TypeDisplay>
                    </dd>
                    <dt class="level">
                        Level
                    </dt>
                    <dd class="level"><input type="number" value="1" /></dd>
                    <dt class="exp">
                        EXP
                    </dt>
                    <dd class="exp"><input type="number" value="0"/>/<input type="number" value="0" /></dd>
                    <dt class="item">
                        Held Item
                    </dt>
                    <dd class="item"><input type="text" /></dd>
                    <dt class="loyalty">
                        Loyalty
                    </dt>
                    <dd class="loyalty"><input type="text" /></dd>
                    <dt class="gender">
                        Gender
                    </dt>
                    <dd class="gender"><input type="text" /></dd>
                    <dt class="nature">
                        Nature
                    </dt>
                    <dd class="nature">
                        <select>
                            <option value="1">Mellow</option>
                        </select>
                        (+<input type="text" /> / -<input type="text" />)
                    </dd>
                    <dt class="abilities">Abilities</dt>
                    <dd class="abilities">
                        <input type="text" :value="pokemon.abilities[0]"/>
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                        <input type="text" />
                    </dd>
                    <dt>Height/Size</dt>
                    <dd><input type="text"></dd>
                    <dt>Weight Class</dt>
                    <dd><input type="text"></dd>
                    <dt class="capabilities">Capabilities</dt>
                    <dd class="capabilities">Overland <input type="number" />, Swim <input type="number" />, Jump <input
                            type="number" />/<input type="number" />,
                        Power <input type="number" />, <input type="text">
                    </dd>
                    <dt class="skills">Skills</dt>
                    <dd class="skills">Athl <input type="text" />, Acro <input type="text" />, Combat <input
                            type="text" />, Stealth <input type="text" />, Percep <input type="text" />, Focus <input
                            type="text" /></dd>
                </dl>
            </div>
        </section>
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
    }


    .abilities {

        input {
            display: inline;

        }
    }
}
</style>