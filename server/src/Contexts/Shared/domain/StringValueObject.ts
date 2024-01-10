export const NAME_MIN_LENGHT = 3
export const NAME_MAX_LENGHT = 100
export abstract class StringValueObject {
  constructor (public readonly value: string) {}
}

export function isNameValid (name: string): boolean {
  return name.length >= NAME_MIN_LENGHT && name.length <= NAME_MAX_LENGHT
}

export function NameIsNotValidError (name: string): Error {
  return new Error(`Name ${name} no es válido`)
}
