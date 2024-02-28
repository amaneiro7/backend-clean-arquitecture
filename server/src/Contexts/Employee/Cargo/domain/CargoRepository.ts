import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type CargoPrimitives } from './Cargo'
import { type CargoId } from './CargoId'

export abstract class CargoRepository {
  abstract searchAll (): Promise<CargoPrimitives[]>

  abstract searchById (id: Primitives<CargoId>): Promise<CargoPrimitives | null>
}
