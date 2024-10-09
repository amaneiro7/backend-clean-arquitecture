import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type ProcessorPrimitives } from '../../domain/Processor'
import { type ProcessorNumberModel } from '../../domain/ProcessorNumberModel'
import { type ProcessorRepository } from '../../domain/ProcessorRepository'
import { ProcessorModel } from './ProcessorSchema'

export class SequelizeProcessorRepository implements ProcessorRepository {
  private readonly cacheKey: string = 'processors'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<ProcessorPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await ProcessorModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: string): Promise<ProcessorPrimitives | null> {
    return await ProcessorModel.findByPk(id) ?? null
  }

  async searchByNumberModel(numberModel: Primitives<ProcessorNumberModel>): Promise<ProcessorPrimitives | null> {
    return await ProcessorModel.findOne({ where: { numberModel } }) ?? null
  }

  async save(payload: ProcessorPrimitives): Promise<void> {
    const { id } = payload
    const processor = await ProcessorModel.findByPk(id) ?? null
    if (processor === null) {
      await ProcessorModel.create({ ...payload })
    } else {
      processor.set({ ...payload })
      await processor.save()
    }
    await this.cache.del(this.cacheKey)
    await this.searchAll()
  }

  async remove(id: string): Promise<void> {
    await ProcessorModel.destroy({ where: { id } })
    await this.cache.del(this.cacheKey)
    await this.searchAll()
  }
}
