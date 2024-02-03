import { type Repository } from '../../../shared/domain/repository'
import { Brand } from '../domain/Brand'

export class BrandCreator {
  constructor (readonly repository: Repository) {}

  async create ({ id, name }: { id: string, name: string }): Promise<void> {
    const brand = Brand.create({ id, name })
    await this.repository.brand.save({ brand })
  }
}
