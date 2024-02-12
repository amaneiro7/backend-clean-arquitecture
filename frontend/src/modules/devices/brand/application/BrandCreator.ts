import { type Repository } from '../../../shared/domain/repository'
import { Brand } from '../domain/Brand'
import { BrandId } from '../domain/BrandId'

export class BrandCreator {
  constructor (readonly repository: Repository) {}

  async create ({ id, name }: { id?: string, name: string }): Promise<void> {
    const brand = Brand.create({ name })

    if (id === undefined) {
      console.log(id)
      await this.repository.brand.save({ brand })
    } else {
      const brandId = new BrandId(id)
      await this.repository.brand.update({ id: brandId, brand })
    }
  }
}
