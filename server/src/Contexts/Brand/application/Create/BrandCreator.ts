import { Brand } from '../../domain/Brand'
import { BrandAlreadyExistError } from '../../domain/BrandAlreadyExistError'
import { BrandName } from '../../domain/BrandName'
import { type BrandRepository } from '../../domain/BrandRepository'

export class BrandCreator {
  constructor (private readonly repository: BrandRepository) {}

  async run (params: { name: string }): Promise<void> {
    const { name } = params

    this.ensureBrandDoesNotExist(name)

    const brand = Brand.create({ name })

    this.repository.save(brand)
  }

  private ensureBrandDoesNotExist (name: string): void {
    if (this.repository.searchByName(new BrandName(name)) !== null) {
      throw new BrandAlreadyExistError(name)
    }
  }
}
