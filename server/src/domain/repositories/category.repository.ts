import { type Category } from '../entities/category.entity'
import { type GetAllRepository } from './getAll.repository'
import { type GetByIdRepository } from './getById.repositoy'
import { type GetByNameRepository } from './getByName.repository'

// export interface CategoryRepository {
//   getAll: () => Promise<Category[]>
//   getOne: ({ id }: { id: Id }) => Promise<Category | undefined>
// }

export interface CategoryRepository {
  getAll: GetAllRepository<Category>
  getById: GetByIdRepository<Category>
  getByName: GetByNameRepository<Category>
}
