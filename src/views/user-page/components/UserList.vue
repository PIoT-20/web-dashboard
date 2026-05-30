<script setup lang="ts">
import UserCard from './UserCard.vue'
import { userController } from '@/controllers/app-controller';

</script>

<template>
    <h1>User List</h1>

    <ul id="user-list">
        <UserCard v-for="user in userController" :user="user" />
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
