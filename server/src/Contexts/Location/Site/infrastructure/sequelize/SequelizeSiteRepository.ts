import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type SitePrimitives } from '../../domain/Site'
import { type SiteId } from '../../domain/SiteId'
import { type SiteRepository } from '../../domain/SiteRepository'
import { SiteModels } from './SiteSchema'

export class SequelizeSiteRepository implements SiteRepository {
  async searchAll(): Promise<SitePrimitives[]> {
    return await SiteModels.findAll({
      include: [
        { association: 'city', include: ['state'] }
      ]
    })
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
  }
}
