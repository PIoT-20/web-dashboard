<script setup lang="ts">
import { RouterView } from 'vue-router'
import { getUserList } from './utils/user-utils'
import { onBeforeMount } from 'vue'
onBeforeMount(async () => {
  await getUserList()
})
</script>

<template>
  <router-view />
</template>

<style scoped></style>
