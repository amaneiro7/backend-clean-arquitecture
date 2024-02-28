import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type GerenciaPrimitives } from '../../domain/Gerencia'
import { type GerenciaId } from '../../domain/GerenciaId'
import { type GerenciaRepository } from '../../domain/GerenciaRepository'
import { GerenciaModel } from './GerenciaSchema'

export class SequelizeGerenciaRepository implements GerenciaRepository {
  async searchAll (): Promise<GerenciaPrimitives[]> {
    return await GerenciaModel.findAll()
  }

  async searchById (id: Primitives<GerenciaId>): Promise<GerenciaPrimitives | null> {
    return await GerenciaModel.findByPk(id) ?? null
  }
}
