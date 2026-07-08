<script async setup lang="ts">
import HomeContent from './components/HomeContent.vue'
import SideBar from './components/SideBar.vue'
import Header from '../../components/Header.vue'
</script>

<template>
  <div id="home-div">
    <Header />
    <div id="home-body">
      <div id="sidebar">
        <SideBar />
      </div>
      <HomeContent />
    </div>
  </div>
</template>

<style scoped>
#home-div {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
#home-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: row;
}
#sidebar {
  height: 100%;
  width: 220px;
  flex-shrink: 0;
  padding: 24px 0 24px 24px;
  box-sizing: border-box;
}
</style>
