interface ChatRoom {
  channel_id: number
  contact_id: number
  id: number
  is_calling: boolean
  is_handled_by_bot: boolean
  is_resolved: boolean
  is_waiting: boolean
  last_comment_sender: string
  last_comment_sender_type: string
  last_comment_text: string | null
  last_comment_timestamp: string
  last_customer_comment_text: string | null
  last_customer_timestamp: string
  name: string
  room_badge: string | null
  room_id: string
  room_type: string
  source: string
  user_avatar_url: string
  user_id: string
}
