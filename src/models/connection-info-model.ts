export class ConnectionInfoModel {
  protocol: string
  emulator_type: string
  start_time: string
  end_time: string
  frequency_seconds: number
  uuid: string
  major: number
  minor: number

  constructor(
    protocol: string = '',
    emulator_type: string = '',
    start_time: string = '',
    end_time: string = '',
    frequency_seconds: number = 0,
    uuid: string = '',
    major: number = 0,
    minor: number = 0,
  ) {
    this.protocol = protocol
    this.emulator_type = emulator_type
    this.start_time = start_time
    this.end_time = end_time
    this.frequency_seconds = frequency_seconds
    this.uuid = uuid
    this.major = major
    this.minor = minor
  }
}
