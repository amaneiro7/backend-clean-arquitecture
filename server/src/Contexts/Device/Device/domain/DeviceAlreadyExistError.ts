export class DeviceAlreadyExistError extends Error {
  message = `The Device ${this.name} already exist`

  constructor (readonly name: string) {
    super()
  }
}
