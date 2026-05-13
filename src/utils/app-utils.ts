import { getUserList } from "./user-utils";
import { getDeviceListByUserId } from "./device-utils";
import type { User } from "@/models/user-model";

export async function setupAppCache() {
  const users: User[] | void = await getUserList()
  if (users) {
    localStorage.setItem('users', JSON.stringify(users))
    users.forEach(async (u) => {
      const devices = await getDeviceListByUserId(u._id.toString())
      if (devices) {
        localStorage.setItem('devices', JSON.stringify(devices))
      }
    })
  }


}
