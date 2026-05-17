import type LocalStorageInterface from "@/interfaces/local-storage-interface"

class LocalStorage implements LocalStorageInterface {
  get(key: string): string | null {
    return localStorage.getItem(key)
  }

  set(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  remove(key: string): void {
    localStorage.removeItem(key)
  }
  watch(key: string, callback: (event: StorageEvent) => void): void {
    addEventListener("storage", callback)
  }
}

const storageClient: LocalStorageInterface = new LocalStorage()

export default storageClient
