import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useRoomStore } from '@/stores/roomStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/chat/:roomId',
      name: 'chat-room',
      component: HomeView,
      props: true,
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'home') {
    const roomStore = useRoomStore()

    // Ensure rooms are already loaded
    if (roomStore.rooms.length > 0) {
      const firstRoomId = roomStore.rooms[0].room_id
      next({ name: 'chat-room', params: { roomId: firstRoomId } })
    } else {
      // Optional: wait or allow loading to complete in HomeView
      next()
    }
  } else {
    next()
  }
})

export default router
