import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type SitePrimitives } from '../../domain/Site'
import { type SiteId } from '../../domain/SiteId'
import { type SiteRepository } from '../../domain/SiteRepository'
import { SiteModels } from './SiteSchema'

export class SequelizeSiteRepository implements SiteRepository {
  private readonly cacheKey: string = 'sites'
  constructor(private readonly cache: CacheRepository) { }
  async searchAll(): Promise<SitePrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }
    const res = await SiteModels.findAll({
      include: [
        {
          association: 'city',
          include: ['state']
        }
      ]
    })
    await this.cache.set(this.cacheKey, JSON.stringify(res))
    return res
  }

  async searchById(id: Primitives<SiteId>): Promise<SitePrimitives | null> {
    return await SiteModels.findByPk(id) ?? null
  }

  async save(payload: SitePrimitives): Promise<void> {
    const { id } = payload
    const employee = await SiteModels.findByPk(id) ?? null
    if (employee === null) {
      await SiteModels.create({ ...payload })
    } else {
      employee.set({ ...payload })
      await employee.save()
    }
    await this.cache.del(this.cacheKey)
    await this.searchAll()
  }
}
