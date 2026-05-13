import axios from 'axios'
import { EJSON } from 'bson'


const catalogAddress = 'http://localhost:8085'

async function getDevicesByUserId(userId: string): Promise<string> {

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
