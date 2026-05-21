import type { DeviceModel } from "@/models/device-model";
import type { QualityIndex } from "@/models/quality-index";
import type { User } from "@/models/user-model";
import { ref, type Ref } from "vue";

const deviceController: Ref<Record<string, DeviceModel[]>> = ref({})
const userController: Ref<User[]> = ref([])
const qisController: Ref<Record<string, QualityIndex[]>> = ref({})

export {
  deviceController,
  userController,
  qisController
}
