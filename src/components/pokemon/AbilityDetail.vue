<script setup lang="ts">
import PokemonAbility from "@/interfaces/pokemon/PokemonAbility";
import { computed } from "vue";
import { useStore } from "vuex";
interface Props {
    abilityName: string;
    target: any;
}
const store = useStore();
// eslint-disable-next-line no-undef, @typescript-eslint/no-unused-vars
const props = defineProps<Props>();
const ability = computed(() => {
    if (props.abilityName != '') {
        let ability = store.getters['pokemon/ability'](props.abilityName)
        if (ability) {
            return ability;
        }
        else {
            return store.dispatch("pokemon/lookupAbility", props.abilityName);
        }
    } else {
        return undefined
    }
});
const position = computed(() => {
    const box = props.target.getBoundingClientRect();
    // const body = document.body;
    // const docEl = document.documentElement;

    // const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    // const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    
    // const clientTop = docEl.clientTop || body.clientTop || 0;
    // const clientLeft = docEl.clientLeft || body.clientLeft || 0;
    // console.log(box.top + "/" + scrollTop + "/" + clientTop);
    let top = box.top; //? (box.top + scrollTop - clientTop) : 0;
    let left = box.left + box.width;// ? (box.left + box.width + scrollLeft - clientLeft) : 0;

    return { top: top, left: left };
})
</script>

<template>
    <aside v-if="ability != undefined" id="AbilityDetails" :style="{top: position.top+'px', left: position.left+'px'}">
        <h1>{{ ability.name }}</h1>
        <dl>
            <dt>Effect</dt>
            <dd>{{ ability.effect }}</dd>
            <dt v-if="ability.frequency != ''">Frequency</dt>
            <dd v-if="ability.frequency != ''">{{ ability.frequency }}</dd>
            <dt v-if="ability.target != ''">Target</dt>
            <dd v-if="ability.target != ''">{{ ability.target }}</dd>
            <dt v-if="ability.trigger != ''">Trigger</dt>
            <dd v-if="ability.trigger != ''">{{ ability.trigger }}</dd>
            <dt v-if="ability.keywords != ''">Keywords</dt>
            <dd v-if="ability.keywords != ''">{{ ability.keywords }}</dd>

        </dl>
    </aside>
</template>

<style lang="scss">
#AbilityDetails {
    position: fixed;
    background: #ccc;
    font-size: 12px;
    padding: 8px;
    width: 200px;
    h1 {
        font-size: 14px;
        line-height: 1.6;
        margin: 0;
    }
    dl {
        dt, dd {
            display: inline-block !important;
            width: auto !important;
        }
    }

}
</style>
