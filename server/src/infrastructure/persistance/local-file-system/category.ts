import { type Category } from '../../../domain/entities/category.entity'
import { type Id } from '../../../types/types'
import { type GetByIdRepository } from '../../../domain/repositories/getById.repositoy'
import { type GetByNameRepository } from '../../../domain/repositories/getByName.repository'
import { type GetAllRepository } from '../../../domain/repositories/getAll.repository'

const categories: Category[] = [
  {
    id: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3',
    name: 'Computadoras'
  },
  {
    id: 'c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf',
    name: 'Monitores'
  },
  {
    id: '5ad1a235-0d9c-410a-b32b-220d91689a08',
    name: 'Impresoras Financieras'
  },
  {
    id: '241bf55d-b649-4109-af7c-0e6890ded3fc',
    name: 'Impresoras Laser'
  }
]
class GetByIdInMemory implements GetByIdRepository<Category> {
  exec = async ({ id }: { id: Id }): Promise<Category | undefined> => {
    const category = categories.find(category => category.id === id)
    return category
  }
}
class GetByNameInMemory implements GetByNameRepository<Category> {
  exec = async ({ name }: { name: string }): Promise<Category | undefined> => {
    const category = categories.find(category => category.name === name)
    return category
  }
}

class GetAllInMemory implements GetAllRepository<Category> {
  exec = async (): Promise<Category[]> => {
    return categories
  }
}

export interface CategoryRepositotoryInterface {
  getAll: GetAllInMemory
  getById: GetByIdInMemory
  getByName: GetByNameInMemory
}

export const categoryRepositoryInMemory = {
  getAll: new GetAllInMemory(),
  getById: new GetByIdInMemory(),
  getByName: new GetByNameInMemory()
}
