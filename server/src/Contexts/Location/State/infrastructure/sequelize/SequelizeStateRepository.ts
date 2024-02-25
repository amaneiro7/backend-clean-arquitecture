import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type StatePrimitives } from '../../domain/State'
import { type StateId } from '../../domain/StateId'
import { StateRepository } from '../../domain/StateRepository'
import { StateModel } from './StateSchema'

export class SequelizeStateRepository extends StateRepository {
  async searchAll (): Promise<StatePrimitives[]> {
    return await StateModel.findAll()
  }

  async searchById (id: Primitives<StateId>): Promise<StatePrimitives | null> {
    return await StateModel.findByPk(id) ?? null
  }
}
