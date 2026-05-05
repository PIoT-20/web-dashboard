import axios from 'axios'
import { EJSON } from 'bson'

async function getDevicesByUserId(userId: string): Promise<string> {
  return axios
    .get(`http://127.0.0.1:8080/device/?client_id=${userId}`, {
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
