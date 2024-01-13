import { type Brand } from '../../domain/Brand'

interface BrandResponse {
  id: string
  name: string
}

export class BrandsResponse {
  public readonly brands: BrandResponse[]
  constructor (brands: Brand[]) {
    this.brands = brands.map(brand => brand.toPrimitive())
  }
}
