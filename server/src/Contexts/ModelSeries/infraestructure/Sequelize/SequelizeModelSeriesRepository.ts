import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type ModelSeriesRepository } from '../../domain/ModelSeriesRepository'
import { ModelSeriesModel } from './ModelSeriesSchema'

export class SequelizeModelSeriesRepository implements ModelSeriesRepository {
  async searchAll (): Promise<ModelSeriesPrimitives[]> {
    return await ModelSeriesModel.findAll()
  }

  async searchById (id: string): Promise<ModelSeriesPrimitives | null> {
    return await ModelSeriesModel.findByPk(id) ?? null
  }

  async searchByName (name: string): Promise<ModelSeriesPrimitives | null> {
    return await ModelSeriesModel.findOne({ where: { name } }) ?? null
  }

  async save (payload: ModelSeriesPrimitives): Promise<void> {
    await ModelSeriesModel.findOrCreate({ where: { id: payload.id } })
  }

  async remove (id: string): Promise<void> {
    await ModelSeriesModel.destroy({ where: { id } })
  }
}
