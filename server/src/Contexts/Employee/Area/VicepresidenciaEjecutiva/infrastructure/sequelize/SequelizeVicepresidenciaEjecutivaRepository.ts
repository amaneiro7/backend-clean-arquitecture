import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type VicepresidenciaEjecutivaPrimitives } from '../../domain/VicepresidenciaEjecutiva'
import { type VicepresidenciaEjecutivaId } from '../../domain/VicepresidenciaEjecutivaId'
import { type VicepresidenciaEjecutivaRepository } from '../../domain/VicepresidenciaEjecutivaRepository'
import { VicepresidenciaEjecutivaModel } from './VicepresidenciaEjecutivaSchema'

export class SequelizeVicepresidenciaEjecutivaRepository implements VicepresidenciaEjecutivaRepository {
  async searchAll (): Promise<VicepresidenciaEjecutivaPrimitives[]> {
    return await VicepresidenciaEjecutivaModel.findAll()
  }

  async searchById (id: Primitives<VicepresidenciaEjecutivaId>): Promise<VicepresidenciaEjecutivaPrimitives | null> {
    return await VicepresidenciaEjecutivaModel.findByPk(id) ?? null
  }
}
