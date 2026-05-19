import type { QualityIndexItem } from './quality-index-item'

export class QualityIndex {
  client_id: string
  start_time: string
  end_time: string
  quality_indexes: QualityIndexItem[]

  constructor(
    client_id: string = '',
    start_time: string = '',
    end_time: string = '',
    quality_indexes = [],
  ) {
    this.client_id = client_id
    this.start_time = start_time
    this.end_time = end_time
    this.quality_indexes = quality_indexes
  }
}
export function parseQis(qis_obj: object[]): QualityIndex[] {

  return qis_obj.map((qis) => Object.assign(new QualityIndex(), qis))
}
export function parseOneQis(qis_obj: object): QualityIndex {

  return Object.assign(new QualityIndex(), qis_obj)
}
