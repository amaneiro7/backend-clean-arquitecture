import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { SiteId } from './SiteId'

export class SiteDoesNotExistError extends Error {
  constructor (public readonly value: Primitives<SiteId>) {
    super(`El sitio no existe`)
  }
}
