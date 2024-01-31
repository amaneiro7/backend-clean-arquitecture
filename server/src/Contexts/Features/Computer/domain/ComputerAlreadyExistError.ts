export class ComputerAlreadyExistError extends Error {
  message = `The Computer Features ${this.name} already exist`

  constructor (readonly name: string) {
    super()
  }
}
