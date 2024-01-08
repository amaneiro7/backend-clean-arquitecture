export const TITLE_MIN_LENGHT = 3
export const TITLE_MAX_LENGHT = 100

export function isTitleValid (title: string): boolean {
  return title.length >= TITLE_MIN_LENGHT && title.length <= TITLE_MAX_LENGHT
}

export function TitleIsNotValidError (title: string): Error {
  return new Error(`Title ${title} no es válido`)
}
