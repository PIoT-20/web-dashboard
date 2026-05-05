<script setup lang="ts">
import { RouterLink } from 'vue-router'
const props = defineProps<{ label: string; to: string }>()
</script>

<template>
  <div class="button">
    <li>
      <RouterLink :to="props.to">{{ props.label }}</RouterLink>
    </li>
  </div>
</template>
<style lang="css" scoped>
a {
  text-decoration: none;
}

.button {
  list-style: none;
  background-color: white;
  align-items: center;
  border-radius: 5px;
  vertical-align: middle;
  font-size: 18px;
}
</style>
