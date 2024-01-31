export class HardDriveDoesNotExistError extends Error {
  constructor (public readonly value: string | number) {
    super(`This Hard Drive ${value} does not exist`)
  }
}
