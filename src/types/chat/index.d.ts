interface Message {
  id: string
  room_id: string
  sender_id: string
  sender_type: string
  sender_name: string
  text: string
  timestamp: string
  is_read: boolean
  image_url?: string
}

interface MessageGroup {
  date: string
  messages: Message[]
}
