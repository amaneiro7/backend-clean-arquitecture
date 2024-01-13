import { type Uuid } from '../../../Shared/domain/Uuid'
import { type Brand } from '../domain/Brand'
import { BrandId } from '../domain/BrandId'
import { type BrandName } from '../domain/BrandName'
import { type BrandRepository } from '../domain/BrandRepository'

const brands: Brand[] = [
  // {
  //   id: 'dcdd0fad-a94c-4810-8acc-5f108d3b18c3',
  //   name: new BrandName('Hewlett-Packard')
  // },
  // {
  //   id: 'c8a7d63f-3b04-44d3-9d95-8782fd7dcfaf',
  //   name: new BrandName('Lenovo')
  // },
  // {
  //   id: '5ad1a235-0d9c-410a-b32b-220d91689a08',
  //   name: new BrandName('Wincor-Nixdorf')
  // },
  // {
  //   id: '241bf55d-b649-4109-af7c-0e6890ded3fc',
  //   name: new BrandName('Compaq')
  // }
]

export class InMemoryBrandRepository implements BrandRepository {
  async searchAll (): Promise<Brand[]> {
    return brands
  }

  async searchById (id: Uuid): Promise<Brand | null> {
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

  async remove (id: Uuid): Promise<void> {
    brands.filter(brand => brand.IdValue !== String(id))
  }
}
