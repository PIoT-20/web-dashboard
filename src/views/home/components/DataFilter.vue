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
    <h2>Data Filter</h2>
    <form>
        <label>Start time</label>
        <input type="datetime-local" v-model="start_time" required />
        <label>End time</label>
        <input type="datetime-local" v-model="end_time" required />
        <label>Select Sensor Type</label>
        <select v-if="deviceTypes.length > 0" v-model="device_type" required>
            <option v-for="tp in deviceTypes" :value="tp">{{ tp }}</option>
        </select>
        <span v-else>No devices associated with this user</span>
        <button @click="emitData()">Filter</button>
    </form>
</div>
</template>

<style scoped>
#data-filter form {
    display: flex;
    flex-direction: column;
}
</style>
