export const NAME_MAX_LENGTH = 100
export const NAME_MIN_LENGTH = 5

export function isCategoryNameValid (name: string): boolean {
  return name.length >= NAME_MIN_LENGTH && name.length <= NAME_MAX_LENGTH
}

export function CategoryNameNotValidError (name: string): Error {
  return new Error(`Name ${name} no es válido`)
}
