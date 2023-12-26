import { randomUUID } from 'node:crypto'
import { type CreateBrand, type UpdateBrand, type Brand } from '../../../domain/entities/brand.entity'
import { type BrandRepository } from '../../../domain/repositories/brand.repository'
import { type Id } from '../../../types/types'
import { type GetByIdRepository } from '../../../domain/repositories/getById.repositoy'

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

export class BrandGetByIdInMemory implements GetByIdRepository<Brand> {
  getById = async ({ id }: { id: Id }): Promise<Brand | undefined> => {
    const brand = brands.find(brand => brand.id === id)
    return brand
  }
}
export class BrandRepositoryInMemory implements BrandRepository {
  getAll = async (): Promise<Brand[]> => {
    return brands
  }

  getOne = async ({ id }: { id: Id }): Promise<Brand | undefined> => {
    const brand = brands.find(brand => brand.id === id)
    return brand
  }

  create = async (payload: CreateBrand): Promise <Brand> => {
    const newBrand = {
      id: randomUUID(),
      ...payload
    }
    brands.push(newBrand)
    return newBrand
  }

  update = async (id: Id, payload: UpdateBrand): Promise<Brand | undefined> => {
    const brandIndex = brands.findIndex(brand => brand.id === id)
    if (brandIndex === -1) return undefined
    brands[brandIndex] = {
      ...brands[brandIndex],
      ...payload
    }

    return brands[brandIndex]
  }
}
export const brandRepositoryInMemory = {
  getById: new BrandGetByIdInMemory(),
  execute: new BrandRepositoryInMemory()
}
