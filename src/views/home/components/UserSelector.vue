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
        <h2>User Selector</h2>
        <select v-model="userSelected" @change="emit('userSelected', userSelected)">
            <option v-for="user in userController" :value="user">{{ user.name }}</option>
        </select>
    </div>
</template>

<style scoped>
.user-selector {
    height: 200px;
}

select {
    width: 100%;
}
</style>
