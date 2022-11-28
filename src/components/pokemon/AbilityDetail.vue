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
    let top = box.top;
    let left = box.left + box.width;

    return { top: top, left: left };
})
</script>

<template>
    <aside v-if="ability != undefined" id="AbilityDetails" class="floating-tip"
        :style="{ top: position.top + 'px', left: position.left + 'px' }">
        <div class="floating-tip-content">
            <h1>{{ ability.name }}</h1>
            <p><strong>Effect</strong>: {{ ability.effect }}</p>


            <p v-if="ability.frequency != ''"><strong>Frequency:</strong>&nbsp;{{ ability.frequency }}</p>
            <p v-if="ability.target != ''"><strong>Target:</strong>&nbsp;{{ ability.target }}</p>
            <p v-if="ability.trigger != ''"><strong>Trigger:</strong>&nbsp;{{ ability.trigger }}</p>
            <p v-if="ability.keywords != ''"><strong>Keywords:</strong>&nbsp;{{ ability.keywords }}</p>

        </div>
    </aside>
</template>

<style lang="scss">
#AbilityDetails {
    position: fixed;

    @include floating-tip(300px);

}
</style>
