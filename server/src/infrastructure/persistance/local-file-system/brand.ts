import { randomUUID } from 'node:crypto'
import { type CreateBrand, type UpdateBrand, type Brand } from '../../../domain/entities/brand.entity'
import { type Id } from '../../../types/types'
import { type BrandRepository } from '../../../domain/repositories/brand.repository'

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

export class BrandRepositoryImpl implements BrandRepository {
  async getAll (): Promise<Brand[]> {
    return brands
  }

  async getById (id: Id): Promise<Brand | undefined> {
    return brands.find(brand => brand.id === id)
  }

  async getByName (name: string): Promise<Brand | undefined> {
    return brands.find(brand => brand.name === name)
  }

  async create (payload: CreateBrand): Promise<Brand> {
    const newBrand = {
      id: randomUUID(),
      ...payload
    }
    brands.push(newBrand)
    return newBrand
  }

  async update (id: `${string}-${string}-${string}-${string}-${string}`, payload: UpdateBrand): Promise<Brand | undefined> {
    const brandIndex = brands.findIndex(brand => brand.id === id)
    if (brandIndex === -1) return undefined
    brands[brandIndex] = {
      ...brands[brandIndex],
      ...payload
    }
    return brands[brandIndex]
  }

  async remove (id: `${string}-${string}-${string}-${string}-${string}`): Promise<void> {
    brands.filter(brand => brand.id !== id)
  }
}
