import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/HomeView.vue';
import DashBoard from '../views/home/components/DashBoard.vue'
import UserView from '../views/user-page/UserView.vue';
import DeviceView from '../views/device-page/DeviceView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashBoard,
        },
        {
          path: 'user',
          name: 'user',
          component: UserView,
        },
        {
          path: 'devices',
          name: 'devices',
          component: DeviceView,
        },
      ],
    },
  ],
})

export default router
