<script lang="ts" setup>
import BaseLayout from '../../../components/BaseLayout.vue'
import HeatMap from '../components/HeatMap.vue'
import UserSelector from '../components/UserSelector.vue'
import { ref, type Ref } from 'vue'
import { User } from '@/models/user-model'
import DataFilter from './DataFilter.vue'

import { QualityIndexItem } from '@/models/quality-index-item'
import QisList from './QisList.vue'
const user: Ref<User | undefined> = ref(undefined)
const qis: Ref<QualityIndexItem[]> = ref([])
</script>
<template>
<BaseLayout>
    <template v-slot:main>
        <Suspense>
            <HeatMap :selected_user="user" :qis="qis" />
            <template #fallback> Loading... </template>
        </Suspense>

    </template>
    <template v-slot:side>
        <UserSelector v-on:user-selected="(u) => (user = u)" />
        <DataFilter :user="user" v-on:filter="(newQis) => (qis = newQis)" />
        <QisList />
    </template>
</BaseLayout>
</template>
<style lang="css" scoped></style>
