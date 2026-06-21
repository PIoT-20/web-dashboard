<script setup lang="ts">
import { RouterLink } from 'vue-router'
const props = defineProps<{ label: string; to: string }>()
</script>

<template>
  <li class="button">
    <RouterLink :to="props.to">{{ props.label }}</RouterLink>
  </li>
</template>
<style lang="css" scoped>
.button {
  list-style: none;
}

a {
  display: block;
  padding: 10px 12px;
  border-radius: var(--radius-md);
  color: var(--color-text-muted);
  font-size: 0.95rem;
  font-weight: 500;
  text-align: left;
  text-decoration: none;
  transition: background-color 0.15s ease, color 0.15s ease;
}

a:hover {
  background-color: var(--color-primary-light);
  color: var(--color-primary-dark);
}

a.router-link-exact-active {
  background-color: var(--color-primary);
  color: #ffffff;
}
</style>
