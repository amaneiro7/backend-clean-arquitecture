import { type Repository } from '../../Shared/domain/Repository'
import { Brand } from '../domain/Brand'
import { BrandAlreadyExistError } from '../domain/BrandAlreadyExistError'
import { BrandName } from '../domain/BrandName'

export class BrandCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { name: string }): Promise<void> {
    const { name } = params

    await this.ensureBrandDoesNotExist(name)

    const brand = Brand.create({ name })

    await this.repository.brand.save(brand.toPrimitive())
  }

  private async ensureBrandDoesNotExist (name: string): Promise<void> {
    if (await this.repository.brand.searchByName(new BrandName(name).value) !== null) {
      throw new BrandAlreadyExistError(name)
    }
  }
}
