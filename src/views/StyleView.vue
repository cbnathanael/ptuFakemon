<template>
    <section>
        <span>normal</span>
        <div class="color-block normal"></div>
        <div class="color-block normal_dark"></div>
        <div class="color-block normal_light"></div>
        <span>bug</span>
        <div class="color-block bug"></div>
        <div class="color-block bug_dark"></div>
        <div class="color-block bug_light"></div>
        <span>electric</span>
        <div class="color-block electric"></div>
        <div class="color-block electric_dark"></div>
        <div class="color-block electric_light"></div>
        <span>fighting</span>
        <div class="color-block fighting"></div>
        <div class="color-block fighting_dark"></div>
        <div class="color-block fighting_light"></div>
        <span>ghost</span>
        <div class="color-block ghost"></div>
        <div class="color-block ghost_dark"></div>
        <div class="color-block ghost_light"></div>
        <span>psychic</span>
        <div class="color-block psychic"></div>
        <div class="color-block psychic_dark"></div>
        <div class="color-block psychic_light"></div>
        <span>flying</span>
        <div class="color-block flying"></div>
        <div class="color-block flying_dark"></div>
        <div class="color-block flying_light"></div>
        <span>steel</span>
        <div class="color-block steel"></div>
        <div class="color-block steel_dark"></div>
        <div class="color-block steel_light"></div>
        <span>ice</span>
        <div class="color-block ice"></div>
        <div class="color-block ice_dark"></div>
        <div class="color-block ice_light"></div>
        <span>poison</span>
        <div class="color-block poison"></div>
        <div class="color-block poison_dark"></div>
        <div class="color-block poison_light"></div>
        <span>fire</span>
        <div class="color-block fire"></div>
        <div class="color-block fire_dark"></div>
        <div class="color-block fire_light"></div>
        <span>dragon</span>
        <div class="color-block dragon"></div>
        <div class="color-block dragon_dark"></div>
        <div class="color-block dragon_light"></div>
        <span>ground</span>
        <div class="color-block ground"></div>
        <div class="color-block ground_dark"></div>
        <div class="color-block ground_light"></div>
        <span>water</span>
        <div class="color-block water"></div>
        <div class="color-block water_dark"></div>
        <div class="color-block water_light"></div>
        <span>dark</span>
        <div class="color-block dark"></div>
        <div class="color-block dark_dark"></div>
        <div class="color-block dark_light"></div>
        <span>rock</span>
        <div class="color-block rock"></div>
        <div class="color-block rock_dark"></div>
        <div class="color-block rock_light"></div>
        <span>grass</span>
        <div class="color-block grass"></div>
        <div class="color-block grass_dark"></div>
        <div class="color-block grass_light"></div>
        <span>fairy</span>
        <div class="color-block fairy"></div>
        <div class="color-block fairy_dark"></div>
        <div class="color-block fairy_light"></div>
    </section>
</template>

<script setup lang="ts">
window.setTimeout(() => {
    const blocks = document.getElementsByClassName("color-block");
    
    for(let i=0; i<blocks.length; i++) {
        blocks[i].textContent = blocks[i].classList[1] + ': ' +window.getComputedStyle(blocks[i]).backgroundColor;
    }
}, 2000)
</script>

<style lang="scss" scoped>
section {
    display: grid;
    grid-template-columns: 2rem 2rem 2rem;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    margin: 0 auto;
    width: 13rem;
    span {
        display: none;
    }
    div {
        width: 2rem;
        height: 2rem;
    }

    .normal {
        background-color: $type_normal;
    }

    .normal_dark {
        background-color: $type_normal_dark;
    }

    .normal_light {
        background-color: $type_normal_light;
    }

    .bug {
        background-color: $type_bug;
    }

    .bug_dark {
        background-color: $type_bug_dark;
    }

    .bug_light {
        background-color: $type_bug_light;
    }

    .electric {
        background-color: $type_electric;
    }

    .electric_dark {
        background-color: $type_electric_dark;
    }

    .electric_light {
        background-color: $type_electric_light;
    }

    .fighting {
        background-color: $type_fighting;
    }

    .fighting_dark {
        background-color: $type_fighting_dark;
    }

    .fighting_light {
        background-color: $type_fighting_light;
    }

    .ghost {
        background-color: $type_ghost;
    }

    .ghost_dark {
        background-color: $type_ghost_dark;
    }

    .ghost_light {
        background-color: $type_ghost_light;
    }

    .psychic {
        background-color: $type_psychic;
    }

    .psychic_dark {
        background-color: $type_psychic_dark;
    }

    .psychic_light {
        background-color: $type_psychic_light;
    }

    .flying {
        background-color: $type_flying;
    }

    .flying_dark {
        background-color: $type_flying_dark;
    }

    .flying_light {
        background-color: $type_flying_light;
    }

    .steel {
        background-color: $type_steel;
    }

    .steel_dark {
        background-color: $type_steel_dark;
    }

    .steel_light {
        background-color: $type_steel_light;
    }

    .ice {
        background-color: $type_ice;
    }

    .ice_dark {
        background-color: $type_ice_dark;
    }

    .ice_light {
        background-color: $type_ice_light;
    }

    .poison {
        background-color: $type_poison;
    }

    .poison_dark {
        background-color: $type_poison_dark;
    }

    .poison_light {
        background-color: $type_poison_light;
    }

    .fire {
        background-color: $type_fire;
    }

    .fire_dark {
        background-color: $type_fire_dark;
    }

    .fire_light {
        background-color: $type_fire_light;
    }

    .dragon {
        background-color: $type_dragon;
    }

    .dragon_dark {
        background-color: $type_dragon_dark;
    }

    .dragon_light {
        background-color: $type_dragon_light;
    }

    .ground {
        background-color: $type_ground;
    }

    .ground_dark {
        background-color: $type_ground_dark;
    }

    .ground_light {
        background-color: $type_ground_light;
    }

    .water {
        background-color: $type_water;
    }

    .water_dark {
        background-color: $type_water_dark;
    }

    .water_light {
        background-color: $type_water_light;
    }

    .dark {
        background-color: $type_dark;
    }

    .dark_dark {
        background-color: $type_dark_dark;
    }

    .dark_light {
        background-color: $type_dark_light;
    }

    .rock {
        background-color: $type_rock;
    }

    .rock_dark {
        background-color: $type_rock_dark;
    }

    .rock_light {
        background-color: $type_rock_light;
    }

    .grass {
        background-color: $type_grass;
    }

    .grass_dark {
        background-color: $type_grass_dark;
    }

    .grass_light {
        background-color: $type_grass_light;
    }

    .fairy {
        background-color: $type_fairy;
    }

    .fairy_dark {
        background-color: $type_fairy_dark;
    }

    .fairy_light {
        background-color: $type_fairy_light;
    }

}
</style>