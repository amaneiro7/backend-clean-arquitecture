import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type ProcessorSocketPrimitives } from '../../domain/ProcessorSocket'
import { type ProcessorSocketId } from '../../domain/ProcessorSocketId'
import { type ProcessorSocketRepository } from '../../domain/ProcessorSocketRepository'
import { ProcessorSocketModel } from './ProcessorSocketSchema'

export class SequelizeProcessorSocketRepository implements ProcessorSocketRepository {
  private readonly cacheKey: string = 'processorSocket'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<ProcessorSocketPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }

    const res = await ProcessorSocketModel.findAll()
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<ProcessorSocketId>): Promise<ProcessorSocketPrimitives | null> {
    return await ProcessorSocketModel.findByPk(id) ?? null
  }
}
