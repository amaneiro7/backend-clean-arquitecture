import { type TypeOfSitePrimitives } from '../domain/typeOfSite'
import { type TypeOfSiteRepository } from '../domain/typeOfSiteRepository'
import { makeRequest } from '../../../shared/infraestructure/fetching'

export class ApiTypeOfSiteRepository implements TypeOfSiteRepository {
  private readonly endpoint: string = 'typeofsites'
  async getAll (): Promise<TypeOfSitePrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })      
  }
}
