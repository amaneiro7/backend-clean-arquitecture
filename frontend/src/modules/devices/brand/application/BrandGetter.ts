import { type Repository } from '../../../shared/domain/repository'
import { type Brand } from '../domain/Brand'
import { BrandId } from '../domain/BrandId'
import { BrandName } from '../domain/BrandName'

export class BrandGetter {
  constructor (readonly repository: Repository) {}
  async getById ({ id }: { id: string }): Promise<Brand | null> {
    return await this.repository.brand.getById({ id: new BrandId(id) }) ?? null
  }

  async getByName ({ name }: { name: string }): Promise<Brand | null> {
    return await this.repository.brand.getByName({ name: new BrandName(name) }) ?? null
  }
}
