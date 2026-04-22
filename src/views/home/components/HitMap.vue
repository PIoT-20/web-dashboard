<script setup lang="ts">
import type { User } from '@/models/user-model'

const props = defineProps<{
  selected_user: User | undefined
}>()
function getUserMap(base64Map: string): string {
  return atob(base64Map)
}
</script>

<template>
  <H1>Hit Map</H1>
  <div id="hitmap-div">
    <div v-if="props.selected_user">
      <div id="svg-map" v-html="getUserMap(props.selected_user.svg_map)"></div>
      <svg class="svg-dots">
        <circle
          v-for="point in props.selected_user.points"
          :cx="point.x * (400 / 143)"
          :cy="point.y * (400 / 150)"
          r="2"
        />
      </svg>
    </div>
    <div v-else>
      <p>No user selected</p>
    </div>
  </div>
</template>

<style scoped>
#hitmap-div {
  /* background-color: black; */
  position: relative;
  height: 100%;
  width: 100%;
}
#svg-map {
  position: absolute;
  top: 16px;
  left: 16px;
  height: 400px;
  width: 400px;
  object-fit: fill;
}
.svg-dots {
  position: absolute;
  left: 16px;
  top: 16px;
  width: 400px;
  height: 400px;
}

.svg-dots circle {
  fill: red;
  stroke: black;
  stroke-width: 2;
}
</style>
