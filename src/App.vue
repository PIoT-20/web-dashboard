<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getUserList } from './utils/user-utils'
import { onMounted } from 'vue'
import { setupAppCache } from './utils/app-utils'
onMounted(async () => {
    await setupAppCache()
})
</script>

<template>
    <router-view />
</template>

<style scoped></style>
