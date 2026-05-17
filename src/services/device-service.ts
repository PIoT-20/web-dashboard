import httpClient from '@/api/http-client'
import { EJSON } from 'bson'


const catalogAddress = import.meta.env.VITE_CATALOG_URL

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

export { getDevicesByUserId }
