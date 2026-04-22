<script setup lang="ts">
import { parseUsers, User } from '@/models/user-model'
import { ref, watch } from 'vue'

const userList: User[] = parseUsers(localStorage.getItem('users')!) || '[]'
const emit = defineEmits(['userSelected'])
const userSelected = ref<User>(new User())
</script>
<template>
  <div class="user-selector">
    <h2>User Selector</h2>
    <select v-model="userSelected" @change="emit('userSelected', userSelected)">
      <option v-for="user in userList" :value="user">{{ user.name }}</option>
    </select>
  </div>
</template>

<style scoped>
.user-selector {
  width: 100%;
  height: 200px;
}
</style>
