export class CategoryDoesNotExistError extends Error {
  constructor(public readonly value: string) {
    super(`The Category ${value} does not exist`)
  }
}
