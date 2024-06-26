import { Criteria } from '../../../../shared/domain/criteria/Criteria'
import { type ModelApiresponse } from '../../../../shared/domain/types/responseTypes'
import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type ModelPrimitives, type Model } from '../domain/Model'
import { type ModelId } from '../domain/ModelId'
import { type ModelRepository } from '../domain/ModelRepository'

export class ApiModelRepository implements ModelRepository {
  private readonly endpoint:string = 'models'
  async save ({ model }: { model: Model }): Promise<void> {    
    return await makeRequest({ method: 'POST', endpoint: this.endpoint, data: model.toPrimitives() })
  }

  async update ({ id, model }: { id: ModelId, model: Model }): Promise<void> {
    return await makeRequest({ method: 'PATCH', endpoint: `${this.endpoint}/${id.value}`, data: model.toPrimitives() }) 
  }

  async getAll (): Promise<ModelPrimitives[]> {
    return await makeRequest<ModelApiresponse[]>({ method: 'GET', endpoint: `${this.endpoint}/all`})
  }

  async getByCriteria(criteria: Criteria): Promise<ModelPrimitives[]> {
    const criteriaPrimitives = criteria.toPrimitives()

    const queryParams = criteria.buildQuery(criteriaPrimitives)
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}?${queryParams}` })
  }

  async getById ({ id }: { id: ModelId }): Promise<ModelPrimitives | null> {
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })
  }
}
