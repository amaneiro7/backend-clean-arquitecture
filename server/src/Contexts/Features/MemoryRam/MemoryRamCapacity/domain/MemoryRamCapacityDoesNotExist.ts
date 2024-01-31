export class MemoryRamCapacityDoesNotExistError extends Error {
  constructor (public readonly value: string) {
    super(`This Memory RamC apacity ${value} does not exist`)
  }
}
