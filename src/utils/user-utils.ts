import { parseUsers, User } from '@/models/user-model'
import { createUserService, getUsersService } from '@/services/user-service'
import { EJSON } from 'bson'

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

export { getUserList, createUser }
