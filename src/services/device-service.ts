import httpClient from '@/api/http-client'
import type { DeviceModel } from '@/models/device-model'
import { EJSON } from 'bson'


const catalogAddress = import.meta.env.VITE_CATALOG_URL

export type NewDevice = Omit<DeviceModel, '_id'>

async function getDevicesByUserId(userId: string): Promise<string> {

  return httpClient
    .get(`${catalogAddress}/device/?client_id=${userId}`)
    .then((res) => {
      return EJSON.stringify(res.data)
    })
    .catch((err) => {
      throw 'could not fetch Devices for user ' + err
    })
}

async function updateDeviceService(device: DeviceModel): Promise<void> {
  await httpClient.put(`${catalogAddress}/device`, EJSON.stringify(device))
}

async function createDeviceService(device: NewDevice): Promise<string> {
  return httpClient
    .post(`${catalogAddress}/device`, EJSON.stringify(device))
    .then((res) => EJSON.stringify(res.data))
}

export { getDevicesByUserId, updateDeviceService, createDeviceService }
