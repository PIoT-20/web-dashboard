import { setupUserDevices, setupUsersWatch } from "./user-utils";

export async function setupApp() {
  setupUsersWatch()
  await setupUserDevices()
}
