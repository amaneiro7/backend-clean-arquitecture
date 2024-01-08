export type Id = `${string}-${string}-${string}-${string}-${string}`

export function isIdValid (id: string): boolean {
  const regexExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

  return regexExp.test(id)
}

export function idNotValidError (id: string): Error {
  return new Error(`Id ${id} is not valid`)
}
