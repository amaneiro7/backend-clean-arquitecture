export class LocationNameAlreadyExistError extends Error {
  message = `El nombre de ubicación ${this.name} ya existe`

  constructor (readonly name: string) {
    super()
  }
}
