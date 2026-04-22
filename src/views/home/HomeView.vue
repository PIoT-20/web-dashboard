<script async setup lang="ts">
import { ref, type Ref } from 'vue'
import BaseLayout from '../../components/BaseLayout.vue'
import HitMap from './components/HitMap.vue'
import { User } from '@/models/user-model'
import UserSelector from './components/UserSelector.vue'

const user = ref<User>()
</script>

<template>
  <div id="home-div">
    <BaseLayout>
      <template v-slot:main>
        <!-- <label>main</label> -->
        <Suspense>
          <HitMap :selected_user="user" />
          <template #fallback> Loading... </template>
        </Suspense>
      </template>
      <template v-slot:side>
        <UserSelector
          :user="user"
          v-on:user-selected="
            (userSelected) => {
              user = userSelected
              console.log('User selected:', userSelected)
            }
          "
        />
      </template>
    </BaseLayout>
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
  flex-direction: column;
}
</style>
