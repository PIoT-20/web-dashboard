import { User } from '../models/user-model'
import axios from 'axios'
import { EJSON } from 'bson'

const catalogAddress = import.meta.env.VITE_CATALOG_URL

async function getUsersService(): Promise<string> {


  return axios
    .get(`${catalogAddress}/user`, {
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
    .post(`${catalogAddress}/user`, JSON.stringify(user), {
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
