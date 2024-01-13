import { Brand } from '../domain/Brand'
import { BrandId } from '../domain/BrandId'
import { BrandName } from '../domain/BrandName'
import { type BrandRepository } from '../domain/BrandRepository'

const brands: Brand[] = [
  new Brand(
    new BrandId('dcdd0fad-a94c-4810-8acc-5f108d3b18c3'),
    new BrandName('Hewlett-Packard')
  ),
  new Brand(
    new BrandId('c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf'),
    new BrandName('Lenovo')
  ),
  new Brand(
    new BrandId('5ad1a235-0d9c-410a-b32b-220d91689a08'),
    new BrandName('Wincor-Nixdorf')
  ),
  new Brand(
    new BrandId('241bf55d-b649-4109-af7c-0e6890ded3fc'),
    new BrandName('Compaq')
  )
]

export class InMemoryBrandRepository implements BrandRepository {
  async searchAll (): Promise<Brand[]> {
    return brands
  }

  async searchById (id: BrandId): Promise<Brand | null> {
    return brands.find(brand => brand.IdValue === String(id)) ?? null
  }

  async searchByName (name: BrandName): Promise<Brand | null> {
    return brands.find(brand => brand.nameValue.toLowerCase().trim() === String(name).toLowerCase().trim()) ?? null
  }

  async save (payload: Brand): Promise<void> {
    const brand = await this.searchById(new BrandId(payload.IdValue))
    if (brand !== null) {
      brand.updateName(payload.nameValue)
    }
    brands.push(payload)
  }

  async remove (id: BrandId): Promise<void> {
    brands.filter(brand => brand.IdValue !== String(id))
  }
}
