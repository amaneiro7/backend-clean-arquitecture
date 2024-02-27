import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type SitePrimitives } from './Site'
import { type SiteId } from './SiteId'

export abstract class SiteRepository {
  abstract searchAll (): Promise<SitePrimitives[]>

  abstract searchById (id: Primitives<SiteId>): Promise<SitePrimitives | null>
}
