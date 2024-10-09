import { InputTypeModel } from './InputTypeSchema'
import { type InputTypeRepository } from '../../domain/InputTypeRepository'
import { type InputTypePrimitives } from '../../domain/InputType'
import { type InputTypeId } from '../../domain/InputTypeId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'

export class SequelizeInputTypeRepository implements InputTypeRepository {
  private readonly cacheKey: string = 'inputTypes'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<InputTypePrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await InputTypeModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<InputTypeId>): Promise<InputTypePrimitives | null> {
    return await InputTypeModel.findByPk(id) ?? null
  }
}
