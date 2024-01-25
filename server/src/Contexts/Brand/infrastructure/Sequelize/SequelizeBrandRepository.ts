import { type BrandPrimitives } from '../../domain/Brand'
import { type BrandRepository } from '../../domain/BrandRepository'
import { BrandModel } from './BrandSchema'

export class SequelizeBrandRepository implements BrandRepository {
  async searchAll (): Promise<BrandPrimitives[]> {
    return await BrandModel.findAll()
  }

  async searchById (id: string): Promise<BrandPrimitives | null> {
    return await BrandModel.findByPk(id) ?? null
  }

  async searchByName (name: string): Promise<BrandPrimitives | null> {
    return await BrandModel.findOne({ where: { name } }) ?? null
  }

  async save (payload: BrandPrimitives): Promise<void> {
    const { id } = payload
    const brand = await BrandModel.findByPk(id) ?? null
    if (brand === null) {
      await BrandModel.create(payload)
    } else {
      brand.set({ ...payload })
      await brand.save()
    }
  }

  async remove (id: string): Promise<void> {
    await BrandModel.destroy({ where: { id } })
  }
}
