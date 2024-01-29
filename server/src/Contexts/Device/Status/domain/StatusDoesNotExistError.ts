export class StatusDoesNotExistError extends Error {
  constructor (public readonly value: string) {
    super(`The status ${value} does not exist`)
  }
}
