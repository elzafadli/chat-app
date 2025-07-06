<script setup lang="ts">
import DotsVerticalIcon from 'vue-material-design-icons/DotsVertical.vue'
import EmoticonExcitedOutlineIcon from 'vue-material-design-icons/EmoticonExcitedOutline.vue'
import PaperclipIcon from 'vue-material-design-icons/Paperclip.vue'
import SendIcon from 'vue-material-design-icons/Send.vue'
import CheckAllIcon from 'vue-material-design-icons/CheckAll.vue'
import defaultProfile from '@/assets/default-profile.png'

import listChats from '@/constants/list_chats.json' // path ke file JSON atau fetch dari API
import { useChatStore } from '@/stores/chatStore'
import { onMounted, ref, watch } from 'vue'
import { formatChatDate, formatTime } from '@/utils/dateFormatter'
import { useRoomStore } from '@/stores/roomStore'

const chatStore = useChatStore()
const roomStore = useRoomStore()

onMounted(() => {
  chatStore.loadInitialMessages(listChats.data as [])
})

const message = ref('')

const fallbackAvatar = defaultProfile
const imageSrc = ref(roomStore.selectedRoom?.user_avatar_url || fallbackAvatar)

const sendMessage = () => {
  chatStore.insertMessage({
    id: crypto.randomUUID(), // unique ID based on timestamp
    room_id: roomStore.selectedRoom?.room_id || '', // current room (replace with dynamic if needed)
    sender_id: 'agent@example.com',
    sender_type: 'agent',
    sender_name: 'Agent A',
    text: message.value,
    timestamp: new Date().toISOString(),
    is_read: false,
  })

  roomStore.updateCurrentRoomAfterChat({
    text: message.value,
    timestamp: new Date().toISOString(),
    sender_type: 'agent',
  })

  message.value = ''
}

watch(
  () => roomStore.selectedRoom,
  (newRoom) => {
    imageSrc.value = newRoom?.user_avatar_url || fallbackAvatar
  },
  { immediate: true },
)

const handleImageError = () => {
  imageSrc.value = fallbackAvatar
}

watch(
  () => chatStore.groupedMessages,
  (newChats) => {
    if (newChats.length) {
      setTimeout(() => {
        const el = document.getElementById('message-section')
        if (el) el.scrollTop = el.scrollHeight
      }, 50)
    }
  },
  { deep: true },
)
</script>

<template>
  <div class="ml-[420px] w-full">
    <div class="w-full">
      <!-- <div id="bg"></div> -->
      <div class="border-l border-green-500 w-full">
        <div
          class="bg-[#FFFFFF] fixed z-10 min-w-[calc(100vw-420px)] flex justify-between items-center px-2 py-2 border border-[#E4E7EC]"
        >
          <div class="flex items-center">
            <img
              class="rounded-full ml-1 w-10"
              :src="imageSrc"
              @error="handleImageError"
              alt="User avatar"
            />
            <div class="text-gray-900 ml-2 font-semibold">{{ roomStore.selectedRoom?.name }}</div>
            <div class="flex items-center justify-center"></div>
          </div>
          <DotsVerticalIcon fillColor="#515151" />
        </div>
      </div>

      <div
        id="message-section"
        class="pt-20 pb-9 z-[1] h-[calc(100vh-65px)] w-[calc(100vw-420px)] overflow-auto fixed touch-auto chat-background"
      >
        <div class="px-20 text-sm">
          <div v-for="group in chatStore.groupedMessages" :key="group.date">
            <!-- Optional: show date -->
            <div class="flex justify-center my-4">
              <div class="bg-gray-100 px-4 py-1 rounded-md shadow-sm text-xs text-gray-500">
                {{ formatChatDate(group.date) }}
              </div>
            </div>

            <!-- Loop messages in the group -->
            <div v-for="chat in group.messages" :key="chat.id">
              <!-- Chat dari customer/system -->
              <div
                v-if="chat.sender_type === 'customer' || chat.sender_type === 'system'"
                class="flex w-[calc(100%-50px)]"
              >
                <div class="inline-block bg-white p-2 rounded-md my-1">
                  <!-- ✅ Optional image rendering -->
                  <img
                    v-if="chat.image_url"
                    :src="chat.image_url"
                    alt="Chat image"
                    class="mt-2 mb-2 rounded-md w-full max-h-48 object-cover"
                  />
                  {{ chat.text }}
                  <div class="text-[11px] text-gray-400 text-right mt-1">
                    {{ formatTime(chat.timestamp) }}
                  </div>
                </div>
              </div>

              <!-- Chat dari agent -->
              <div v-else class="flex justify-end w-[calc(100%-50px)]">
                <div class="inline-block bg-green-200 p-2 rounded-md my-1">
                  <div class="flex items-end justify-between gap-2">
                    <span>{{ chat.text }}</span>
                    <CheckAllIcon
                      v-if="chat.sender_type === 'agent'"
                      :size="16"
                      class="shrink-0"
                      :class="chat.is_read ? 'text-blue-500' : 'text-gray-400'"
                    />
                  </div>
                  <div class="text-[11px] text-gray-400 text-right mt-1">
                    {{ formatTime(chat.timestamp) }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="w-[calc(100vw-420px)] p-2.5 z-10 bg-[#FFFFFF] border-t border-[#E4E7EC] fixed bottom-0"
      >
        <div class="flex items-center justify-center">
          <EmoticonExcitedOutlineIcon :size="27" fillColor="#515151" class="mx-1.5" />
          <PaperclipIcon :size="27" fillColor="#515151" class="mx-1.5" />

          <input
            v-model="message"
            class="mr-1 shadow appearance-none rounded-md w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            autocomplete="off"
            placeholder="Message"
            @keydown.enter="sendMessage"
          />

          <button
            :disabled="!message.trim()"
            type="submit"
            @click="sendMessage"
            class="ml-3 p-2 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <SendIcon fillColor="#515151" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-background {
  background: linear-gradient(180deg, #f9fafb 39%, #ebeaff 100%);
}
</style>
