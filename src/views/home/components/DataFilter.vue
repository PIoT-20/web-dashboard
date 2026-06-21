<script setup lang="ts">
import { loadingHeatMap } from '@/controllers/app-controller'
import type { User } from '@/models/user-model'
import { getDeviceListByUserId } from '@/utils/device-utils'

import { getQis } from '@/utils/time-series-utils'

import { ref, watch, type Ref } from 'vue'

const start_time = ref('')
const end_time = ref('')
const device_type = ref('')
const props = defineProps<{ user: User | undefined }>()
const deviceTypes: Ref<string[]> = ref([])
const emits = defineEmits(['filter'])

async function emitData() {
    loadingHeatMap.value = true
    if (!props.user) return
    start_time.value = new Date(start_time.value).toISOString()
    end_time.value = new Date(end_time.value).toISOString()
    const data = await getQis(props.user._id.toString(), start_time.value, end_time.value)
    const filteredData = data!.quality_indexes.filter((qi) => qi.device_type == device_type.value)
    emits('filter', filteredData)
    loadingHeatMap.value = false
}
async function getDeviceTypes(userID: string): Promise<string[]> {
    const unique_types: Set<string> = new Set()
    const devices = await getDeviceListByUserId(userID)
    devices.forEach((d) => unique_types.add(d.device_type))
    return [...unique_types]
}

watch(
    () => props.user,
    async (nUser) => {
        if (!nUser) return
        deviceTypes.value = await getDeviceTypes(nUser._id.toString())
    },
    { immediate: true },
)
</script>

<template>
<div id="data-filter">
    <h2>Filters</h2>
    <form>
        <label>Start time</label>
        <input type="datetime-local" v-model="start_time" required />
        <label>End time</label>
        <input type="datetime-local" v-model="end_time" required />
        <label>Sensor type</label>
        <select v-if="deviceTypes.length > 0" v-model="device_type" required>
            <option v-for="tp in deviceTypes" :value="tp">{{ tp }}</option>
        </select>
        <span class="empty-hint" v-else>No devices associated with this user</span>
        <button type="button" @click="emitData()">Apply filters</button>
    </form>
</div>
</template>

<style scoped>
#data-filter {
    text-align: left;
}

#data-filter h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-muted);
    margin-bottom: 16px;
}

#data-filter form {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

#data-filter label {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-text-muted);
    margin-top: 10px;
}

#data-filter input,
#data-filter select {
    width: 100%;
    padding: 10px 12px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 0.95rem;
}

#data-filter input:focus,
#data-filter select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

#data-filter .empty-hint {
    font-size: 0.85rem;
    color: var(--color-text-muted);
}

#data-filter button {
    margin-top: 18px;
    padding: 10px 12px;
    border-radius: var(--radius-md);
    background-color: var(--color-primary);
    color: #ffffff;
    border: none;
    font-family: var(--font-sans);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

#data-filter button:hover {
    background-color: var(--color-primary-dark);
}
</style>
