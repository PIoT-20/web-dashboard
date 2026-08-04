
import { getQisAddress, setupQisWatcher } from "./time-series-utils";
import { setupUserDevices, setupUsersWatch } from "./user-utils";

export async function setupApp() {
  setupQisWatcher()
  setupUsersWatch()
  await setupUserDevices()
  await getQisAddress()
}
