import { isIdValid, type Id, idNotValidError } from '../../../Shared/domain/Id'
import { NameNotValidError, isNameValid } from '../../../Shared/name'

export class Category {
  public readonly id: Id
  public readonly name: string

  constructor (
    id: Id,
    name: string
  ) {
    this.id = new id(id)
  }
}

export function ensureCategoryIsValid ({ id, name }: Category): void {
  if (!isIdValid(id)) {
    throw idNotValidError(id)
  }
  if (!isNameValid(name)) {
    throw NameNotValidError(name)
  }
}
