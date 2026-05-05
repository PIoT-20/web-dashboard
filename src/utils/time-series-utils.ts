import { parseOneQis, type QualityIndex } from '@/models/quality-index'

import { getQisReadings } from '@/services/time-series-service'

export async function getQis(
  userId: string,
  start_time: string,
  end_time: string,
): Promise<QualityIndex | void> {
  //   return getQisReadings(userId, start_time, end_time).then((qis) => {
  //     localStorage.setItem('qis', qis)
  //     return parseOneQis(qis)
  //   })
  return parseOneQis(`{
    "client_id": "69a088f77a6631050ca04b59",
    "start_time": "2026-06-01T00:00:00Z",
    "end_time": "2026-06-01T00:00:00Z",
    "quality_indexes": [
        {
            "device_id": "69a088f77a6631050ca04b59",
            "device_type": "TWANoise",
            "location": "Room 101",
            "quality_index": 0.4
        },
        {
            "device_id": "69a088f77a6631050ca04b59",
            "device_type": "WBGT",
            "location": "Room 101",
            "quality_index": 0.3
        },
        {
            "device_id": "69a088f77a6631050ca04b59",
            "device_type": "TWANoise",
            "location": "Room 102",
            "quality_index": 0.8
        },
        {
            "device_id": "69a088f77a6631050ca04b18",
            "device_type": "WBGT",
            "location": "Room 102",
            "quality_index": 0.7
        }
    ]
}`)
}
