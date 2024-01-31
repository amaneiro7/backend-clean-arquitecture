export class ComputerDoesNotExistError extends Error {
  constructor (public readonly value: string) {
    super(`The computer features ${value} does not exist`)
  }
}
