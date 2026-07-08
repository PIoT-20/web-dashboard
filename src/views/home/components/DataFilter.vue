<script setup lang="ts">
import { loadingHeatMap } from '@/controllers/app-controller'
import type { User } from '@/models/user-model'
import { getDeviceListByUserId } from '@/utils/device-utils'

import { getQis } from '@/utils/time-series-utils'
import { isAxiosError } from 'axios'

import { ref, watch, type Ref } from 'vue'

const start_time = ref('')
const end_time = ref('')
const device_type = ref('')
const props = defineProps<{ user: User | undefined }>()
const deviceTypes: Ref<string[]> = ref([])
const errorMessage: Ref<string> = ref('')
const emits = defineEmits(['filter'])

async function emitData() {
    if (!props.user) return
    errorMessage.value = ''

    if (!start_time.value || !end_time.value) {
        errorMessage.value = 'Start and end time are required.'
        return
    }

    const start = new Date(start_time.value)
    const end = new Date(end_time.value)

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        errorMessage.value = 'Please provide valid start and end times.'
        return
    }

    if (start >= end) {
        errorMessage.value = 'Start time must be before end time.'
        return
    }

    loadingHeatMap.value = true
    try {
        const data = await getQis(props.user._id.toString(), start.toISOString(), end.toISOString())
        const filteredData = data?.quality_indexes.filter((qi) => qi.device_type == device_type.value) ?? []
        if (filteredData.length === 0) {
            errorMessage.value = 'No readings found for the selected period and sensor type.'
        }
        emits('filter', filteredData)
    } catch (err) {
        console.error('Failed to load quality readings:', err)
        if (isAxiosError(err) && err.response?.status === 404) {
            errorMessage.value = 'No readings found for the selected period and sensor type.'
        } else {
            errorMessage.value = 'Could not load quality readings. Please try again.'
        }
        emits('filter', [])
    } finally {
        loadingHeatMap.value = false
    }
}
function pad(n: number): string {
    return n.toString().padStart(2, '0')
}
function toDatetimeLocal(date: Date): string {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
function applyPreset(period: 'week' | 'month' | 'year') {
    const end = new Date()
    const start = new Date(end)
    if (period === 'week') start.setDate(start.getDate() - 7)
    else if (period === 'month') start.setMonth(start.getMonth() - 1)
    else start.setFullYear(start.getFullYear() - 1)

    start_time.value = toDatetimeLocal(start)
    end_time.value = toDatetimeLocal(end)
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
        <div class="preset-row">
            <button type="button" class="preset-btn" @click="applyPreset('week')">Last week</button>
            <button type="button" class="preset-btn" @click="applyPreset('month')">Last month</button>
            <button type="button" class="preset-btn" @click="applyPreset('year')">Last year</button>
        </div>
        <label>Sensor type</label>
        <select v-if="deviceTypes.length > 0" v-model="device_type" required>
            <option v-for="tp in deviceTypes" :value="tp">{{ tp }}</option>
        </select>
        <span class="empty-hint" v-else>No devices associated with this user</span>
        <button type="button" @click="emitData()">Apply filters</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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

#data-filter .preset-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
}

#data-filter .preset-btn {
    flex: 1;
    margin-top: 0;
    padding: 6px 8px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-bg);
    color: var(--color-text-muted);
    font-family: var(--font-sans);
    font-size: 0.78rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

#data-filter .preset-btn:hover {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary-dark);
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

#data-filter .error-message {
    margin: 10px 0 0 0;
    padding: 8px 10px;
    border-radius: var(--radius-md);
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #b91c1c;
    font-size: 0.82rem;
    line-height: 1.4;
}
</style>
