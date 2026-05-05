<script async setup lang="ts">
import HomeContent from './components/HomeContent.vue'
import SideBar from './components/SideBar.vue'
</script>

<template>
  <div id="home-div">
    <div id="sidebar">
      <SideBar />
    </div>
    <HomeContent />
  </div>
</template>

<style scoped>
#home-div {
  height: 100vh;
  width: 100vw;
  /*background-color: red;*/
  overflow: hidden;
  justify-content: center;
  align-items: center;
  justify-items: center;
  align-items: center;
  display: flex;
  flex-direction: row;
}
#sidebar {
  height: 100%;
  width: 10%;
  margin: 16px;
}
</style>
