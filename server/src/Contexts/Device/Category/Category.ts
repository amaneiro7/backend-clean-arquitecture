import { isIdValid, type Id, idNotValidError } from '../../Shared/Id'
import { NameNotValidError, isNameValid } from '../../Shared/name'

export interface Category {
  id: Id
  name: string
}

export function ensureCategoryIsValid ({ id, name }: Category): void {
  if (!isIdValid(id)) {
    throw idNotValidError(id)
  }
  if (!isNameValid(name)) {
    throw NameNotValidError(name)
  }
}
