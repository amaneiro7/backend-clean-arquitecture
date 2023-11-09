import { notFound } from '@hapi/boom'
import { type ModelSeriesOutout, type CreateModelSeries, type UpdateModelSeries } from '../../domain/entities/modelSeries.entity'
import { type ModelSeriesRepository } from '../../domain/repositories/modelSeries.repository'
import { type Id } from '../../types/types'

export class ModelSeriesService {
  constructor (private readonly store: ModelSeriesRepository) {}

  async getAll (): Promise<ModelSeriesOutout[]> {
    return await this.store.getAll()
  }

  async getOne ({ id }: { id: Id }): Promise<ModelSeriesOutout | undefined> {
    const data = await this.store.getOne({ id })
    if (data === undefined || data === null) {
      throw notFound('Modelo no encontrado')
    }
    return data
  }

  async create (payload: CreateModelSeries): Promise<ModelSeriesOutout> {
    // const { name } = payload
    return await this.store.create(payload)
  }

  async update (id: Id, payload: UpdateModelSeries): Promise<ModelSeriesOutout | undefined> {
    const ModelSeriesToChange = await this.store.getOne({ id })
    if (ModelSeriesToChange === undefined || ModelSeriesToChange === null) {
      throw notFound('Modelo no encontrado')
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
