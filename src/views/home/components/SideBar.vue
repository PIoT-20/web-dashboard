<script setup lang="ts">

import SideBarButton from './SideBarButton.vue'
</script>

<template>
    <div id="side-bar">
        <h2 class="brand">Quality Monitor</h2>
        <ul>
            <SideBarButton label="Dashboard" to="/" />
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

.brand {
    text-align: left;
    font-size: 1.05rem;
    color: var(--color-primary-dark);
    padding: 0 8px 20px 8px;
    border-bottom: 1px solid var(--color-border);
    margin-bottom: 12px;
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
