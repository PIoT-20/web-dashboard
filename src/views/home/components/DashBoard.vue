<script lang="ts" setup>
import BaseLayout from '../../../components/BaseLayout.vue'
import HeatMap from '../components/HeatMap.vue'
import DataFilter from './DataFilter.vue'

import QisList from './QisList.vue'
import { currentUser, selectedQis } from '@/controllers/app-controller'
</script>
<template>
<BaseLayout>
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
</template>
<style lang="css" scoped></style>
