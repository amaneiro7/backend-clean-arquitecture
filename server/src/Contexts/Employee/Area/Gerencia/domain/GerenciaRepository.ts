import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type GerenciaPrimitives } from './Gerencia'
import { type GerenciaId } from './GerenciaId'

export abstract class GerenciaRepository {
  abstract searchAll (): Promise<GerenciaPrimitives[]>

  abstract searchById (id: Primitives<GerenciaId>): Promise<GerenciaPrimitives | null>
}
