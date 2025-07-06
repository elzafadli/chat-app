// src/utils/dateFormatter.ts
import dayjs from 'dayjs'
import 'dayjs/locale/id'
import isToday from 'dayjs/plugin/isToday'
import isYesterday from 'dayjs/plugin/isYesterday'

dayjs.locale('id')
dayjs.extend(isToday)
dayjs.extend(isYesterday)

export function formatDate(dateStr: string): string {
  return dayjs(dateStr).format('DD/MM/YYYY')
}

export function formatTime(dateStr: string): string {
  return dayjs(dateStr).format('HH:mm')
}

export function formatChatDate(dateString: string): string {
  const date = dayjs(dateString)

  if (date.isToday()) return 'Today'
  if (date.isYesterday()) return 'Yesterday'
  return date.format('YYYY-MM-DD')
}
