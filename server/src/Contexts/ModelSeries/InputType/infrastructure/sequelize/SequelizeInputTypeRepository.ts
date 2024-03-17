import { type InputTypePrimitives } from '../../domain/InputType'
import { type InputTypeRepository } from '../../domain/InputTypeRepository'
import { InputTypeModel } from './InputTypeSchema'

export class SequelizeInputTypeRepository implements InputTypeRepository {
  async searchAll (): Promise<InputTypePrimitives[]> {
    return await InputTypeModel.findAll()
  }

  async searchById (id: number): Promise<InputTypePrimitives | null> {
    return await InputTypeModel.findByPk(id) ?? null
  }
}
