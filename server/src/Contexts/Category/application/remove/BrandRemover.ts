import { Uuid } from '../../../../Shared/domain/Uuid'
import { BrandCannotDeleteIsNotEmptyError } from '../../domain/BrandCannotDeleteIsNotEmptyError'
import { BrandDoesNotExistError } from '../../domain/BrandDoesNotExistError'
import { type BrandRepository } from '../../domain/BrandRepository'

export class BrandRemover {
  constructor (private readonly repository: BrandRepository) {}

  async run (params: { id: string }): Promise<void> {
    const { id } = params
    const brandId = new Uuid(id)

    const brands = await this.repository.searchAll()
    if (brands.length > 0) {
      throw new BrandCannotDeleteIsNotEmptyError()
    }
    const brand = await this.repository.searchById(brandId)
    if (brand === null) {
      throw new BrandDoesNotExistError(id)
    }

    await this.repository.remove(new Uuid(brand.IdValue))
  }
}
