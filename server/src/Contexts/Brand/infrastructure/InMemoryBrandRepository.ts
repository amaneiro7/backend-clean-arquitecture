import { type BrandPrimitives } from '../domain/Brand'
import { type BrandRepository } from '../domain/BrandRepository'

const brands: BrandPrimitives[] = [
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

export class InMemoryBrandRepository implements BrandRepository {
  async searchAll (): Promise<BrandPrimitives[]> {
    return brands
  }

  async searchById (id: string): Promise<BrandPrimitives | null> {
    return brands.find(brand => brand.id === String(id)) ?? null
  }

  async searchByName (name: string): Promise<BrandPrimitives | null> {
    const restlt = brands.find(brand => brand.name.toLowerCase().trim() === name.toLowerCase().trim()) ?? null
    console.log('bandrepositoyr, searchByName', name)

    return restlt
  }

  async save (payload: BrandPrimitives): Promise<void> {
    const brand = await this.searchById(payload.id)
    if (brand !== null) {
      brand.name = payload.name
    }
    brands.push(payload)
  }

  async remove (id: string): Promise<void> {
    brands.filter(brand => brand.id !== id)
  }
}
