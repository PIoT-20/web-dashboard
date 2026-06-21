<script setup lang="ts">
import { parseUsers, User } from '@/models/user-model'
import { onMounted, ref } from 'vue'
import { userController } from '@/controllers/app-controller'

const emit = defineEmits(['userSelected'])
const userSelected = ref(new User())
const userList = ref(parseUsers(localStorage.getItem('users') || '[]'))

onMounted(() => console.log(userList.value))
</script>
<template>
    <div class="user-selector">
        <h2>User</h2>
        <select v-model="userSelected" @change="emit('userSelected', userSelected)">
            <option v-for="user in userController" :value="user">{{ user.name }}</option>
        </select>
    </div>
</template>

<style scoped>
.user-selector {
    text-align: left;
}

.user-selector h2 {
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-muted);
    margin-bottom: 12px;
}

select {
    width: 100%;
    padding: 10px 12px;
    border-radius: var(--radius-md);
    border: 1px solid var(--color-border);
    background-color: var(--color-surface);
    color: var(--color-text);
    font-family: var(--font-sans);
    font-size: 0.95rem;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2364748b' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
}

select:focus {
    outline: none;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 3px var(--color-primary-light);
}
</style>
