import { type CreateModelSeries, type ModelSeries, type UpdateModelSeries } from '../../domain/entities/modelSeries.entity'
import { type ModelSeriesRepository } from '../../domain/repositories/modelSeries.repository'
import { type Output } from '../../infrastructure/persistance/local-file-system/modelSeries'
import { type Id } from '../../types/types'

export class ModelSeriesService {
  constructor (private readonly store: ModelSeriesRepository) {}

  async getAll (): Promise<Output[]> {
    return await this.store.getAll()
  }

  async getOne ({ id }: { id: Id }): Promise<Output | undefined> {
    const data = await this.store.getOne({ id })
    if (data === undefined || data === null) {
      throw new Error('ModelSeries not Found')
    }
    return data
  }

  async create (payload: CreateModelSeries): Promise<ModelSeries> {
    // const { name } = payload
    return await this.store.create(payload)
  }

  async update (id: Id, payload: UpdateModelSeries): Promise<ModelSeries | undefined> {
    const ModelSeriesToChange = await this.store.getOne({ id })
    if (ModelSeriesToChange === undefined || ModelSeriesToChange === null) {
      throw new Error('ModelSeries not Found')
    }
    // if (!payload?.name) {
    //   throw new Error('Falta informacion')
    // }

    // if (ModelSeriesToChange.name === payload.name) {
    //   throw new Error('Sin modificar, es el mismo valor actual')
    // }
    return await this.store.update(id, payload)
  }
}
