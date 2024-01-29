export class ComputerProcessorAlreadyExistError extends Error {
  message = `The Processor ${this.name} already exist`

  constructor (readonly name: string) {
    super()
  }
}
