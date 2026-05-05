import { ObjectId } from 'bson'

export class SensorModel {
  _id: ObjectId
  type: string
  model: string
  unit: string

  constructor(_id: ObjectId, type: string, model: string, unit: string) {
    this._id = _id
    this.type = type
    this.model = model
    this.unit = unit
  }
}
