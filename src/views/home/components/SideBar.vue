<script setup lang="ts">

import SideBarButton from './SideBarButton.vue'
</script>

<template>
    <div id="side-bar">
        <ul>
            <SideBarButton label="Dashboard" to="/" />
            <SideBarButton label="Devices" to="/devices" />
            <SideBarButton label="User Profile" to="/user" />
        </ul>
    </div>
</template>
<style lang="css" scoped>
#side-bar {
    position: relative;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-card);
}

ul {
    width: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
}
</style>
