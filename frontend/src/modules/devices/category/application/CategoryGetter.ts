import { type Repository } from '../../../shared/domain/repository'
import { type CategoryPrimitives } from '../domain/Category'
import { type CategoryId } from '../domain/CategoryId'
import { type CategoryName } from '../domain/CategoryName'

export async function getById ({ repository, id }: { repository: Repository, id: CategoryId }): Promise<CategoryPrimitives | null> {
  return await repository.category.getById({ id }) ?? null
}

export async function getByName ({ repository, name }: { repository: Repository, name: CategoryName }): Promise<CategoryPrimitives | null> {
  return await repository.category.getByName({ name }) ?? null
}
