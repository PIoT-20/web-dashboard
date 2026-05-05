export class QualityIndexItem {
  device_id: string
  device_type: string
  location: string
  quality_index: number

  constructor(data: any) {
    this.device_id = data.device_id
    this.device_type = data.device_type
    this.location = data.location
    this.quality_index = data.quality_index
  }
}
