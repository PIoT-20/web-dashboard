<script setup lang="ts">
import { User } from '@/models/user-model'
import { ref } from 'vue'

import { createUser } from '@/utils/user-utils'
import { Point } from '@/models/point-model'

const user = ref(new User())
const imageUrl = ref<string>('')
function getUserMapData(payload: Event): void {
  const reader = new FileReader()
  const input = payload.target as HTMLInputElement
  const file = input.files?.[0]

  if (!file) return

  imageUrl.value = URL.createObjectURL(file)

  reader.onload = () => {
    const text = reader.result as string

    const doc = new DOMParser().parseFromString(text, 'image/svg+xml')
    const paths = doc.querySelectorAll('path')
    user.value.svg_map = btoa(reader.result as string)
    Array.from(paths)
      .map((p) => p.id)
      .filter(Boolean)
      .forEach((id) => {
        user.value.points.push(new Point(id, 0))
      })
    emits('imageUpload', imageUrl.value)

    emits('submited', user.value.points)
  }

  reader.readAsText(file, 'utf-8')
}
async function handleSubmit() {
  createUser(user.value).then((_) => {
    user.value = new User()
    imageUrl.value = ''
    emits('imageUpload', null)
    emits('submited', user.value.points)
  })
}
const emits = defineEmits(['imageUpload', 'submited'])
</script>

<template>
  <h1>User Form</h1>
  <form id="myForm" @submit.prevent="handleSubmit">
    <label>
      Name:
      <input type="text" name="name" v-model="user.name" required />
    </label>

    <label>
      Email:
      <input type="email" name="email" v-model="user.email" required />
    </label>

    <label>
      Upload SVG:
      <input type="file" accept="image/*" @change="(image) => getUserMapData(image)" />
    </label>

    <button type="submit">Submit</button>
  </form>
</template>
<style lang="css" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 16px;
  align-items: center;
  justify-content: center;
}
</style>
