export class UBrandDoesNotExistError extends Error {
  constructor (public readonly name: string) {
    super(`The brand ${name} does not exist`)
  }
}
