<script setup lang="ts">
import { currentUser } from '@/controllers/app-controller'
import { createDevice } from '@/utils/device-utils'
import { reactive, ref } from 'vue'

const emit = defineEmits(['close', 'created'])

const DEVICE_TYPES = ['NVIRVentilation', 'TWANoise', 'WBGT'] as const

// Sensors are determined by device_type and aren't user-editable; the backend
// only needs them to know what readings to expect from this device type.
const DEFAULT_SENSORS: Record<string, { type: string; model: string; unit: string }[]> = {
    NVIRVentilation: [
        { type: 'temperature', model: 'TemperatureSensor ABC', unit: '°C' },
        { type: 'pressure', model: 'PressureSensor ABC', unit: 'hPa' },
        { type: 'CO2', model: 'CO2Sensor ABC', unit: 'ppm' },
    ],
    TWANoise: [{ type: 'noise', model: 'Sound Level Meter XYZ', unit: 'dB' }],
    WBGT: [
        { type: 'Natural Wet Bulb Termometer', model: 'WetBulbSensor ABC', unit: '°C' },
        { type: 'Black Globe Termometer', model: 'BlackGlobeSensor ABC', unit: '°C' },
    ],
}

const device_type = ref('')
const location = ref('')
const description = ref('')
const connection = reactive({
    protocol: 'EMULATOR',
    emulator_type: 'LIVE',
    start_time: '',
    end_time: '',
    frequency_seconds: 10,
    uuid: '',
    major: 0,
    minor: 0,
})

const saving = ref(false)
const errorMessage = ref('')

async function submit() {
    if (!currentUser.value) return
    errorMessage.value = ''

    if (!device_type.value || !location.value) {
        errorMessage.value = 'Device type and room are required.'
        return
    }
    if (!connection.protocol) {
        errorMessage.value = 'Protocol is required.'
        return
    }
    if (connection.protocol === 'EMULATOR') {
        if (!connection.emulator_type) {
            errorMessage.value = 'Emulator type is required.'
            return
        }
        if (connection.emulator_type === 'DUMP' && (!connection.start_time || !connection.end_time)) {
            errorMessage.value = 'Start and end time are required for DUMP mode.'
            return
        }
    } else if (connection.protocol === 'BLE') {
        if (!connection.uuid) {
            errorMessage.value = 'UUID is required for BLE devices.'
            return
        }
    }

    saving.value = true
    try {
        const payload = {
            device_type: device_type.value,
            location: location.value,
            description: description.value,
            user_id: currentUser.value._id.toString(),
            connection_info: { ...connection },
            sensors: DEFAULT_SENSORS[device_type.value] ?? [],
        }
        const created = await createDevice(payload as any)
        emit('created', created)
        emit('close')
    } catch (err) {
        console.error('Failed to create device:', err)
        errorMessage.value = 'Could not create device. Please try again.'
    } finally {
        saving.value = false
    }
}
</script>

<template>
    <div class="modal-backdrop" @click.self="emit('close')">
        <div class="modal-card">
            <div class="modal-header">
                <h2>New device</h2>
                <button type="button" class="close-btn" @click="emit('close')">&times;</button>
            </div>
            <form @submit.prevent="submit">
                <label>Device type</label>
                <select v-model="device_type" required>
                    <option value="" disabled>Select a device type</option>
                    <option v-for="type in DEVICE_TYPES" :key="type" :value="type">{{ type }}</option>
                </select>

                <label>Room / location</label>
                <select v-model="location" required>
                    <option value="" disabled>Select a location</option>
                    <option v-for="room in currentUser?.points" :value="room.id">{{ room.id }}</option>
                </select>

                <label>Description</label>
                <textarea v-model="description" rows="2"></textarea>

                <h3>Connection settings</h3>
                <label>Protocol</label>
                <select v-model="connection.protocol" required>
                    <option value="EMULATOR">EMULATOR</option>
                    <option value="BLE">BLE</option>
                </select>

                <template v-if="connection.protocol === 'EMULATOR'">
                    <label>Emulator type</label>
                    <select v-model="connection.emulator_type" required>
                        <option value="LIVE">LIVE</option>
                        <option value="DUMP">DUMP</option>
                    </select>

                    <template v-if="connection.emulator_type === 'DUMP'">
                        <label>Start time</label>
                        <input type="text" v-model="connection.start_time" placeholder="2026-01-02T00:00:00Z" />
                        <label>End time</label>
                        <input type="text" v-model="connection.end_time" placeholder="2026-01-04T00:00:00Z" />
                    </template>

                    <label>Frequency (seconds)</label>
                    <input type="number" min="1" v-model.number="connection.frequency_seconds" />
                </template>

                <template v-else-if="connection.protocol === 'BLE'">
                    <label>UUID</label>
                    <input type="text" v-model="connection.uuid" placeholder="e.g. 4d2f1c0a-..." required />
                    <label>Major</label>
                    <input type="number" min="0" v-model.number="connection.major" />
                    <label>Minor</label>
                    <input type="number" min="0" v-model.number="connection.minor" />
                </template>

                <button type="submit" class="submit-btn" :disabled="saving">
                    {{ saving ? 'Creating...' : 'Create device' }}
                </button>
                <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
            </form>
        </div>
    </div>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    inset: 0;
    background-color: rgba(15, 23, 42, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    padding: 24px;
}

.modal-card {
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
    background-color: var(--color-surface);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
    padding: 24px;
    text-align: left;
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.modal-header h2 {
    font-size: 1.05rem;
    color: var(--color-text);
}

.close-btn {
    border: none;
    background: none;
    font-size: 1.4rem;
    line-height: 1;
    color: var(--color-text-muted);
    cursor: pointer;
    padding: 0 4px;
}

.close-btn:hover {
    color: var(--color-text);
}

form {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

h3 {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-muted);
    margin: 18px 0 4px 0;
    padding-top: 12px;
    border-top: 1px solid var(--color-border);
}

label {
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--color-text-muted);
    margin-top: 10px;
}

input,
select,
textarea {
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

input:focus,
select:focus,
textarea:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}

.submit-btn {
    margin-top: 20px;
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

.submit-btn:hover:not(:disabled) {
    background-color: var(--color-primary-dark);
}

.submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.error-message {
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
