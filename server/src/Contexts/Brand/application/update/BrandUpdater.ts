import { type Repository } from '../../../Shared/domain/Repository'
import { BrandAlreadyExistError } from '../../domain/BrandAlreadyExistError'
import { BrandDoesNotExistError } from '../../domain/BrandDoesNotExistError'
import { BrandId } from '../../domain/BrandId'
import { BrandName } from '../../domain/BrandName'

export class BrandUpdater {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string, newName: string }): Promise<void> {
    const { id, newName } = params

    const brand = await this.repository.brand.searchById(new BrandId(id).toString())
    if (brand === null) {
      throw new BrandDoesNotExistError(newName)
    }
    await this.ensureBrandDoesNotExist(newName)

    brand.name = new BrandName(newName).toString()

    await this.repository.brand.save(brand)
  }

  private async ensureBrandDoesNotExist (name: string): Promise<void> {
    if (await this.repository.brand.searchByName(new BrandName(name).toString()) !== null) {
      throw new BrandAlreadyExistError(name)
    }
  }
}
