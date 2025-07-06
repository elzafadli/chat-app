<script setup lang="ts">
import defaultProfile from '@/assets/default-profile.png'
import { useRoomStore } from '@/stores/roomStore'
import { formatDate } from '@/utils/dateFormatter'
import { ref } from 'vue'
import CheckAllIcon from 'vue-material-design-icons/CheckAll.vue'
import CheckCircleIcon from 'vue-material-design-icons/CheckCircle.vue'
import PhoneIcon from 'vue-material-design-icons/Phone.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  room: ChatRoom
}>()

const imageSrc = ref(props.room.user_avatar_url || defaultProfile)

const roomStore = useRoomStore()

const handleImageError = () => {
  imageSrc.value = defaultProfile
}

const handleJoinCall = (room: ChatRoom) => {
  console.log('Join call with room:', room)
}

const openChat = () => {
  roomStore.selectRoom(props.room.room_id)
  router.push({ name: 'chat-room', params: { roomId: props.room.room_id } })
}
</script>

<template>
  <div class="flex w-full px-4 py-3 items-start cursor-pointer" @click="openChat">
    <!-- Avatar -->
    <img
      class="w-12 h-12 rounded-full mr-4 shadow-lg"
      :src="imageSrc"
      @error="handleImageError"
      :alt="props.room.name"
    />

    <!-- Chat Info -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Name and Timestamp -->
      <div class="flex justify-between items-center">
        <div class="text-[15px] text-gray-600 truncate font-medium">{{ props.room.name }}</div>
        <div class="text-[12px] text-gray-600 whitespace-nowrap">
          {{ formatDate(props.room.last_comment_timestamp) }}
        </div>
      </div>

      <!-- Message Preview -->
      <div class="flex items-center mt-1 gap-1 min-w-0">
        <!-- Calling State -->
        <template v-if="props.room.is_calling">
          <PhoneIcon :size="18" class="text-red-500 shrink-0" />
          <button
            class="text-xs text-white bg-red-500 hover:bg-red-600 px-2 py-0.5 rounded-full"
            @click="handleJoinCall(props.room)"
          >
            Calling
          </button>
        </template>

        <!-- Resolved State -->
        <template v-else-if="props.room.is_resolved">
          <CheckCircleIcon :size="18" class="text-green-500 shrink-0" />
          <span class="text-[15px] text-gray-500 italic truncate max-w-[250px]">
            This chat has been resolved.
          </span>
        </template>

        <!-- Default Message -->
        <template v-else>
          <CheckAllIcon
            v-if="props.room.last_comment_sender_type !== 'customer'"
            :size="18"
            class="shrink-0"
            :class="props.room.is_waiting ? 'text-gray-400' : 'text-blue-500'"
          />
          <span class="text-[15px] text-gray-500 truncate max-w-[250px]">
            {{ props.room.last_comment_text }}
          </span>
        </template>
      </div>

      <!-- Badges -->
      <div class="flex items-center gap-1 mt-1">
        <span
          v-if="props.room.is_handled_by_bot"
          class="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full"
        >
          Replied by Bot
        </span>
      </div>
    </div>
  </div>

  <!-- Divider -->
  <div class="border-b w-[calc(100%-80px)] ml-[64px]"></div>
</template>

<style scoped></style>
