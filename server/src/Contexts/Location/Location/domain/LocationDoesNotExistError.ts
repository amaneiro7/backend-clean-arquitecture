import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type LocationId } from './LocationId'

export class LocationDoesNotExistError extends Error {
  constructor (public readonly value: Primitives<LocationId>) {
    super(`The location ${value} does not exist`)
  }
}
