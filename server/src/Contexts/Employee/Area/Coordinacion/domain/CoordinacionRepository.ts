import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CoordinacionPrimitives } from './Coordinacion'
import { type CoordinacionId } from './CoordinacionId'

export abstract class CoordinacionRepository {
  abstract searchAll (): Promise<CoordinacionPrimitives[]>

  abstract searchById (id: Primitives<CoordinacionId>): Promise<CoordinacionPrimitives | null>
}
