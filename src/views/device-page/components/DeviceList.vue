<script setup lang="ts">
import { currentUser, deviceController, selectedDevice } from '@/controllers/app-controller'
import type { DeviceModel } from '@/models/device-model'
import { computed, ref } from 'vue'
import DeviceCard from './DeviceCard.vue'
import CreateDeviceModal from './CreateDeviceModal.vue'

const showCreateModal = ref(false)

const devices = computed(() => {
    if (!currentUser.value) return []
    return deviceController.value[`devices_${currentUser.value._id.toString()}`] ?? []
})

const roomGroups = computed(() => {
    const groups: Record<string, DeviceModel[]> = {}
    for (const device of devices.value) {
        const room = device.location || 'Unassigned room'
        if (!groups[room]) groups[room] = []
        groups[room].push(device)
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
})

function onDeviceCreated(device: DeviceModel) {
    selectedDevice.value = device
}
</script>

<template>
    <div id="device-list">
        <div class="list-header">
            <h1>Devices</h1>
            <button type="button" class="new-device-btn" @click="showCreateModal = true">+ New device</button>
        </div>
        <div v-if="devices.length > 0" class="room-groups">
            <section v-for="[room, roomDevices] in roomGroups" :key="room" class="room-group">
                <h2>{{ room }}</h2>
                <ul>
                    <DeviceCard v-for="device in roomDevices" :key="device._id.toString()" :device="device" />
                </ul>
            </section>
        </div>
        <p v-else class="empty-hint">No devices associated with this user.</p>

        <CreateDeviceModal v-if="showCreateModal" @close="showCreateModal = false" @created="onDeviceCreated" />
    </div>
</template>

<style scoped>
#device-list {
    height: 100%;
    width: 100%;
    text-align: left;
    overflow-y: auto;
}

.list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

h1 {
    text-align: left;
    font-size: 1.3rem;
}

.new-device-btn {
    padding: 8px 14px;
    border-radius: var(--radius-md);
    border: none;
    background-color: var(--color-primary);
    color: #ffffff;
    font-family: var(--font-sans);
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.15s ease;
}

.new-device-btn:hover {
    background-color: var(--color-primary-dark);
}

.room-groups {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.room-group h2 {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-muted);
    margin: 0 0 10px 0;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-border);
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
}

.empty-hint {
    color: var(--color-text-muted);
    font-size: 0.95rem;
}
</style>
