import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type OperatingSystemArqPrimitives } from '../../domain/OperatingSystemArq'
import { type OperatingSystemArqId } from '../../domain/OperatingSystemArqID'
import { type OperatingSystemArqRepository } from '../../domain/OperatingSystemArqRepository'
import { OperatingSystemArqModel } from './OperatingSystemArqSchema'

export class SequelizeOperatingSystemArqRepository implements OperatingSystemArqRepository {
  async searchAll (): Promise<OperatingSystemArqPrimitives[]> {
    return await OperatingSystemArqModel.findAll()
  }

  async searchById (id: Primitives<OperatingSystemArqId>): Promise<OperatingSystemArqPrimitives | null> {
    return await OperatingSystemArqModel.findByPk(id) ?? null
  }
}
