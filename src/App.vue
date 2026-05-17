<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { setupApp } from './utils/app-utils'
onMounted(async () => {
    await setupApp()
})
</script>

<template>
    <router-view />
</template>

<style scoped></style>
