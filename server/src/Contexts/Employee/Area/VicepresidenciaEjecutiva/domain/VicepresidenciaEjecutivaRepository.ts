import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type VicepresidenciaEjecutivaPrimitives } from './VicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaId } from './VicepresidenciaEjecutivaId'

export abstract class VicepresidenciaEjecutivaRepository {
  abstract searchAll (): Promise<VicepresidenciaEjecutivaPrimitives[]>

  abstract searchById (id: Primitives<VicepresidenciaEjecutivaId>): Promise<VicepresidenciaEjecutivaPrimitives | null>
}
