import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { CacheService } from '../../../../../Shared/domain/CacheService'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type ProcessorSocketPrimitives } from '../../domain/ProcessorSocket'
import { type ProcessorSocketId } from '../../domain/ProcessorSocketId'
import { type ProcessorSocketRepository } from '../../domain/ProcessorSocketRepository'
import { ProcessorSocketModel } from './ProcessorSocketSchema'

export class SequelizeProcessorSocketRepository implements ProcessorSocketRepository {
  private readonly cacheKey: string = 'processorSocket'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<ProcessorSocketPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await ProcessorSocketModel.findAll()

    })
  }

  async searchById(id: Primitives<ProcessorSocketId>): Promise<ProcessorSocketPrimitives | null> {
    return await ProcessorSocketModel.findByPk(id) ?? null
  }
}
