import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { sequelize } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { ComputerModels } from '../../../ModelCharacteristics/Computers/Computer/domain/ComputerModels'
import { LaptopsModels } from '../../../ModelCharacteristics/Computers/Laptops/domain/LaptopsModels'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type ModelSeriesId } from '../../domain/ModelSeriesId'
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
    let model = await ModelSeriesModel.findByPk(id) ?? null

    if (model === null) {
      model = await ModelSeriesModel.create({ id, name, categoryId, brandId })
    } else {
      model.set({ id, name, categoryId, brandId })
    }

    await model?.save()

    if (ComputerModels.isComputerCategory({ categoryId })) {
      await this.createModelComputerIfCategoryMatches(id, payload)
    }

    if (LaptopsModels.isLaptopCategory({ categoryId })) {
      await this.createModelLaptopIfCategoryMatches(id, payload)
    }
  }

  private async createModelComputerIfCategoryMatches (id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives): Promise<void> {
    await this.models.ModelComputer.create({ modelSeriesId: id, ...payload })
  }

  private async createModelLaptopIfCategoryMatches (id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives): Promise<void> {
    await this.models.ModelLaptop.create({ modelSeriesId: id, ...payload })
  }

  async remove (id: string): Promise<void> {
    await ModelSeriesModel.destroy({ where: { id } })
  }
}
