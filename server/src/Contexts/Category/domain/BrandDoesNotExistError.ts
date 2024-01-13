export class BrandDoesNotExistError extends Error {
  constructor (public readonly value: string) {
    super(`The brand ${value} does not exist`)
  }
}
