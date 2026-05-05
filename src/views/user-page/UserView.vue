<script setup lang="ts">
import { User } from '@/models/user-model'
import BaseLayout from '../../components/BaseLayout.vue'
import { ref } from 'vue'
import { Point } from '@/models/point-model'
import UserForm from './components/UserForm.vue'
import UserImage from './components/UserImage.vue'
import UserList from './components/UserList.vue'

const points = ref<Point[]>([])
const imageUrl = ref<string>('')
</script>

<template>
  <BaseLayout>
    <template #main>
      <UserForm
        v-on:image-upload="(url) => (imageUrl = url)"
        v-on:submited="(pointList) => (points = pointList)"
      />
      <hr />
      <Suspense>
        <UserImage :imageUrl="imageUrl" :imagePoints="points" />
      </Suspense>
    </template>
    <template #side>
      <UserList />
    </template>
  </BaseLayout>
</template>
<style lang="css" scoped>
hr {
  margin: 16px;
}
</style>
