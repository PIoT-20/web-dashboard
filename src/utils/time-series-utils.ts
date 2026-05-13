import { parseOneQis, type QualityIndex } from '@/models/quality-index'

import { getQisReadings } from '@/services/time-series-service'

export async function getQis(
  userId: string,
  start_time: string,
  end_time: string,
): Promise<QualityIndex | void> {
  return getQisReadings(userId, start_time, end_time).then((qis) => {
    localStorage.setItem(`qis-${userId}-${start_time}-${end_time}`, qis)
    return parseOneQis(qis)
  })

}
