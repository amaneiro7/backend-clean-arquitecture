import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { TypeOfSiteId } from './TypeOfSiteId'


export class TypeOfSiteDoesNotExistError extends Error {
  constructor (public readonly value: Primitives<TypeOfSiteId>) {
    super(`El tipo de sitio no existe`)
  }
}
