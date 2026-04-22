import type { n } from 'vue-router/dist/index-DJQJwTR2.js'
import { User } from '../models/user-model.ts'
import axios from 'axios'

async function getUsers(): Promise<string | void> {
  return axios
    .get('http://127.0.0.1:8080/user', {
      headers: { 'Content-Type': 'application/json', Accept: '*/*' },
    })
    .catch((err) => {
      console.log(err)
      throw 'could not fetch users'
    })
    .then((res) => {
      return res.data
    })
}
export { getUsers }
