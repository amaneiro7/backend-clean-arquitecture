import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type TypeOfSitePrimitives } from './TypeOfSite'
import { type TypeOfSiteId } from './TypeOfSiteId'

export abstract class TypeOfSiteRepository {
  abstract searchAll (): Promise<TypeOfSitePrimitives[]>

  abstract searchById (id: Primitives<TypeOfSiteId>): Promise<TypeOfSitePrimitives | null>
}
