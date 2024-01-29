export class StatusDoesNotExistError extends Error {
  constructor (public readonly value: number) {
    super(`The status ${value} does not exist`)
  }
}
