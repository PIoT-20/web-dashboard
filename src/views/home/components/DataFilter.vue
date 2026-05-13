<script setup lang="ts">
import type { User } from '@/models/user-model'
import { getDeviceListByUserId } from '@/utils/device-utils'

import { getQis } from '@/utils/time-series-utils'

import { onMounted, ref, watch, type Ref } from 'vue'

const start_time = ref('')
const end_time = ref('')
const device_type = ref('')
const props = defineProps<{ user: User }>()
const deviceTypes: Ref<string[]> = ref([])
const emits = defineEmits(['filter'])

async function emitData() {
    const data = await getQis(props.user._id.toString(), start_time.value, end_time.value)
    const filteredData = data!.quality_indexes.filter((qi) => qi.device_type == device_type.value)
    emits('filter', filteredData)
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
        deviceTypes.value = await getDeviceTypes(nUser._id.toString())
        console.log(deviceTypes.value)
    },
    { immediate: true },
)
</script>

<template>
    <div id="data-filter">
        <h2>Data Filter</h2>
        <form @submit.prevent="emitData()">
            <label>Start time</label>
            <input type="datetime-local" v-model="start_time" required />
            <label>End time</label>
            <input type="datetime-local" v-model="end_time" required />
            <label>Select Sensor Type</label>
            <select v-model="device_type" required>
                <option v-for="tp in deviceTypes" :value="tp">{{ tp }}</option>
            </select>
            <input type="submit" />
        </form>
    </div>
</template>

<style scoped>
#data-filter form {
    display: flex;
    flex-direction: column;
}
</style>
