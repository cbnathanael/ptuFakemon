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
    <aside v-if="ability != undefined" id="AbilityDetails" class="floating-tip" :style="{ top: position.top + 'px', left: position.left + 'px' }">
        <div class="floating-tip-content">
            <h1>{{ ability.name }}</h1>
            <dl>
                <dt>Effect</dt>
                <dd>{{ ability.effect }}</dd>
                <dt v-if="ability.frequency != ''">Frequency</dt>&nbsp;
                <dd v-if="ability.frequency != ''">{{ ability.frequency }}</dd>
                <dt v-if="ability.target != ''">Target</dt>&nbsp;
                <dd v-if="ability.target != ''">{{ ability.target }}</dd>
                <dt v-if="ability.trigger != ''">Trigger</dt>&nbsp;
                <dd v-if="ability.trigger != ''">{{ ability.trigger }}</dd>
                <dt v-if="ability.keywords != ''">Keywords</dt>&nbsp;
                <dd v-if="ability.keywords != ''">{{ ability.keywords }}</dd>

            </dl>
        </div>
    </aside>
</template>

<style lang="scss">
#AbilityDetails {
    position: fixed;
    
    @include floating-tip(32px, 300px);

    h1 {
        font-size: 0.875rem;
        font-weight: 700;
    }

    dl {

        dt,
        dd {
            display: inline-block !important;
            width: auto !important;
        }
    }

}
</style>
