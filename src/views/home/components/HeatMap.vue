<script setup lang="ts">
import { loadingHeatMap } from '@/controllers/app-controller';
import type { QualityIndexItem } from '@/models/quality-index-item'
import type { User } from '@/models/user-model'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
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
    <div v-if="props.selected_user" class="map-wrapper">
        <loading v-if="loadingHeatMap" :active="loadingHeatMap" color="#0d9488"></loading>
        <div id="svg-map" v-html="getUserMap(props.selected_user.svg_map)"></div>
    </div>
    <div v-else class="empty-state">
        <p>Select a user, define a time period and filter by device type to see the heat map.</p>
    </div>
</div>
</template>

<style scoped>
h1 {
    text-align: left;
    font-size: 1.3rem;
    margin-bottom: 16px;
}

#hitmap-div {
    position: relative;
    height: calc(100% - 1.3rem - 16px);
    width: 100%;
}

.map-wrapper {
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

.empty-state {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.empty-state p {
    max-width: 360px;
    color: var(--color-text-muted);
    font-size: 1rem;
    line-height: 1.5;
}
</style>
