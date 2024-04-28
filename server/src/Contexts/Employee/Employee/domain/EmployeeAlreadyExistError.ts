export class EmployeeAlreadyExistError extends Error {
  message = `The Employee UserName${this.name} already exist`

  constructor (readonly name: string) {
    super()
  }
}
