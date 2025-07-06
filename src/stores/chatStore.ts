import { defineStore } from 'pinia'

export const useChatStore = defineStore('chatStore', {
  state: () => ({
    groupedMessages: [] as MessageGroup[],
  }),

  actions: {
    insertMessage(newMessage: Message) {
      const date = newMessage.timestamp.split('T')[0]
      const group = this.groupedMessages.find((g) => g.date === date)

      if (group) {
        group.messages.push(newMessage)
      } else {
        this.groupedMessages.push({
          date,
          messages: [newMessage],
        })
      }
    },

    loadInitialMessages(grouped: MessageGroup[]) {
      this.groupedMessages = grouped
    },
  },
})
