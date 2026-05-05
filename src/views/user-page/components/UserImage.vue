<script lang="ts" setup>
import type { Point } from '@/models/point-model'

const props = defineProps<{
  imageUrl: string | null
  imagePoints: Point[]
}>()
</script>
<template>
  <div id="image-data">
    <div v-if="imageUrl != null && imageUrl != ''" id="image-div">
      <h3>Uploaded SVG:</h3>
      <img :src="imageUrl" alt="Uploaded SVG" style="max-width: 400px; height: auto" />
    </div>
    <div v-if="imageUrl != null && imageUrl != ''" id="point-list">
      <h3>Scanned points ({{ imagePoints.length }})</h3>
      <ul>
        <li v-for="(point, idx) in imagePoints" :key="point.id">
          [{{ idx + 1 }}] ID: {{ point.id }}
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="css" scoped>
#image-data {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  height: 60vh;
  /* background-color: black; */
  position: relative;
}
#point-list {
  /* background-color: wheat; */
  width: 50%;
  display: flex;
  flex-direction: column;

  height: 100%;

  overflow: hidden;
}
#point-list ul {
  flex: 1;
  overflow-y: auto;
}

ul {
  list-style: none;
}
li {
  gap: 2rem;
  text-align: center;
}
#image-div {
  width: 50%;
}
</style>
