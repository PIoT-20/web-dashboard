import { parseDevices, type DeviceModel } from '@/models/device-model'
import { getDevicesByUserId } from '@/services/device-service'

async function getDeviceListByUserId(userId: string): Promise<DeviceModel[]> {
  return getDevicesByUserId(userId).then((devices) => {
    localStorage.setItem('devices', devices)

    return parseDevices(devices)
  })
}

export { getDeviceListByUserId }
