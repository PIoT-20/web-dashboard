<script lang="ts" setup>
import BaseLayout from '../../../components/BaseLayout.vue'
import HeatMap from '../components/HeatMap.vue'
import DataFilter from './DataFilter.vue'

import QisList from './QisList.vue'
import { currentUser, selectedQis } from '@/controllers/app-controller'
</script>
<template>
<BaseLayout v-if="currentUser">
    <template v-slot:main>
        <Suspense>
            <HeatMap :selected_user="currentUser" :qis="selectedQis" />
            <template #fallback> Loading... </template>
        </Suspense>

    </template>
    <template v-slot:side>
        <DataFilter :user="currentUser" v-on:filter="(newQis) => (selectedQis = newQis)" />
        <QisList :user="currentUser" />
    </template>
</BaseLayout>
<div v-else class="no-user-state">
    <p>Select a user from the account menu in the header to view their dashboard.</p>
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
