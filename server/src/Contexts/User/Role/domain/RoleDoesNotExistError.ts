export class RoleDoesNotExistError extends Error {
  constructor() {
    super(`The role does not exist`)
  }
}
