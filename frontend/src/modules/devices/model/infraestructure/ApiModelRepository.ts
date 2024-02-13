import { type ModelApiresponse, type ModelMappedApiResponse } from '../../../shared/domain/types/responseTypes'
import { API_URL } from '../../../shared/infraestructure/config'
import { errorApiMessage } from '../../../shared/infraestructure/errorMessage'
import { type ModelPrimitives, type Model } from '../domain/Model'
import { type ModelId } from '../domain/ModelId'
import { type ModelName } from '../domain/ModelName'
import { type ModelRepository } from '../domain/ModelRepository'

export class ApiModelRepository implements ModelRepository {
  async save ({ model }: { model: Model }): Promise<void> {
    try {
      const { name, categoryId, brandId } = model.toPrimitives()
      const res = await fetch(`${API_URL}/models`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, categoryId, brandId })
      })

      if (!res.ok) {
        throw new Error(await res.text())
      }
    } catch (error) {
      throw new Error(errorApiMessage)
    }
  }

  async update ({ id, model }: { id: ModelId, model: Model }): Promise<void> {
    try {
      const { name, brandId, categoryId } = model.toPrimitives()
      const res = await fetch(`${API_URL}/models/${id.value}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, categoryId, brandId })
      })
      if (!res.ok) {
        throw new Error(await res.text())
      }
    } catch (error) {
      throw new Error(errorApiMessage)
    }
  }

  async getAll (): Promise<ModelPrimitives[]> {
    return await fetch(`${API_URL}/models`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(await res.text())
        }
        return await (res.json() as Promise<ModelApiresponse[]>)
      })
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
    return await fetch(`${API_URL}/models/${id.value}`).then(
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
