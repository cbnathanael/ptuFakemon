<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import vueSelect from "vue-select";
import appRealm from '@/services/realm';
import rng from '@/rng';
import PokemonCharacterSheet from '@/components/pokemon/PokemonCharacterSheet.vue'
import PokemonCharacter from '@/interfaces/pokemon/pokemonCharacter';
const store = useStore();
const mongo = appRealm.currentUser?.mongoClient("Cluster0");

const pokemonNames = ref([]);
const selectedPokemon = reactive({
    name: 'Bulbasaur',
    level: 1,
    show: false
});
const thisMon = ref();
onBeforeMount(() => {
    const names = store.getters["pokemon/pokemonNames"];
    if (names.length == 0) {
        store.dispatch("pokemon/getPokemonNames").then(() => {
            pokemonNames.value = store.getters["pokemon/pokemonNames"];
        }).catch(err => {
            console.log(err);
        })
    }
    else {
        pokemonNames.value = names;
    }
});
async function choosePokemon() {
    let collection = mongo?.db("fakemon").collection("pokemon");
    const species = await collection?.findOne({ name: selectedPokemon.name });
    const pokemon: PokemonCharacter = {
        speciesData: Object.assign({}, species),
        name: "",
        experience: 0,
        level: selectedPokemon.level,
        stats: {
            hp: { base: species.stats.hp, mod: 0 },
            attack: { base: species.stats.attack, mod: 0 },
            defense: { base: species.stats.defense, mod: 0 },
            specialAttack: { base: species.stats.specialAttack, mod: 0 },
            specialDefense: { base: species.stats.specialDefense, mod: 0 },
            speed: { base: species.stats.speed, mod: 0 },
        },
        movement: {
            overland: { base: species.movement.overland, mod: 0 },
            sky: { base: species.movement.sky, mod: 0 },
            swim: { base: species.movement.swim, mod: 0 },
            levitate: { base: species.movement.levitate, mod: 0 },
            burrow: { base: species.movement.burrow, mod: 0 },
            hJump: { base: species.movement.hJump, mod: 0 },
            lJump: { base: species.movement.lJump, mod: 0 },
        },
        power: species.power,
        naturewalk: species.natureWalk,
        abilities: [],
        moves: [],
        capabilities: species.capabilities,
        gender: '',
        hitPoints: 0,
        nature: undefined,
        size: species.size,
        skills: species.skills
    };
    const abilityPick = rng.getD6roll(1);
    pokemon.abilities.push(species.abilities.basic[abilityPick[0] % 2 ? 0 : 1]);
    const genderPick = rng.getPercentageRoll();
    pokemon.gender = genderPick <= species.breeding.ratio.male ? 'Male' : 'Female';

    const naturePick = rng.getNumberBetween(1, 36);
    
    const nature = await store.dispatch("pokemon/lookupNaturebyId", naturePick);
    pokemon.nature = nature;
    pokemon.stats.hp.base += nature.hp;
    pokemon.stats.attack.base += nature.atk;
    pokemon.stats.defense.base += nature.def;
    pokemon.stats.specialAttack.base += nature.satk;
    pokemon.stats.specialDefense.base += nature.sdef;
    pokemon.stats.speed.base += nature.spd;

    let stats = [
        { name: "hp", value: pokemon.stats.hp.base },
        { name: "attack", value: pokemon.stats.attack.base },
        { name: "defense", value: pokemon.stats.defense.base },
        { name: "specialAttack", value: pokemon.stats.specialAttack.base },
        { name: "specialDefense", value: pokemon.stats.specialDefense.base },
        { name: "speed", value: pokemon.stats.speed.base },
    ];

    stats = stats.sort((a, b) => b.value - a.value);

    let statPoints = 10 + pokemon.level;
    let statIndex = 0;
    for (let i = 1; i <= statPoints; i++) {
        stats[statIndex].value += 1;
        statIndex = statIndex == 5 ? 0 : statIndex + 1;
    }
    stats.forEach(s => {
        switch (s.name) {
            case "hp":
                pokemon.stats.hp.mod = s.value - pokemon.stats.hp.base; //a very backward way of keeping stats organized
                break;
            case "attack":
                pokemon.stats.attack.mod = s.value - pokemon.stats.attack.base;
                break;
            case "defense":
                pokemon.stats.defense.mod = s.value - pokemon.stats.defense.base;
                break;
            case "specialAttack":
                pokemon.stats.specialAttack.mod = s.value - pokemon.stats.specialAttack.base;
                break;
            case "specialDefense":
                pokemon.stats.specialDefense.mod = s.value - pokemon.stats.specialDefense.base;
                break;
            case "speed":
                pokemon.stats.speed.mod = s.value - pokemon.stats.speed.base;
                break;
        }
    })

    const sizeMod = rng.getNumberBetween(-5,5) / 100;
    const inch = Math.round((species.size.height.inches * sizeMod) + species.size.height.inches);
    const meter = (inch * 0.0254).toFixed(2);

    const lbs = Math.round((parseFloat(species.size.weight.pounds) * sizeMod) + parseFloat(species.size.weight.pounds));
    const kilograms = (lbs * 0.45359237).toFixed(2);

    pokemon.size.height.inches = inch;
    pokemon.size.height.metric = parseFloat(meter);
    pokemon.size.weight.pounds = lbs;
    pokemon.size.weight.kilograms = parseFloat(kilograms);


    pokemon.hitPoints = pokemon.level + ((pokemon.stats.hp.base + pokemon.stats.hp.mod) * 3) + 10;
    thisMon.value = pokemon;
    selectedPokemon.show = true;
}
</script>
<template>
    <form class="generator-select">
        <label>
            Pokemon:
            <vueSelect class="pokemon-select" :options="pokemonNames" v-model="selectedPokemon.name"></vueSelect>
        </label>
        <label>
            Level:
            <input type="number" v-model="selectedPokemon.level">
        </label>
        <button type="button" @click="choosePokemon">Go!</button>
    </form>
    <PokemonCharacterSheet :pokemon="thisMon" v-if="selectedPokemon.show"></PokemonCharacterSheet>
</template>

<style lang="scss">
form.generator-select {
    background: $blue;
    border-radius: 1000px;
    display: inline-block;
    margin: 0 1rem;
    max-height: 44px;
    // padding: 0.5rem 0 0.5rem 1rem;

    label {
        padding: 0.5rem 0;
        color: white;
        font-weight: 700;
        display: inline-block;
        margin-left: 1.5rem;
        height: 44px;

        input,
        .v-select {
            display: inline-block;
            font-weight: 400;
            color: white;
            margin-left: 0.5rem;
        }

        input {
            border-bottom: 1px solid $blue_med !important;

            &:focus {
                background: rgba($blue_med, 0.3);
                color: white;
            }

            &[type=number] {
                width: 5rem;
            }
        }

        .v-select {
            width: 15rem;

            .vs__selected,
            .vs__search {
                color: white;
                border-bottom: 1px solid $blue_med !important;
                margin: 0 !important;
                padding: 0 0.25rem;
            }

            .vs__search:focus {
                background: rgba($blue_med, 0.3);
                color: white;
            }

            .vs__actions {
                display: none;
            }
        }
    }

    button {
        margin-left: 2rem;
        padding: 0.5rem 1rem 0.5rem 0.25rem;
        border-radius: 0 1000px 1000px 0;
        height: 44px;
        color: white;
        background: $blue_med;
        position: relative;
        z-index: 2;
        @include transition-fast-in;

        &::before {
            content: "";
            position: absolute;
            top: 0;
            top: 0;
            left: -12px;
            width: 1.5rem;
            height: 100%;
            background: black;
            transform: skewX(-30deg);
            transform-origin: 100%;
            background: $blue_med;
            z-index: -1;
            @include transition-fast-in;
        }

        &:hover {
            background: black;
            @include transition-fast-out;

            &::before {
                background: black;
                @include transition-fast-out;
            }
        }
    }
}
</style>