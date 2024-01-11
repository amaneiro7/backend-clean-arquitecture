export class BrandAlreadyExistError extends Error {
  message = `The brand ${this.name} already exist`

  constructor (readonly name: string) {
    super()
  }
}
