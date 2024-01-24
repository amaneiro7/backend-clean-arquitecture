import { type Repository } from '../../../Shared/domain/Repository'
import { BrandCannotDeleteIsNotEmptyError } from '../../domain/BrandCannotDeleteIsNotEmptyError'
import { BrandDoesNotExistError } from '../../domain/BrandDoesNotExistError'
import { BrandId } from '../../domain/BrandId'

export class BrandRemover {
  constructor (private readonly repository: Repository) {}

  async run (params: { id: string }): Promise<void> {
    const { id } = params
    const brandId = new BrandId(id)

    const brands = await this.repository.brand.searchAll()
    if (brands.length > 0) {
      throw new BrandCannotDeleteIsNotEmptyError()
    }
    const brand = await this.repository.brand.searchById(brandId.toString())
    if (brand === null) {
      throw new BrandDoesNotExistError(id)
    }

    await this.repository.brand.remove(brandId.toString())
  }
}
