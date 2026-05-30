import { qisController } from '@/controllers/app-controller'
import { parseOneQis, type QualityIndex } from '@/models/quality-index'

import { getQisReadings } from '@/services/time-series-service'

export async function getQis(
  userId: string,
  start_time: string,
  end_time: string,
): Promise<QualityIndex | void> {
  return getQisReadings(userId, start_time, end_time).then((qis: string) => {
    localStorage.setItem(`qis-${userId}`, qis)
    return parseOneQis(qis)
  })

}
export function getCachedQis(userId: string) {
  const qis = localStorage.getItem(`qis-${userId}`)
  if (qis !== '' && qis) {
    qisController.value[userId] = parseOneQis(qis)
  }

}
