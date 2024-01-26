import { models } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type BrandPrimitives } from '../../domain/Brand'
import { type BrandRepository } from '../../domain/BrandRepository'

export class SequelizeBrandRepository implements BrandRepository {
  async searchAll (): Promise<BrandPrimitives[]> {
    return await models.Brand.findAll()
  }

  async searchById (id: string): Promise<BrandPrimitives | null> {
    return await models.Brand.findByPk(id) ?? null
  }

  async searchByName (name: string): Promise<BrandPrimitives | null> {
    return await models.Brand.findOne({ where: { name } }) ?? null
  }

  async save (payload: BrandPrimitives): Promise<void> {
    const { id } = payload
    const brand = await models.Brand.findByPk(id) ?? null
    if (brand === null) {
      await models.Brand.create({ ...payload })
    } else {
      brand.set({ ...payload })
      await brand.save()
    }
  }

  async remove (id: string): Promise<void> {
    await models.Brand.destroy({ where: { id } })
  }
}
