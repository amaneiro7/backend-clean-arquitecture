import { type Repository } from '../../Shared/domain/Repository'
import { type BrandPrimitives } from '../domain/Brand'
import { BrandDoesNotExistError } from '../domain/BrandDoesNotExistError'
import { type BrandId } from '../domain/BrandId'
import { type BrandName } from '../domain/BrandName'

export class BrandsFinder {
  constructor (private readonly repository: Repository) {}

  async searchById (brandId: BrandId): Promise<BrandPrimitives> {
    const brand = await this.repository.brand.searchById(brandId.toString())

    if (brand === null) {
      throw new BrandDoesNotExistError(brandId.toString())
    }

    return brand
  }

  async searchByName (brandName: BrandName): Promise<BrandPrimitives> {
    const brand = await this.repository.brand.searchByName(brandName.toString())

    if (brand === null) {
      throw new BrandDoesNotExistError(brandName.toString())
    }

    return brand
  }
}
