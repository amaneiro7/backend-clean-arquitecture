import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type VicepresidenciaPrimitives } from './vicepresidencia'
import { type VicepresidenciaId } from './vicepresidenciaId'

export abstract class VicepresidenciaRepository {
  abstract searchAll (): Promise<VicepresidenciaPrimitives[]>

  abstract searchById (id: Primitives<VicepresidenciaId>): Promise<VicepresidenciaPrimitives | null>
}
