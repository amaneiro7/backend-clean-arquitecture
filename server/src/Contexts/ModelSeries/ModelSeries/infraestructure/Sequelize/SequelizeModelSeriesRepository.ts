import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { Criteria } from '../../../../Shared/domain/criteria/Criteria'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { CriteriaToSequelizeConverter } from '../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'
import { sequelize } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { ComputerModels } from '../../../ModelCharacteristics/Computers/Computer/domain/ComputerModels'
import { LaptopsModels } from '../../../ModelCharacteristics/Computers/Laptops/domain/LaptopsModels'
import { MonitorModels } from '../../../ModelCharacteristics/Monitors/domain/MonitorModels'
import { ModelPrinters } from '../../../ModelCharacteristics/Printers/domain/ModelPrinters'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type ModelSeriesId } from '../../domain/ModelSeriesId'
import { type ModelSeriesRepository } from '../../domain/ModelSeriesRepository'
import { ModelAssociation } from './ModelAssociation'
import { ModelSeriesModel } from './ModelSeriesSchema'

export class SequelizeModelSeriesRepository extends CriteriaToSequelizeConverter implements ModelSeriesRepository {
  private readonly models = sequelize.models as unknown as Models
  async searchAll(): Promise<ModelSeriesPrimitives[]> {
    return await ModelSeriesModel.findAll()
  }

  async matching(criteria: Criteria): Promise<ModelSeriesPrimitives[]> {
    const options = this.convert(criteria)
    const locationOption = new ModelAssociation().convertFilterLocation(criteria, options)
   
    return await ModelSeriesModel.findAll(locationOption)
  }

  async searchById(id: string): Promise<ModelSeriesPrimitives | null> {
    return await ModelSeriesModel.findByPk(id, {
      include: ['category', 'brand', 'modelComputer', 'modelLaptop', 'modelMonitor', 'modelPrinter', 'modelKeyboard']
    }) ?? null
  }

  async searchByCategory(categoryId: Primitives<CategoryId>): Promise<ModelSeriesPrimitives[]> {
    return await ModelSeriesModel.findAll(
      {
        where: { categoryId },
        include: ['category', 'brand']
      })
  }

  async searchByName(name: string): Promise<ModelSeriesPrimitives | null> {
    return await ModelSeriesModel.findOne(
      {
        where: { name },
        include: ['category', 'brand']
      }) ?? null
  }

  async save(payload: ModelSeriesPrimitives): Promise<void> {
    const { id, name, categoryId, brandId } = payload
    const model = await ModelSeriesModel.findByPk(id) ?? null

    if (model === null) {
      await ModelSeriesModel.create({ id, name, categoryId, brandId })
    } else {
      model.set({ id, name, categoryId, brandId })
      await model.save()
    }

    if (ComputerModels.isComputerCategory({ categoryId })) {
      await this.createModelComputerIfCategoryMatches(id, payload)
    }

    if (LaptopsModels.isLaptopCategory({ categoryId })) {
      await this.createModelLaptopIfCategoryMatches(id, payload)
    }

    if (MonitorModels.isMonitorCategory({ categoryId })) {
      await this.createModelMonitorIfCategoryMatches(id, payload)
    }

    if (ModelPrinters.isPrinterCategory({ categoryId })) {
      await this.createModelPrinterIfCategoryMatches(id, payload)
    }
  }

  private async createModelComputerIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives): Promise<void> {
    await this.models.ModelComputer.create({ modelSeriesId: id, ...payload })
  }

  private async createModelLaptopIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives): Promise<void> {
    await this.models.ModelLaptop.create({ modelSeriesId: id, ...payload })
  }

  private async createModelMonitorIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives): Promise<void> {
    await this.models.ModelMonitor.create({ modelSeriesId: id, ...payload })
  }

  private async createModelPrinterIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives): Promise<void> {
    await this.models.ModelPrinter.create({ modelSeriesId: id, ...payload })
  }

  async remove(id: string): Promise<void> {
    await ModelSeriesModel.destroy({ where: { id } })
  }
}
