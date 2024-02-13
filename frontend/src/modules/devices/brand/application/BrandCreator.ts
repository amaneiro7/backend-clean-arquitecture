import { type Repository } from '../../../shared/domain/repository'
import { Brand, type BrandPrimitives } from '../domain/Brand'
import { BrandId } from '../domain/BrandId'

export class BrandCreator {
  constructor (readonly repository: Repository) {}

  async create ({ id, name }: BrandPrimitives): Promise<void> {
    const brand = Brand.create({ name })

    if (id === undefined) {
      await this.repository.brand.save({ brand })
    } else {
      const brandId = new BrandId(id)
      await this.repository.brand.update({ id: brandId, brand })
    }
  }
}
