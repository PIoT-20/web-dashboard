<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SideBarButton from './SideBarButton.vue'
</script>

<template>
  <div id="side-bar" class="card">
    <ul>
      <SideBarButton label="Dashboard" to="/" />
      <SideBarButton label="User Profile" to="/user" />
    </ul>
  </div>
</template>
<style lang="css" scoped>
#side-bar {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}
ul {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;

  align-items: center;
  justify-content: center;
  align-content: center;
}
.card {
  position: relative;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100%;
}
</style>
