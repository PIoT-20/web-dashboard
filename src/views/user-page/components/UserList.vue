<script setup lang="ts">
import { parseUsers } from '@/models/user-model'
import storageClient from '@/stores/local-storage'
import UserCard from './UserCard.vue'
const users = parseUsers(storageClient.get('users') || '[]')
</script>

<template>
    <h1>User List</h1>

    <ul id="user-list">
        <UserCard v-for="user in users" :user="user" />
    </ul>
</template>
<style lang="css" scoped>
#user-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    margin: 0;
    padding: 0 16px 0 16px;
    gap: 16px;
}
</style>
