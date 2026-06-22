import type { DeviceModel } from "@/models/device-model";
import type { QualityIndex } from "@/models/quality-index";
import type { User } from "@/models/user-model";

import { QualityIndexItem } from '@/models/quality-index-item'
import { ref, type Ref } from "vue";

const deviceController: Ref<Record<string, DeviceModel[]>> = ref({})
const userController: Ref<User[]> = ref([])
const qisController: Ref<Record<string, QualityIndex>> = ref({})
const loadingHeatMap: Ref<boolean> = ref(false)
const selectedQis: Ref<QualityIndexItem[]> = ref([])
const currentUser: Ref<User | undefined> = ref(undefined)
const selectedDevice: Ref<DeviceModel | undefined> = ref(undefined)

export {
  deviceController,
  userController,
  qisController,
  loadingHeatMap,
  selectedQis,
  currentUser,
  selectedDevice,
}
