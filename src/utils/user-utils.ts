import { userController } from '@/controllers/app-controller'
import { parseUsers, User } from '@/models/user-model'
import { createUserService, getUsersService } from '@/services/user-service'
import storageClient from '@/stores/local-storage'
import { EJSON } from 'bson'
import { getDeviceListByUserId } from './device-utils'
import type { DeviceModel } from '@/models/device-model'

async function getUserList(): Promise<User[] | void> {
  const cache = localStorage.getItem('users')
  if (cache) {
    return parseUsers(cache)
  }
  return getUsersService().then((res) => {
    return parseUsers(res)
  })
}
async function createUser(user: User): Promise<void> {
  createUserService(user).then((res) => {
    if (res) {
      var users: string[] = EJSON.parse(localStorage.getItem('users') || '[]')
      users.push(res)
      localStorage.setItem('users', JSON.stringify(users))
    }
  })
}

function watchUsers(event: StorageEvent): void {
  if (event.key === `users`) {
    userController.value = parseUsers(event.newValue!)
  }
}

function setupUsersWatch(): void {
  storageClient.watch(watchUsers)
}

async function setupUserDevices() {
  getUserList().then((users: User[] | void) => {
    if (!users) return
    storageClient.set("users", EJSON.stringify(users))
    users.forEach((user) => {
      storageClient.watch(user.watchUserDevices)
      getDeviceListByUserId(user._id.toString()).then((devices: DeviceModel[] | void) => {
        if (!devices) return
        storageClient.set(`devices_${user._id}`, EJSON.stringify(devices))
      })
    })
  })
}





export { getUserList, createUser, setupUserDevices, setupUsersWatch }
