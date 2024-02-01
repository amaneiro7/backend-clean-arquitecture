export class ModelSeriesDoesNotExistError extends Error {
  constructor (public readonly value: string) {
    super(`The Model ${value} does not exist`)
  }
}
