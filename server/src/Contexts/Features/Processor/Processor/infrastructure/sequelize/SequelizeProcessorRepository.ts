import { type CacheRepository } from '../../../../../Shared/domain/CacheRepository'
import { CacheService } from '../../../../../Shared/domain/CacheService'
import { type Primitives } from '../../../../../Shared/domain/value-object/Primitives'
import { type ProcessorPrimitives } from '../../domain/Processor'
import { type ProcessorNumberModel } from '../../domain/ProcessorNumberModel'
import { type ProcessorRepository } from '../../domain/ProcessorRepository'
import { ProcessorModel } from './ProcessorSchema'

export class SequelizeProcessorRepository implements ProcessorRepository {
  private readonly cacheKey: string = 'processors'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<ProcessorPrimitives[]> {
    return await new CacheService(this.cache).getCachedData(this.cacheKey, async () => {
      return await ProcessorModel.findAll()
    })
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
    await new CacheService(this.cache).removeCachedData(this.cacheKey)
    await this.searchAll()
  }

  async remove(id: string): Promise<void> {
    await ProcessorModel.destroy({ where: { id } })
    await new CacheService(this.cache).removeCachedData(this.cacheKey)
    await this.searchAll()
  }
}
