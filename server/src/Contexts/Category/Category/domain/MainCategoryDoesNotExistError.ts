export class MainCategoryDoesNotExistError extends Error {
  constructor(public readonly value: string) {
    super(`La categoria no existe`)
  }
}
