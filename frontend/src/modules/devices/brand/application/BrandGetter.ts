import { type Repository } from '../../../shared/repository'
import { type Brand } from '../domain/Brand'
import { BrandId } from '../domain/BrandId'

export async function getById ({ repository, id }: { repository: Repository, id: string }): Promise<Brand | null> {
  const brandId = new BrandId(id).value
  return await repository.brand.getById(brandId) ?? null
}

export async function getByName ({ repository, name }: { repository: Repository, name: string }): Promise<Brand | null> {
  return await repository.brand.getByName(name) ?? null
}
