import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type GerenciaPrimitives } from '../domain/gerencia'
import { type GerenciaRepository } from '../domain/gerenciaRepository'

export class ApiGerenciaRepository implements GerenciaRepository {
  private readonly endpoint: string = 'gerencias'
  async getAll (): Promise<GerenciaPrimitives[]> {
    return await makeRequest({ method: 'GET', endpoint: this.endpoint })      
  }  
}
