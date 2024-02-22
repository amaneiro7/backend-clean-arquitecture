export class ProcessorDoesNotExistError extends Error {
  constructor (public readonly value: string) {
    super(`The processor name ${value} does not exist`)
  }
}
