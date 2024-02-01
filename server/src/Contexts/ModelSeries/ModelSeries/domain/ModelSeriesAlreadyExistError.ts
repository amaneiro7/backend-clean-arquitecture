export class ModelSeriesAlreadyExistError extends Error {
  message = `The Model ${this.name} already exist`

  constructor (readonly name: string) {
    super()
  }
}
