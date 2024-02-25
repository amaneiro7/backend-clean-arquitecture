import { sequelize } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { ComputerModels } from '../../../ModelCharacteristics/Computers/domain/ComputerModels'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type ModelSeriesRepository } from '../../domain/ModelSeriesRepository'
import { ModelSeriesModel } from './ModelSeriesSchema'

export class SequelizeModelSeriesRepository implements ModelSeriesRepository {
  private readonly models = sequelize.models as unknown as Models
  async searchAll (): Promise<ModelSeriesPrimitives[]> {
    return await ModelSeriesModel.findAll({ include: ['category', 'brand', 'modelComputer'] })
  }

  async searchById (id: string): Promise<ModelSeriesPrimitives | null> {
    return await ModelSeriesModel.findByPk(id, {
      include: ['category', 'brand', 'modelComputer']
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
    const { id, name, categoryId, brandId } = payload
    const model = await ModelSeriesModel.findByPk(id) ?? null
    if (model === null) {
      await ModelSeriesModel.create({ id, name, categoryId, brandId })
      if (ComputerModels.isComputerCategory({ categoryId })) {
        await this.models.ModelComputer.create({ modelSeriesId: id, ...payload })
      }
    } else {
      model.set({ id, name, categoryId, brandId })
      await model.save()
    }
  }

  async remove (id: string): Promise<void> {
    await ModelSeriesModel.destroy({ where: { id } })
  }
}
