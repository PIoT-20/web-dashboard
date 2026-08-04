import { QIS_ADDRESS, qisController } from '@/controllers/app-controller'
import { parseOneQis, parseQis, type QualityIndex } from '@/models/quality-index'
import { parseService, type ServiceModel } from '@/models/service-model'

import { getQisReadings, getQisUrl } from '@/services/time-series-service'
import storageClient from '@/stores/local-storage'

export async function getQis(
  userId: string,
  start_time: string,
  end_time: string,
): Promise<QualityIndex | void> {
  return getQisReadings(userId, start_time, end_time).then((qis: string) => {
    if (qisController.value[userId] !== undefined)
      qisController.value[userId].push(parseOneQis(qis))
    else
      qisController.value[userId] = [parseOneQis(qis)]
    localStorage.setItem(`qis-${userId}`, JSON.stringify(qisController.value[userId]!))
    return parseOneQis(qis);
  })

}
export function watchQis(event: StorageEvent): void {
  if (event.key?.startsWith("qis")) {
    qisController.value[event.key] = parseQis(event.newValue!)
  }
}
export function setupQisWatcher() {
  storageClient.watch(watchQis)
}
export function getCachedQis(userId: string) {
  const qis = localStorage.getItem(`qis-${userId}`)
  if (qis !== '' && qis) {
    return qisController.value[userId] = parseQis(qis)
  }
  return qisController.value[userId] = []
}
export async function getQisAddress() {
  const service: ServiceModel = parseService(await getQisUrl())
  if (service)
    QIS_ADDRESS.value = service.address;
  else
    throw new Error('QIS URL not found');
}
