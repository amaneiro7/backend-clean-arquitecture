export class HardDriveTypeDoesNotExistError extends Error {
  constructor (public readonly value: number | string) {
    super(`This Hard Drive Type ${value} does not exist`)
  }
}
