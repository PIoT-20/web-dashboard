import type { DeviceModel } from "@/models/device-model";
import type { User } from "@/models/user-model";
import { ref, type Ref } from "vue";

const deviceController: Ref<Record<string, DeviceModel[]>> = ref({})
const userController: Ref<User[]> = ref([])

export {
  deviceController,
  userController,
}
