import { randomUUID } from 'node:crypto'

export class GenerateId {
  id: string
  constructor () {
    this.id = randomUUID()
  }
}

export type Id = `${string}-${string}-${string}-${string}-${string}`

export function isIdValid (id: Id): boolean {
  const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  return regexExp.test(id)
}

export function idNotValidError (id: Id): Error {
  return new Error(`Id ${id} is not valid`)
}
