import { ObjectId } from 'bson'
import { EJSON } from 'bson'

export class ServiceModel {
  _id: ObjectId
  service_type: string
  address: string
  description: string
  last_updated: string

  constructor(_id: ObjectId = new ObjectId(), service_type: string = "", address: string = "", description: string = "", last_updated: string = "") {
    this._id = _id
    this.service_type = service_type
    this.address = address
    this.description = description
    this.last_updated = last_updated
  }

}

export function parseService(service_str: string): ServiceModel {
  const service_obj: ServiceModel = EJSON.parse(service_str)
  return Object.assign(new ServiceModel(), service_obj)
}
