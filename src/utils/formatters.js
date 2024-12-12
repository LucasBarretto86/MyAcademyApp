import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const formatDuration = (millisecondsDuration = 0) => {
  return dayjs.duration(millisecondsDuration, 'seconds').format('HH:mm:ss')
}
