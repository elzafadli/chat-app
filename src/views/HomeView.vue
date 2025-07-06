<script setup lang="ts">
import ChatComponent from '@/components/ChatComponent.vue'
import MessageComponent from '@/components/MessageComponent.vue'
import listRooms from '@/constants/list_rooms.json' // path ke file JSON atau fetch dari API
import { useRoomStore } from '@/stores/roomStore'
import { onMounted } from 'vue'
import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const props = defineProps({
  roomId: String,
})

const roomStore = useRoomStore()

onMounted(() => {
  roomStore.loadRooms(listRooms.data.customer_rooms as ChatRoom[])

  if (props.roomId) {
    roomStore.selectRoom(props.roomId as string)
  } else {
    roomStore.selectRoom(roomStore.rooms[0].room_id)
    router.replace({ name: 'chat-room', params: { roomId: roomStore.rooms[0].room_id } })
  }
})
</script>

<template>
  <div class="flex">
    <div id="header" class="fixed w-[420px] z-10">
      <div
        class="bg-[#FFFFFF] w-full flex justify-between items-center px-3 py-2 border border-[#E4E7EC]"
      >
        <img class="rounded-full ml-1 w-10" src="https://random.imagecdn.app/100/100" alt="" />
        <div class="flex items-center justify-center">
          <DotsVerticalIcon fillColor="#515151" class="cursor-pointer" />
        </div>
      </div>

      <div id="search" class="bg-white w-full px-2 border-b shadow-sm">
        <div class="px-1 m-2 bg-[#F0F0F0] flex items-center justify-center rounded-md">
          <MagnifyIcon fillColor="#515151" :size="18" class="ml-2" />
          <input
            class="ml-5 appearance-none w-full bg-[#F0F0F0] py-1.5 px-2.5 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-sm placeholder:text-gray-500"
            type="text"
            autocomplete="off"
            placeholder="Search"
            v-model="roomStore.search"
          />
        </div>
      </div>
    </div>

    <ChatComponent class="mt-[100px]" />

    <div v-if="roomStore.selectedRoom">
      <MessageComponent />
    </div>
    <div v-else>
      <div class="ml-[420px] fixed w-[calc(100vw-420px)] h-[100vh] bg-gray-100 text-center">
        <div class="grid h-screen place-items-center">
          <div>
            <div class="text-[32px] text-gray-500 font-light mt-10">Room not found</div>
            <div class="text-[14px] text-gray-500 mt-2">
              <div>The selected chat room doesn’t exist or has been removed.</div>
              <div>Please select another room from the list.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
