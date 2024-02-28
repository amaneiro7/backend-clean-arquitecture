import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type CoordinacionPrimitives } from '../../domain/Coordinacion'
import { type CoordinacionId } from '../../domain/CoordinacionId'
import { type CoordinacionRepository } from '../../domain/CoordinacionRepository'
import { CoordinacionModel } from './CoordinacionSchema'

export class SequelizeCoordinacionRepository implements CoordinacionRepository {
  async searchAll (): Promise<CoordinacionPrimitives[]> {
    return await CoordinacionModel.findAll()
  }

  async searchById (id: Primitives<CoordinacionId>): Promise<CoordinacionPrimitives | null> {
    return await CoordinacionModel.findByPk(id) ?? null
  }
}
