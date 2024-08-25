export class HardDriveCapacityDoesNotExistError extends Error {
  constructor (public readonly value: number | string) {
    super(`This Hard Drive Capacity ${value} does not exist`)
  }
}
