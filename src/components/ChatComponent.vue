<script setup lang="ts">
import MessageRowComponent from '@/components/MessageRowComponent.vue'
import { useRoomStore } from '@/stores/roomStore'
const roomStore = useRoomStore()
</script>

<template>
  <div
    id="messages"
    class="pt-1 z-0 overflow-auto fixed h-[calc(100vh-100px)] w-[420px] border border-[#E4E7EC]"
  >
    <MessageRowComponent
      v-for="room in roomStore.filteredRooms(roomStore.search)"
      :key="room.id"
      :room="room"
    />
  </div>
</template>
