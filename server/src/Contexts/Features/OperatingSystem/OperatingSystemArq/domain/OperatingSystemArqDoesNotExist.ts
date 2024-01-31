export class OperatingSystemArqDoesNotExistError extends Error {
  constructor (public readonly value: number | string) {
    super(`This OperatingSystem Arq ${value} does not exist`)
  }
}
