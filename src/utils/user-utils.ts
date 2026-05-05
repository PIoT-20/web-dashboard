import { parseUsers, User } from '@/models/user-model'
import { createUserService, getUsersService } from '@/services/user-service'
import { EJSON } from 'bson'

async function getUserList(): Promise<User[] | void> {
  return getUsersService().then((res) => {
    localStorage.setItem('users', res)
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

export { getUserList, createUser }
