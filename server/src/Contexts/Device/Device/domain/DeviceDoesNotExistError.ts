export class DeviceDoesNotExistError extends Error {
  constructor (public readonly value: string) {
    super(`The Device ${value} does not exist`)
  }
}
