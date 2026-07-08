import { deviceController } from '@/controllers/app-controller'
import { parseDevice, parseDevices, type DeviceModel } from '@/models/device-model'
import { createDeviceService, getDevicesByUserId, updateDeviceService, type NewDevice } from '@/services/device-service'
import { EJSON } from 'bson'
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

async function updateDevice(device: DeviceModel): Promise<void> {
  await updateDeviceService(device)

  const key = `devices_${device.user_id}`
  const devices = deviceController.value[key] ?? []
  const idx = devices.findIndex((d) => d._id.toString() === device._id.toString())
  if (idx >= 0) {
    devices[idx] = device
  } else {
    devices.push(device)
  }
  deviceController.value[key] = [...devices]
  storageClient.set(key, EJSON.stringify(devices))
}

async function createDevice(device: NewDevice): Promise<DeviceModel> {
  const created = parseDevice(await createDeviceService(device))

  const key = `devices_${created.user_id}`
  const devices = [...(deviceController.value[key] ?? []), created]
  deviceController.value[key] = devices
  storageClient.set(key, EJSON.stringify(devices))

  return created
}

export { getDeviceListByUserId, updateDevice, createDevice }
