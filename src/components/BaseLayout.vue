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
  gap: 20px;
  height: 100%;

  padding: 24px;
  width: 100%;

  box-sizing: border-box;
}
#side-content {
  height: 100%;
  width: 30%;
  min-width: 280px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}
#main-content {
  height: 100%;
  width: 70%;
  max-height: 100%;
  position: relative;
}
.card {
  position: relative;

  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  text-align: center;
  height: 100%;
  padding: 24px;
}

@media (max-width: 900px) {
  #base-layout {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  #side-content,
  #main-content {
    width: 100%;
    height: auto;
  }
}
</style>
