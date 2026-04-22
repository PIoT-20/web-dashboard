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
  height: 100%;
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
}
#side-content {
  /*background-color: blue;*/
  height: 100%;
  width: 25%;
  /* margin-right: 16px; */
}
#main-content {
  /*background-color: black;*/
  height: 100%;
  width: 75%;
  /* margin-left: 16px; */
}
.card {
  background-color: blue;

  background-color: white;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 100%;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.2);
}
</style>
