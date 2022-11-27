<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const showMenu = ref(false);
</script>

<template>
    <header id="SiteHeader" :class="[$route.name]">
        <button id="openMenu" @click="showMenu = !showMenu"><svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512">
                <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                <path
                    d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg></button>
        <h1>Fakemon Codex</h1>
        <nav :class="{ open: showMenu }" @click="showMenu = !showMenu">
            <button id="closeMenu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
                    <path
                        d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" />
                </svg>
            </button>
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

    @media screen and (max-width:1023px) {
        display: flex;
        padding: 0.25rem 0;
        align-items: center;
    }

    #openMenu,
    #closeMenu {
        padding: 0 1rem;
        display: flex;
        align-items: center;

        svg {
            height: 1rem;
            fill: $off-white;

        }

        @media screen and (min-width: 1024px) {
            display: none;
        }
    }

    &.pokeGen {
        background: linear-gradient(90deg, rgba($blue, 1) 0%, rgba($blue_med, 1) 80%);
    }

    h1 {

        position: relative;
        display: inline-block;
        color: $off_white;

        @media screen and (max-width: 1023px) {
            font-size: 1.5rem;
        }

    }

    nav {
        @media screen and (max-width: 1023px) {
            position: fixed;
            top: 0;
            left: -100vw;
            width: 100%;
            height: 100vh;

            &.open {
                left: 0;
                z-index: 100;
            }

            #closeMenu {
                width: 40vw;
                background: $body-font-color;
                color: $off-white;
                padding: 0.25rem 1rem;
                text-align: right;
                min-height: 2.75rem;
                display: flex;
                align-items: center;
                flex-direction: row;
                justify-content: flex-end;
            }
        }

        ul {
            display: block;
            background: $body-font-color;
            height: 100%;

            @media screen and (max-width: 1023px) {
                width: 40vw;
                box-shadow: 0px 8px 24px rgba(17, 17, 26, 0.1), 0px 16px 56px rgba(17, 17, 26, 0.1), 0px 24px 80px rgba(17, 17, 26, 0.1);
            }
        }

        a {
            color: $off_white;
            padding: 0.25rem 1rem;
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

        @media screen and (min-width: 1024px) {
            ul {



                li {

                    display: inline-block;

                    &+li {
                        margin-left: 0.5rem;
                    }


                }
            }
        }
    }
}
</style>
