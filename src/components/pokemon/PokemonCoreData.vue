<script setup lang="ts">
import {computed, toDisplayString} from 'vue';
import TypeDisplay from './TypeDisplayBlock.vue';

interface Props {
    pokemon: any;
}
// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
const props = defineProps<Props>();

const adjustedStats = computed(() => {
    const s = {
        displayStats: {},
        statDetail: {},
        
    }
    if(parseInt(props.pokemon.stats.hp)) {
        s.displayStats = props.pokemon.stats;
    } else {
        s.statDetail = {
            hp: `Base: ${props.pokemon.stats.hp.base} + Mod: ${props.pokemon.stats.hp.mod}`,
            attack: `Base: ${props.pokemon.stats.attack.base} + Mod: ${props.pokemon.stats.attack.mod}`,
            defense: `Base: ${props.pokemon.stats.defense.base} + Mod: ${props.pokemon.stats.defense.mod}`,
            specialAttack: `Base: ${props.pokemon.stats.specialAttack.base} + Mod: ${props.pokemon.stats.specialAttack.mod}`,
            specialDefense: `Base: ${props.pokemon.stats.specialDefense.base} + Mod: ${props.pokemon.stats.specialDefense.mod}`,
            speed: `Base: ${props.pokemon.stats.speed.base} + Mod: ${props.pokemon.stats.speed.mod}`,
        }
        s.displayStats = {
            hp: props.pokemon.stats.hp.base + props.pokemon.stats.hp.mod,
            attack: props.pokemon.stats.attack.base + props.pokemon.stats.attack.mod,
            defense: props.pokemon.stats.defense.base + props.pokemon.stats.defense.mod,
            specialAttack: props.pokemon.stats.specialAttack.base + props.pokemon.stats.specialAttack.mod,
            specialDefense: props.pokemon.stats.specialDefense.base + props.pokemon.stats.specialDefense.mod,
            speed: props.pokemon.stats.speed.base + props.pokemon.stats.speed.mod,

        }
    }
    return s;
})

</script>
<template>
    <section class="core-data">
        <div class="title">
            <h1>{{ pokemon.name }}</h1>
            <h2>The name pokemon</h2>
        </div>
        <div class="types">
            <TypeDisplay v-for="(type, idx) in pokemon.types" :key="idx" :type-name="type.toLowerCase()"></TypeDisplay>
        </div>
        <img :src="`http://img.pokemondb.net/artwork/${pokemon.name.toLowerCase()}.jpg`" alt="" />
        <div class="gender">
            <div>
                <strong>Gender</strong>&nbsp;
                <span v-if="pokemon.breeding">{{ pokemon.breeding.ratio.male }}% M / {{ pokemon.breeding.ratio.female
                }}% F</span>
                <span v-else class="gender" :class="[pokemon.gender]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" v-if="pokemon?.gender == 'Male'">
                        <path
                            d="M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8H424c13.3 0 24 10.7 24 24V168c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80l0 0h0v0zM176 416c61.9 0 112-50.1 112-112s-50.1-112-112-112s-112 50.1-112 112s50.1 112 112 112z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" v-if="pokemon?.gender == 'Female'">
                        <path
                            d="M304 176c0 61.9-50.1 112-112 112s-112-50.1-112-112s50.1-112 112-112s112 50.1 112 112zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1V384H128c-17.7 0-32 14.3-32 32s14.3 32 32 32h32v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H224V349.1z" />
                    </svg>
                    {{ pokemon.gender }}
                </span>
            </div>
        </div>
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
        <div class="stats" >
            <div><strong>HP</strong> <span v-tooltip:top.tooltip="adjustedStats.statDetail.hp">{{ adjustedStats.displayStats.hp }}</span></div>
            <div><strong>ATK</strong> <span v-tooltip:top.tooltip="adjustedStats.statDetail.attack">{{ adjustedStats.displayStats.attack }}</span></div>
            <div><strong>DEF</strong> <span v-tooltip:top.tooltip="adjustedStats.statDetail.defense">{{ adjustedStats.displayStats.defense }}</span></div>
            <div><strong>SATK</strong> <span v-tooltip:top.tooltip="adjustedStats.statDetail.specialAttack">{{ adjustedStats.displayStats.specialAttack }}</span></div>
            <div><strong>SDEF</strong> <span v-tooltip:top.tooltip="adjustedStats.statDetail.specialDefense">{{ adjustedStats.displayStats.specialDefense }}</span></div>
            <div><strong>SPD</strong> <span v-tooltip:top.tooltip="adjustedStats.statDetail.speed">{{ adjustedStats.displayStats.speed }}</span></div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.core-data {
    width: calc(100vw - 2rem);
    border: 2px solid var(--pokemon-color-dark);
    margin: 0 auto;
    background-color: white;
    position: relative;

    strong {
        font-family: 'Encode Sans Condensed';
    }

    .title {
        background: var(--pokemon-color);
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

    .gender div {
        border: 1px solid var(--pokemon-color-dark);
        border-width: 2px 0 0 0;
        padding: 0.25rem 0.5rem;
        text-align: center;

        svg {
            width: 12px;
        }

        .Male svg {
            fill: $red;
        }

        .Female svg {
            fill: $blue;
        }
    }

    .physical,
    .stats {
        display: grid;

        div {
            border: 1px solid var(--pokemon-color-dark);
            border-width: 2px 1px 0 1px;
            padding: 0.25rem 0.5rem;
            text-align: center;

            &:first-child {
                border-left-width: 0;
            }

            &:last-child {
                border-right-width: 0;
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
        width: 480px;
        min-width: 480px;
        min-height: 480px;
        background-image: var(--pokemon-image);
        background-position: center;
        background-repeat: no-repeat;
        background-size: auto 360px;
        display: flex;
        flex-direction: column;

        img {
            display: none;
        }

        .title,
        .types {
            width: 66%;
        }

        .types {
            display: block;

            .type-display-block+.type-display-block {
                margin-left: 0.5rem;
            }
        }

        .gender {
            margin-top: auto;
        }

        .physical,
        .stats,
        .gender {
            &>div {
                border-top-width: 2px;
                background: white;
            }

            div span {
                display: inline-block;
            }
        }

        .physical,
        .gender {
            display: flex;
            justify-content: flex-end;

            div:first-child {
                border-left-width: 2px;
            }
        }

        .stats {
            &>div {
                display: grid;
                grid-template-columns: 1fr 1fr;

                span {
                    text-align: right;
                }
            }
        }
    }
}
</style>