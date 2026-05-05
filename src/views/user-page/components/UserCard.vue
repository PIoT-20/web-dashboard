<script lang="ts" setup>
import type { User } from '@/models/user-model'

defineProps<{
  user: User
}>()
</script>
<template>
  <li>
    <div id="user-card" class="card">
      <h3>{{ user.name }}</h3>
      <p>{{ user.email }}</p>
    </div>
  </li>
</template>
<style lang="css" scoped>
#user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: white;
}
.card {
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}
li {
  list-style: none;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: center;
  justify-items: center;
}
</style>
