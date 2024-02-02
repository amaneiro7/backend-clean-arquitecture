import { type Repository } from '../../../shared/repository'
import { type Category } from '../domain/Category'

export async function getById ({ repository, id }: { repository: Repository, id: number }): Promise<Category | null> {
  return await repository.category.getById({ id }) ?? null
}

export async function getByName ({ repository, name }: { repository: Repository, name: string }): Promise<Category | null> {
  return await repository.category.getByName({ name }) ?? null
}
