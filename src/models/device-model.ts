import { ObjectId, EJSON } from 'bson'
import { SensorModel } from './sensor-model.ts'
import { ConnectionInfoModel } from './connection-info-model.ts'
import { deviceController } from '@/controllers/app-controller.ts'

export class DeviceModel {
  _id: ObjectId
  device_type: string
  connection_info: ConnectionInfoModel
  location: string
  description: string
  sensors: SensorModel[]
  user_id: string

  constructor(
    _id: ObjectId = new ObjectId(),
    device_type: string = '',
    location: string = '',
    connection_info: ConnectionInfoModel = new ConnectionInfoModel(),
    description: string = '',
    sensors: SensorModel[] = [],
    user_id: string = '',
  ) {
    this._id = _id
    this.device_type = device_type
    this.connection_info = connection_info
    this.location = location
    this.description = description
    this.sensors = sensors
    this.user_id = user_id
  }
}
export function parseDevices(device_str: string): DeviceModel[] {
  const user_obj: DeviceModel[] = EJSON.parse(device_str)
  return user_obj.map((device: DeviceModel) => Object.assign(new DeviceModel(), device))
}
export function parseDevice(device_str: string): DeviceModel {
  const device_obj: DeviceModel = EJSON.parse(device_str)
  return Object.assign(new DeviceModel(), device_obj)
}
