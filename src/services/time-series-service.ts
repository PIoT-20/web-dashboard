import httpClient from '@/api/http-client'
import { QIS_ADDRESS } from '@/controllers/app-controller'


const catalogAddress = import.meta.env.VITE_CATALOG_URL

export async function getQisReadings(
  client_id: string,
  start_time: string,
  end_time: string,
): Promise<string> {

  return httpClient
    .get(`${QIS_ADDRESS.value}/?user_id=${client_id}\&start_time=${start_time}\&end_time=${end_time}`)
    .then((res) => {
      return JSON.stringify(res.data)
    })
}

export async function getQisUrl(): Promise<string> {
  return httpClient.get(`${catalogAddress}/service/?service_type=QIS`)
    .then((res) => {
      return JSON.stringify(res.data)
    })
}
