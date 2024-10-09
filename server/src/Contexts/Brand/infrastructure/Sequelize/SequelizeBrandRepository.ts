import { CacheRepository } from '../../../Shared/domain/CacheRepository'
import { type BrandPrimitives } from '../../domain/Brand'
import { type BrandRepository } from '../../domain/BrandRepository'
import { BrandModel } from './BrandSchema'

export class SequelizeBrandRepository implements BrandRepository {
  private readonly cacheKey: string = 'brands'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<BrandPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    } else {
      const result = await BrandModel.findAll({
        include: [
          {
            association: 'model'
          }
        ]
      })
      await this.cache.set(this.cacheKey, JSON.stringify(result))
      return result
    }
  }

  async searchById(id: string): Promise<BrandPrimitives | null> {
    return await BrandModel.findByPk(id) ?? null
  }

  async searchByName(name: string): Promise<BrandPrimitives | null> {
    return await BrandModel.findOne({ where: { name } }) ?? null
  }

  async save(payload: BrandPrimitives): Promise<void> {
    const { id } = payload
    const brand = await BrandModel.findByPk(id) ?? null
    if (brand === null) {
      await BrandModel.create({ ...payload })
    } else {
      brand.set({ ...payload })
      await brand.save()
    }
    await this.cache.del(this.cacheKey)
    await this.searchAll()
  }

  async remove(id: string): Promise<void> {
    await BrandModel.destroy({ where: { id } })
    await this.cache.del(this.cacheKey)
    await this.searchAll()
  }
}
