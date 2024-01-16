import { type Brand } from '../../domain/Brand'

interface BrandResponse {
  id: string
  name: string
}

export class BrandsResponse {
  public readonly results: BrandResponse[]
  constructor (results: Brand[]) {
    this.results = results.map(brand => brand.toPrimitive())
  }
}
