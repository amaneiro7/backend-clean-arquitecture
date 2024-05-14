import { makeRequest } from '../../../shared/infraestructure/fetching'
import { type BrandPrimitives, type Brand } from '../domain/Brand'
import { type BrandId } from '../domain/BrandId'
import { type BrandRepository } from '../domain/BrandRepository'

export class ApiBrandRepository implements BrandRepository {
  private readonly endpoint: string = 'brands'
  async save ({ brand }: { brand: Brand }): Promise<void> {
    return await makeRequest({ method: 'POST', endpoint: this.endpoint, data: brand.toPrimitives() })    
  }
  
  async update ({ id, brand }: { id: BrandId, brand: Brand }): Promise<void> {
    return await makeRequest({ method: 'PATCH', endpoint: `${this.endpoint}/${id.value}`, data: brand.toPrimitives() })        
  }
  
  async getAll (): Promise<BrandPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })    
  }
  
  async getById ({ id }: { id: BrandId }): Promise<BrandPrimitives | null> {
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })            
  }
}
