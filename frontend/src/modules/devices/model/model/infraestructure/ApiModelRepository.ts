import { type ModelApiresponse, type ModelMappedApiResponse } from '../../../../shared/domain/types/responseTypes'
import { API_URL } from '../../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../../shared/infraestructure/errorMessage'
import { makeRequest } from '../../../../shared/infraestructure/fetching'
import { type ModelPrimitives, type Model } from '../domain/Model'
import { type ModelId } from '../domain/ModelId'
import { type ModelName } from '../domain/ModelName'
import { type ModelRepository } from '../domain/ModelRepository'

export class ApiModelRepository implements ModelRepository {
  private readonly endpoint:string = 'models'
  async save ({ model }: { model: Model }): Promise<void> {
    await makeRequest({ method: 'POST', endpoint: this.endpoint, data: model.toPrimitives() })
  }

  async update ({ id, model }: { id: ModelId, model: Model }): Promise<void> {
    await makeRequest({ method: 'PATCH', endpoint: `${this.endpoint}/${id.value}`, data: model.toPrimitives() }) 
  }

  async getAll (): Promise<ModelPrimitives[]> {
    return await makeRequest<ModelApiresponse[]>({ method: 'GET', endpoint: this.endpoint })
      .then(res => res.map(data => ({
        id: data.id,
        name: data.name,
        categoryId: data.category.id,
        categoryName: data.category.name,
        brandId: data.brand.id,
        brandName: data.brand.name,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
      }) satisfies ModelMappedApiResponse))
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }

  async getById ({ id }: { id: ModelId }): Promise<ModelPrimitives | null> {
    return await makeRequest({ method: 'GET', endpoint: `${this.endpoint}/${id.value}` })
  }

  async getByName ({ name }: { name: ModelName }): Promise<ModelPrimitives | null> {
    return await fetch(`${API_URL}/models/name/${name.value}`).then(
      async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<ModelPrimitives | null>)
      })
      .catch(() => {
        throw new Error(errorApiMessage)
      })
  }
}
