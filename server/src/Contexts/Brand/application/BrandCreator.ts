import { type Repository } from '../../Shared/domain/Repository'
import { type Primitives } from '../../Shared/domain/value-object/Primitives'
import { Brand, type BrandPrimitives } from '../domain/Brand'
import { BrandAlreadyExistError } from '../domain/BrandAlreadyExistError'
import { BrandName } from '../domain/BrandName'

export class BrandCreator {
  constructor (private readonly repository: Repository) {}

  async run ({ name }: Omit<BrandPrimitives, 'id'>): Promise<void> {
    await this.ensureBrandDoesNotExist(name)

    const brand = Brand.create({ name })

    await this.repository.brand.save(brand.toPrimitive())
  }

  private async ensureBrandDoesNotExist (name: Primitives<BrandName>): Promise<void> {
    if (await this.repository.brand.searchByName(new BrandName(name).value) !== null) {
      throw new BrandAlreadyExistError(name)
    }
  }
}
