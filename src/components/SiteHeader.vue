<script setup lang="ts">
import { useRouter } from "vue-router";
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
    background: linear-gradient(90deg, rgba($red, 1) 0%, rgba($red_med, 1) 80%);
    box-shadow: 0px 4px 16px rgba(17, 17, 26, 0.1), 0px 8px 32px rgba(17, 17, 26, 0.05);
    margin-bottom: 2rem;

    &.pokeGen {
        background: linear-gradient(90deg, rgba($blue, 1) 0%, rgba($blue_med, 1) 80%);
    }

    h1 {
        padding: 0 3rem 0 1rem;
        position: relative;
        display: inline-block;
        color: $off_white;
    }

    nav {
        ul {
            display: block;
            background: $body_font_color;
            padding-left: 3rem;

            li {
                display: inline-block;

                & + li {
                  margin-left: 0.5rem;
                }

                a {
                    color: $off_white;
                    padding: 0.25rem 0.75rem;
                    display: block;
                    text-decoration: none;
                    position: relative;
                    @include transition-medium-in;

                    &:hover,
                    &.active {
                        @include transition-medium-out;
                    }

                    &:hover {
                        color: $yellow_accent;
                    }

                    &.active {
                        background: $yellow_accent;
                        color: $body_font_color;
                    }
                }
            }
        }
    }
}
</style>
