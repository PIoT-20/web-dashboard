import { deviceController } from '@/controllers/app-controller'
import { parseDevices, type DeviceModel } from '@/models/device-model'
import { getDevicesByUserId } from '@/services/device-service'
import storageClient from '@/stores/local-storage'

async function getDeviceListByUserId(userId: string): Promise<DeviceModel[]> {
  const cache = localStorage.getItem(`devices_${userId}`)
  if (cache) {
    return parseDevices(cache)
  }
  return getDevicesByUserId(userId).then((devices) => {
    return parseDevices(devices)
  })
}




export { getDeviceListByUserId }
