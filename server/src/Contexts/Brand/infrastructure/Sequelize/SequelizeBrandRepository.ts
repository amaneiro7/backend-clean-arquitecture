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
    await BrandModel.findOrCreate({ where: { id: payload.id } })
  }

  async remove (id: string): Promise<void> {
    await BrandModel.destroy({ where: { id } })
  }
}
