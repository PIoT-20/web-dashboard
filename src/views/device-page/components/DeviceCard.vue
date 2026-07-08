<script lang="ts" setup>
import { selectedDevice } from '@/controllers/app-controller'
import type { DeviceModel } from '@/models/device-model'

const props = defineProps<{ device: DeviceModel }>()

function selectDevice() {
    selectedDevice.value = props.device
}

function isSelected(): boolean {
    return selectedDevice.value?._id.toString() === props.device._id.toString()
}
</script>
<template>
<li @click="selectDevice">
    <div id="device-card" :class="{ active: isSelected() }">
        <h4>{{ device.device_type }}</h4>
        <p>Location: {{ device.location || 'Not set' }}</p>
        <p v-if="device.description">{{ device.description }}</p>
        <p class="protocol">Protocol: {{ device.connection_info?.protocol || 'Not set' }}</p>
    </div>
</li>
</template>
<style lang="css" scoped>
li {
    list-style: none;
    width: 100%;
}

#device-card {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    text-align: left;
    cursor: pointer;
    transition: border-color 0.15s ease, background-color 0.15s ease;
}

#device-card:hover {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
}

#device-card.active {
    border-color: var(--color-primary);
    background-color: var(--color-primary-light);
}

#device-card h4 {
    margin: 0 0 2px 0;
    font-size: 0.95rem;
    color: var(--color-text);
}

#device-card p {
    margin: 0;
    font-size: 0.82rem;
    color: var(--color-text-muted);
}

#device-card .protocol {
    margin-top: 6px;
    font-weight: 500;
}
</style>
