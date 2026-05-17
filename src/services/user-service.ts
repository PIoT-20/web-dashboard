import { User } from '../models/user-model'
import httpClient from '@/api/http-client'
import { EJSON } from 'bson'

const catalogAddress = import.meta.env.VITE_CATALOG_URL

async function getUsersService(): Promise<string> {


  return httpClient
    .get(`${catalogAddress}/user`)
    .then((res) => {
      return EJSON.stringify(res.data)
    })
    .catch((err) => {
      throw `could not fetch users\n ${err} `
    })
}
async function createUserService(user: User): Promise<any> {

  return httpClient
    .post(`${catalogAddress}/user`, JSON.stringify(user))
    .catch((err) => {
      throw `could not create user\n ${err} `
    })
    .then((res) => {
      return res.data
    })
}
export { getUsersService, createUserService }
