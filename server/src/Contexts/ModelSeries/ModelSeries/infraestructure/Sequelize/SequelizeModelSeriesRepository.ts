import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type ModelSeriesRepository } from '../../domain/ModelSeriesRepository'
import { ModelSeriesModel } from './ModelSeriesSchema'

export class SequelizeModelSeriesRepository implements ModelSeriesRepository {
  async searchAll (): Promise<ModelSeriesPrimitives[]> {
    return await ModelSeriesModel.findAll({ include: ['category', 'brand'] })
  }

  async searchById (id: string): Promise<ModelSeriesPrimitives | null> {
    return await ModelSeriesModel.findByPk(id, {
      include: ['category', 'brand']
    }) ?? null
  }

  async searchByCategory (categoryId: number): Promise<ModelSeriesPrimitives[]> {
    return await ModelSeriesModel.findAll(
      {
        where: { categoryId },
        include: ['category', 'brand']
      })
  }

  async searchByName (name: string): Promise<ModelSeriesPrimitives | null> {
    return await ModelSeriesModel.findOne(
      {
        where: { name },
        include: ['category', 'brand']
      }) ?? null
  }

  async save (payload: ModelSeriesPrimitives): Promise<void> {
    const { id } = payload
    const model = await ModelSeriesModel.findByPk(id) ?? null
    if (model === null) {
      await ModelSeriesModel.create({ ...payload })
    } else {
      model.set({ ...payload })
      await model.save()
    }
  }

  async remove (id: string): Promise<void> {
    await ModelSeriesModel.destroy({ where: { id } })
  }
}
