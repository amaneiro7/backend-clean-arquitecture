import { Brand } from '../domain/Brand'
import { BrandAlreadyExistError } from '../domain/BrandAlreadyExistError'
import { BrandId } from '../domain/BrandId'
import { BrandName } from '../domain/BrandName'
import { type BrandRepository } from '../domain/BrandRepository'

export class createNewBrand {
  constructor (private readonly repository: BrandRepository) {}

  async run (params: { name: string }): Promise<void> {
    const { name } = params

    const id = String(BrandId.random())

    this.ensureBrandDoesNotExist(name)

    const brand = Brand.create({ id, name })

    this.repository.save(brand)
  }

  private ensureBrandDoesNotExist (name: string): void {
    if (this.repository.searchByName(new BrandName(name)) !== null) {
      throw new BrandAlreadyExistError(name)
    }
  }
}
