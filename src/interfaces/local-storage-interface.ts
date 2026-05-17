abstract class LocalStorageInterface {

  abstract get(key: string): string | null
  abstract set(key: string, value: string): void
  abstract remove(key: string): void
  abstract watch(callback: (event: StorageEvent) => void): void

}
export default LocalStorageInterface
