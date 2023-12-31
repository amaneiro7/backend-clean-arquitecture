import { notFound } from '@hapi/boom'
import { type ModelSeriesOutput, type CreateModelSeries, type UpdateModelSeries } from '../../domain/entities/modelSeries.entity'
import { type Id } from '../../types/types'
import { type ModelRepositotoryInterface } from '../../infrastructure/persistance/local-file-system/modelSeries'

export class ModelSeriesService {
  constructor (private readonly store: ModelRepositotoryInterface) {}

  async getAll (): Promise<ModelSeriesOutput[]> {
    return await this.store.getAll.exec()
  }

  async getOne ({ id }: { id: Id }): Promise<ModelSeriesOutput | undefined> {
    const data = await this.store.getById.exec({ id })
    if (data === undefined || data === null) {
      throw notFound('Modelo no encontrado')
    }
    return data
  }

  async create (payload: CreateModelSeries): Promise<ModelSeriesOutput> {
    // const { name } = payload
    return await this.store.create.exec(payload)
  }

  async update (id: Id, payload: UpdateModelSeries): Promise<ModelSeriesOutput | undefined> {
    const ModelSeriesToChange = await this.store.getById.exec({ id })
    if (ModelSeriesToChange === undefined || ModelSeriesToChange === null) {
      throw notFound('Modelo no encontrado')
    }
    // if (!payload?.name) {
    //   throw new Error('Falta informacion')
    // }

    // if (ModelSeriesToChange.name === payload.name) {
    //   throw new Error('Sin modificar, es el mismo valor actual')
    // }
    return await this.store.update.exec(id, payload)
  }
}
