import axios from 'axios'
import { EJSON } from 'bson'

async function getDevicesByUserId(userId: string): Promise<string> {
  const catalogAddress = import.meta.env.CATALOG_ADDRESS
  return axios
    .get(`${catalogAddress}/device/?client_id=${userId}`, {
      headers: { 'Content-Type': 'application/json', Accept: '*/*' },
    })
    .then((res) => {
      return EJSON.stringify(res.data)
    })
    .catch((err) => {
      throw 'could not fetch Devices for user ' + err
    })
}

export { getDevicesByUserId }
