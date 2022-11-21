<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
    <header id="SiteHeader" :class="[$route.name]">
        <h1>Fakemon Codex</h1>
        <nav>
            <ul>
                <li>
                    <router-link to="/" class="pokedex" :class="{ active: $route.name == 'pokedex' }">Pokedex
                    </router-link>
                </li>
                <li>
                    <router-link to="/PokemonGenerator" class="pokeGen" :class="{ active: $route.name == 'pokeGen' }">
                        Pokemon Gen</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<style lang="scss">
#SiteHeader {
    background: linear-gradient(90deg, rgba($red_light, 1) 0%, rgba(white, 1) 80%);
    box-shadow: 0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 32px rgba(17, 17, 26, 0.05);
    margin-bottom: 2rem;

    &.pokedex h1 {
        background: $red;
    }

    &.pokeGen {
        background: linear-gradient(90deg, rgba($blue_light, 1) 0%, rgba(white, 1) 80%);
        h1 {
            background: $blue;

            &::before {
                background: $blue_med;
            }
        }
    }

    h1 {
        padding: 0 3rem 0 1rem;
        position: relative;
        background: $red;
        display: inline-block;
        color: white;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            right: -18px;
            width: 2.5rem;
            height: 100%;
            transform: skewX(-30deg);
            transform-origin: 100%;
            background: $red_med;
        }
    }

    nav {
        ul {
            display: block;
            background: black;
            padding-left: 3rem;

            li {
                display: inline-block;

                &+li {
                    margin-left: 1rem;
                }

                a {
                    color: white;
                    padding: 0.25rem 2rem;
                    display: block;
                    text-decoration: none;
                    position: relative;
                    clip-path: polygon(0px 100%, 18px 0%, 100% 0, calc(100% - 18px) 100%);
                    @include transition-medium-in;

                    &::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 0;
                        height: 100%;
                        transform: skewX(-30deg);
                        transform-origin: 100%;
                        @include transition-medium-in;
                    }

                    &:hover,
                    &.active {
                        @include transition-medium-out;

                        &::before {
                            width: 1.5rem;
                            @include transition-medium-out;
                        }
                    }

                    &.pokedex {
                        background: rgba($red, 0);

                        &::before {
                            background: $red_med;
                        }

                        &:hover,
                        &.active {
                            background: $red;
                        }
                    }

                    &.pokeGen {
                        background: rgba($blue, 0);

                        &::before {
                            background: $blue_med;
                        }

                        &:hover,
                        &.active {
                            background: $blue;
                        }
                    }
                }
            }
        }
    }
}
</style>