import { User } from '@/models/user-model'
import { getUsers } from '@/service/user-service'

async function getUserList(): Promise<User[] | void> {
  return getUsers()
    .catch((err) => {
      console.log(err)
    })
    .then((res) => {
      if (res) {
        localStorage.setItem('users', res)

        return Object.assign(JSON.parse(res), User)
      }
    })
}
export { getUserList }
