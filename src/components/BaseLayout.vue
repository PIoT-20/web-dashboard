<script setup lang="ts"></script>

<template>
  <div id="base-layout">
    <div class="card" id="main-content">
      <slot name="main" />
    </div>
    <div class="card" id="side-content">
      <slot name="side" />
    </div>
  </div>
</template>

<style scoped>
#base-layout {
  display: flex;
  flex-direction: row;
  gap: 16px;
  height: 100vh;

  padding: 16px;
  width: 100%;

  box-sizing: border-box;
}
#side-content {
  height: 100%;
  width: 25%;
  position: relative;
}
#main-content {
  height: 100%;
  width: 75%;
  max-height: 100%;
  position: relative;
}
.card {
  position: relative;

  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100%;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
