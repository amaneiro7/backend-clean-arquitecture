import { type Brand } from '../../domain/Brand'
import { type BrandRepository } from '../../domain/BrandRepository'
import { BrandModel } from './BrandSchema'

export class SquelizeBrandRepository implements BrandRepository {
  async searchAll (): Promise<Brand[]> {
    return await BrandModel.findAll()
  }
}
