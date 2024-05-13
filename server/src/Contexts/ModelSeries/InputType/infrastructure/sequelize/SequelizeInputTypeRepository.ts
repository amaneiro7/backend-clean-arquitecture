import { Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { InputTypeModel } from './InputTypeSchema'
import { type InputTypeRepository } from '../../domain/InputTypeRepository'
import { type InputTypePrimitives } from '../../domain/InputType'
import { type InputTypeId } from '../../domain/InputTypeId'

export class SequelizeInputTypeRepository implements InputTypeRepository {
  async searchAll (): Promise<InputTypePrimitives[]> {
    return await InputTypeModel.findAll()
  }

  async searchById (id: Primitives<InputTypeId>): Promise<InputTypePrimitives | null> {
    return await InputTypeModel.findByPk(id) ?? null
  }
}
