<script lang="ts" setup>
import BaseLayout from '../../components/BaseLayout.vue'
import { currentUser, selectedDevice } from '@/controllers/app-controller'
import { watch } from 'vue'
import DeviceList from './components/DeviceList.vue'
import DeviceConnectionForm from './components/DeviceConnectionForm.vue'

watch(currentUser, () => {
    selectedDevice.value = undefined
})
</script>

<template>
<BaseLayout v-if="currentUser">
    <template v-slot:main>
        <DeviceList />
    </template>
    <template v-slot:side>
        <DeviceConnectionForm />
    </template>
</BaseLayout>
<div v-else class="no-user-state">
    <p>Select a user from the account menu in the header to manage their devices.</p>
</div>
</template>

<style lang="css" scoped>
.no-user-state {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
}

.no-user-state p {
    max-width: 360px;
    color: var(--color-text-muted);
    font-size: 1rem;
    line-height: 1.5;
}
</style>
