export class BrandAlreadyExistError extends Error {
  message = `The status ${this.name} already exist`

  constructor (readonly name: string) {
    super()
  }
}
