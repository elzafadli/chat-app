// src/stores/roomStore.ts
import { defineStore } from 'pinia'

export const useRoomStore = defineStore('roomStore', {
  state: () => ({
    rooms: [] as ChatRoom[],
    selectedRoomId: '' as string,
    search: '' as string,
  }),

  getters: {
    selectedRoom(state) {
      return state.rooms.find((room) => room.room_id === state.selectedRoomId)
    },
    filteredRooms: (state) => {
      return (searchTerm: string) => {
        const lowerSearch = searchTerm.toLowerCase()
        return state.rooms.filter((room) => room.name.toLowerCase().includes(lowerSearch))
      }
    },
  },

  actions: {
    loadRooms(payload: ChatRoom[]) {
      this.rooms = payload.map((room: ChatRoom) => ({
        channel_id: room.channel_id,
        contact_id: room.contact_id,
        id: room.id,
        is_calling: room.is_calling,
        is_handled_by_bot: room.is_handled_by_bot,
        is_resolved: room.is_resolved,
        is_waiting: room.is_waiting,
        last_comment_sender: room.last_comment_sender,
        last_comment_sender_type: room.last_comment_sender_type,
        last_comment_text: room.last_comment_text,
        last_comment_timestamp: room.last_comment_timestamp,
        last_customer_comment_text: room.last_customer_comment_text,
        last_customer_timestamp: room.last_customer_timestamp,
        name: room.name,
        room_badge: room.room_badge,
        room_id: room.room_id,
        room_type: room.room_type,
        source: room.source,
        user_avatar_url: room.user_avatar_url,
        user_id: room.user_id,
      }))
    },
    selectRoom(roomId: string) {
      this.selectedRoomId = roomId
    },
    setSearch(search: string) {
      this.search = search
    },
    updateCurrentRoomAfterChat({
      text,
      timestamp,
      sender_type,
    }: {
      text: string
      timestamp: string
      sender_type: 'agent' | 'customer' | 'system'
    }) {
      const room = this.rooms.find((r) => r.room_id === this.selectedRoomId)
      if (!room) return

      room.last_comment_text = text
      room.last_comment_timestamp = timestamp
      room.last_comment_sender_type = sender_type
      room.last_comment_sender = '' // you can optionally pass sender_id too
      if (sender_type === 'customer') {
        room.last_customer_comment_text = text
        room.last_customer_timestamp = timestamp
      }
    },
  },
})
