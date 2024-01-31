export class OperatingSystemDoesNotExistError extends Error {
  constructor (public readonly value: number | string) {
    super(`This Operating System ${value} does not exist`)
  }
}
