import { models } from '../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type ModelSeriesRepository } from '../../domain/ModelSeriesRepository'

export class SequelizeModelSeriesRepository implements ModelSeriesRepository {
  async searchAll (): Promise<ModelSeriesPrimitives[]> {
    return await models.Model.findAll({ include: ['category', 'brand'] })
  }

  async searchById (id: string): Promise<ModelSeriesPrimitives | null> {
    return await models.Model.findByPk(id, {
      include: ['category', 'brand']
    }) ?? null
  }

  async searchByName (name: string): Promise<ModelSeriesPrimitives | null> {
    return await models.Model.findOne(
      {
        where: { name },
        include: ['category', 'brand']
      }) ?? null
  }

  async save (payload: ModelSeriesPrimitives): Promise<void> {
    const { id } = payload
    const model = await models.Model.findByPk(id) ?? null
    if (model === null) {
      await models.Model.create({ ...payload })
    } else {
      model.set({ ...payload })
      await model.save()
    }
  }

  async remove (id: string): Promise<void> {
    await models.Model.destroy({ where: { id } })
  }
}
