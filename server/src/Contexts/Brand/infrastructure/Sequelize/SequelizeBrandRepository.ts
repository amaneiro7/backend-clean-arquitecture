import { type Brand } from '../../domain/Brand'
import { type BrandRepository } from '../../domain/BrandRepository'

export class SquelizeBrandRepository implements BrandRepository {
  async searchAll (): Promise<Brand[]> {

  }
}
