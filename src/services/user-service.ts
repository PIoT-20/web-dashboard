import type { n } from 'vue-router/dist/index-DJQJwTR2.js'
import { User } from '../models/user-model.ts'
import axios from 'axios'
import { EJSON } from 'bson'

async function getUsersService(): Promise<string> {
  return axios
    .get('http://127.0.0.1:8080/user', {
      headers: { 'Content-Type': 'application/json', Accept: '*/*' },
    })
    .then((res) => {
      return EJSON.stringify(res.data)
    })
    .catch((err) => {
      throw `could not fetch users\n ${err} `
    })
}
async function createUserService(user: User): Promise<any> {
  return axios
    .post('http://127.0.0.1:8080/user', JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json', Accept: '*/*' },
    })
    .catch((err) => {
      throw `could not create user\n ${err} `
    })
    .then((res) => {
      return res.data
    })
}
export { getUsersService, createUserService }
