import { TITLE_MAX_LENGHT, TITLE_MIN_LENGHT } from '../../domain/entities/Device/title'

export const NAME_MIN_LENGHT = 2
export const NAME_MAX_LENGHT = 100

export function isNameValid (name: string): boolean {
  return name.length >= TITLE_MIN_LENGHT && name.length <= TITLE_MAX_LENGHT
}

export function NameNotValidError (name: string): Error {
  return new Error(`Name ${name} is not valid`)
}
