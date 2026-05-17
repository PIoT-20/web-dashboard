<script setup lang="ts">
import type { QualityIndexItem } from '@/models/quality-index-item'
import type { User } from '@/models/user-model'
import { watch } from 'vue'

const props = defineProps<{
    selected_user: User | undefined
    qis: QualityIndexItem[]
}>()

watch(
    () => props.qis,
    (newQis) => {
        renderHeat(newQis)
    },
)

function getUserMap(base64Map: string): string {
    return atob(base64Map)
}
function getColorByMeasurament(qi: number): string {
    return 'red'
}
function renderHeat(qis: QualityIndexItem[]) {
    const doc = document.getElementById('svg-map')

    if (doc) {
        doc.querySelectorAll('path')?.forEach((f) => {
            if (f.getAttribute('fill') != '#dadada') {
                f.setAttribute('fill', '#dadada')
            }
        })

        if (props.qis) {
            props.qis.forEach((qi) => {
                const color = getColorByMeasurament(qi.quality_index)
                doc.querySelector(`#${CSS.escape(qi.location)}`)?.setAttribute('fill', color)
            })
        }
    }
}


</script>

<template>
    <h1>Heat Map</h1>
    <div id="hitmap-div">
        <div v-if="props.selected_user">
            <div id="svg-map" v-html="getUserMap(props.selected_user.svg_map)"></div>
        </div>
        <div v-else>
            <p>Select User at User Selector, define a time period and filter by device type</p>
        </div>
    </div>
</template>

<style scoped>
#hitmap-div {
    /* background-color: black; */
    position: relative;
    height: 100%;
    width: 100%;
}

#svg-map {
    position: absolute;
    top: 16px;
    left: 16px;
    height: 400px;
    width: 400px;
    object-fit: fill;
}

.svg-dots {
    position: absolute;
    left: 16px;
    top: 16px;
    width: 400px;
    height: 400px;
}
</style>
