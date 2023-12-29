import { randomUUID } from 'node:crypto'
import { type CreateBrand, type UpdateBrand, type Brand } from '../../../domain/entities/brand.entity'
import { type Id } from '../../../types/types'
import { type GetByIdRepository } from '../../../domain/repositories/getById.repositoy'
import { type GetAllRepository } from '../../../domain/repositories/getAll.repository'
import { type CreateRepository } from '../../../domain/repositories/create.repository'
import { type UpdateRepository } from '../../../domain/repositories/update.repository'
import { duplicatedItem } from '../../../utils/duplicatedItem'

const brands: Brand[] = [
  {
    id: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3',
    name: 'Hewlett-Packard'
  },
  {
    id: 'c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf',
    name: 'Lenovo'
  },
  {
    id: '5ad1a235-0d9c-410a-b32b-220d91689a08',
    name: 'Wincor-Nixdorf'
  },
  {
    id: '241bf55d-b649-4109-af7c-0e6890ded3fc',
    name: 'Compaq'
  }
]

class BrandGetByIdInMemory implements GetByIdRepository<Brand> {
  exec = async ({ id }: { id: Id }): Promise<Brand | undefined> => {
    const brand = brands.find(brand => brand.id === id)
    return brand
  }
}

class BrandGetAllInMemory implements GetAllRepository<Brand> {
  exec = async (): Promise<Brand[]> => {
    return brands
  }
}

class BrandCreateInMemory implements CreateRepository<Brand, CreateBrand> {
  exec = async (payload: CreateBrand): Promise<Brand> => {
    const { name } = payload
    duplicatedItem({ array: brands, name })
    const newBrand = {
      id: randomUUID(),
      ...payload
    }
    brands.push(newBrand)
    return newBrand
  }
}

class BrandUpdateInMemory implements UpdateRepository<Brand, UpdateBrand> {
  exec = async (id: `${string}-${string}-${string}-${string}-${string}`, payload: UpdateBrand): Promise<Brand | undefined> => {
    const brandIndex = brands.findIndex(brand => brand.id === id)
    if (brandIndex === -1) return undefined
    brands[brandIndex] = {
      ...brands[brandIndex],
      ...payload
    }
    return brands[brandIndex]
  }
}

export interface BrandRepositotoryInterface {
  getAll: BrandGetAllInMemory
  getById: BrandGetByIdInMemory
  create: BrandCreateInMemory
  update: BrandUpdateInMemory
}

export const brandRepositoryInMemory = {
  getAll: new BrandGetAllInMemory(),
  getById: new BrandGetByIdInMemory(),
  create: new BrandCreateInMemory(),
  update: new BrandUpdateInMemory()
}
