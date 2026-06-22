<script setup lang="ts">
import { selectedDevice } from '@/controllers/app-controller'
import { ConnectionInfoModel } from '@/models/connection-info-model'
import { updateDevice } from '@/utils/device-utils'
import { ref, watch } from 'vue'

const form = ref<ConnectionInfoModel | null>(null)
const description = ref('')
const saving = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const copied = ref(false)

watch(
    selectedDevice,
    (device) => {
        errorMessage.value = ''
        successMessage.value = ''
        copied.value = false
        form.value = device ? Object.assign(new ConnectionInfoModel(), device.connection_info) : null
        description.value = device?.description ?? ''
    },
    { immediate: true },
)

async function copyDeviceId() {
    if (!selectedDevice.value) return
    try {
        await navigator.clipboard.writeText(selectedDevice.value._id.toString())
        copied.value = true
        setTimeout(() => (copied.value = false), 1500)
    } catch (err) {
        console.error('Failed to copy device ID:', err)
    }
}

async function save() {
    if (!selectedDevice.value || !form.value) return
    errorMessage.value = ''
    successMessage.value = ''

    if (!form.value.protocol) {
        errorMessage.value = 'Protocol is required.'
        return
    }

    if (form.value.protocol === 'EMULATOR') {
        if (!form.value.emulator_type) {
            errorMessage.value = 'Emulator type is required.'
            return
        }
        if (
            form.value.emulator_type === 'DUMP' &&
            (!form.value.start_time || !form.value.end_time)
        ) {
            errorMessage.value = 'Start and end time are required for DUMP mode.'
            return
        }
    } else if (form.value.protocol === 'BLE') {
        if (!form.value.uuid) {
            errorMessage.value = 'UUID is required for BLE devices.'
            return
        }
    }

    saving.value = true
    try {
        const updated = {
            ...selectedDevice.value,
            description: description.value,
            connection_info: { ...form.value },
        }
        await updateDevice(updated)
        selectedDevice.value = updated
        successMessage.value = 'Connection settings saved.'
    } catch (err) {
        console.error('Failed to update device connection info:', err)
        errorMessage.value = 'Could not save connection settings. Please try again.'
    } finally {
        saving.value = false
    }
}
</script>

<template>
<div id="device-connection-form">
    <h2>Connection Settings</h2>
    <div v-if="selectedDevice && form">
        <p class="device-name">{{ selectedDevice.device_type }} &middot; {{ selectedDevice.location }}</p>
        <div class="device-id-row">
            <span class="device-id">ID: {{ selectedDevice._id.toString() }}</span>
            <button type="button" class="copy-btn" @click="copyDeviceId">{{ copied ? 'Copied!' : 'Copy' }}</button>
        </div>
        <form @submit.prevent="save">
            <label>Description</label>
            <textarea v-model="description" rows="2"></textarea>

            <label>Protocol</label>
            <select v-model="form.protocol" required>
                <option value="EMULATOR">EMULATOR</option>
                <option value="BLE">BLE</option>
            </select>

            <template v-if="form.protocol === 'EMULATOR'">
                <label>Emulator type</label>
                <select v-model="form.emulator_type" required>
                    <option value="LIVE">LIVE</option>
                    <option value="DUMP">DUMP</option>
                </select>

                <template v-if="form.emulator_type === 'DUMP'">
                    <label>Start time</label>
                    <input type="text" v-model="form.start_time" placeholder="2026-01-02T00:00:00Z" />
                    <label>End time</label>
                    <input type="text" v-model="form.end_time" placeholder="2026-01-04T00:00:00Z" />
                </template>

                <label>Frequency (seconds)</label>
                <input type="number" min="1" v-model.number="form.frequency_seconds" />
            </template>

            <template v-else-if="form.protocol === 'BLE'">
                <label>UUID</label>
                <input type="text" v-model="form.uuid" placeholder="e.g. 4d2f1c0a-..." required />
                <label>Major</label>
                <input type="number" min="0" v-model.number="form.major" />
                <label>Minor</label>
                <input type="number" min="0" v-model.number="form.minor" />
            </template>

            <button type="submit" :disabled="saving">{{ saving ? 'Saving...' : 'Save changes' }}</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        </form>
    </div>
    <p v-else class="empty-hint">Select a device to edit its connection settings.</p>
</div>
</template>

<style scoped>
#device-connection-form {
    text-align: left;
}

#device-connection-form h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-muted);
    margin-bottom: 16px;
}

.device-name {
    margin: 0 0 12px 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--color-text);
}

.device-id-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}

.device-id {
    flex: 1;
    min-width: 0;
    font-size: 0.78rem;
    font-family: monospace;
    color: var(--color-text-muted);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

#device-connection-form .copy-btn {
    flex-shrink: 0;
    margin-top: 0;
    padding: 4px 10px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-bg);
    color: var(--color-text-muted);
    font-size: 0.75rem;
}

#device-connection-form .copy-btn:hover {
    background-color: var(--color-primary-light);
    border-color: var(--color-primary);
    color: var(--color-primary-dark);
}

#device-connection-form form {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

#device-connection-form label {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-text-muted);
    margin-top: 10px;
}

#device-connection-form input,
#device-connection-form select,
#device-connection-form textarea {
    width: 100%;
    padding: 10px 12px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 0.95rem;
    box-sizing: border-box;
    resize: vertical;
}

#device-connection-form input:focus,
#device-connection-form select:focus,
#device-connection-form textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

#device-connection-form button {
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

#device-connection-form button:hover:not(:disabled) {
    background-color: var(--color-primary-dark);
}

#device-connection-form button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

#device-connection-form .empty-hint {
    font-size: 0.85rem;
    color: var(--color-text-muted);
}

#device-connection-form .error-message {
    margin: 10px 0 0 0;
    padding: 8px 10px;
    border-radius: var(--radius-md);
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #b91c1c;
    font-size: 0.82rem;
    line-height: 1.4;
}

#device-connection-form .success-message {
    margin: 10px 0 0 0;
    padding: 8px 10px;
    border-radius: var(--radius-md);
    background-color: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #15803d;
    font-size: 0.82rem;
    line-height: 1.4;
}
</style>
