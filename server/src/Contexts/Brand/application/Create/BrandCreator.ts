import { type Repository } from '../../../Shared/domain/Repository'
import { Brand } from '../../domain/Brand'
import { BrandAlreadyExistError } from '../../domain/BrandAlreadyExistError'
import { BrandName } from '../../domain/BrandName'

export class BrandCreator {
  constructor (private readonly repository: Repository) {}

  async run (params: { name: string }): Promise<void> {
    const { name } = params

    this.ensureBrandDoesNotExist(name)

    const brand = Brand.create({ name })

    await this.repository.brand.save(brand)
  }

  private ensureBrandDoesNotExist (name: string): void {
    if (this.repository.brand.searchByName(new BrandName(name)) !== null) {
      throw new BrandAlreadyExistError(name)
    }
  }
}
