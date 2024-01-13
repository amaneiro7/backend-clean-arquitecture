import { Uuid } from '../../../../Shared/domain/Uuid'
import { BrandAlreadyExistError } from '../../domain/BrandAlreadyExistError'
import { BrandDoesNotExistError } from '../../domain/BrandDoesNotExistError'
import { BrandName } from '../../domain/BrandName'
import { type BrandRepository } from '../../domain/BrandRepository'

export class BrandUpdater {
  constructor (private readonly repository: BrandRepository) {}

  async run (params: { id: string, newName: string }): Promise<void> {
    const { id, newName } = params

    const brand = await this.repository.searchById(new Uuid(id))
    if (brand === null) {
      throw new BrandDoesNotExistError(newName)
    }
    this.ensureBrandDoesNotExist(newName)

    brand.updateName(newName)

    await this.repository.save(brand)
  }

  private ensureBrandDoesNotExist (name: string): void {
    if (this.repository.searchByName(new BrandName(name)) !== null) {
      throw new BrandAlreadyExistError(name)
    }
  }
}
