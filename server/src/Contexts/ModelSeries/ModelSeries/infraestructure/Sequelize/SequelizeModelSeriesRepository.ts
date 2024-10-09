import { sequelize } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig'
import { Criteria } from '../../../../Shared/domain/criteria/Criteria'
import { CriteriaToSequelizeConverter } from '../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'
import { type Transaction } from 'sequelize'
import { type CategoryId } from '../../../../Category/domain/CategoryId'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type Models } from '../../../../Shared/infrastructure/persistance/Sequelize/SequelizeRepository'
import { type ModelSeriesPrimitives } from '../../domain/ModelSeries'
import { type ModelSeriesId } from '../../domain/ModelSeriesId'
import { type ModelSeriesRepository } from '../../domain/ModelSeriesRepository'
import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { ComputerModels } from '../../../ModelCharacteristics/Computers/Computer/domain/ComputerModels'
import { LaptopsModels } from '../../../ModelCharacteristics/Computers/Laptops/domain/LaptopsModels'
import { MonitorModels } from '../../../ModelCharacteristics/Monitors/domain/MonitorModels'
import { ModelPrinters } from '../../../ModelCharacteristics/Printers/domain/ModelPrinters'
import { ModelAssociation } from './ModelAssociation'
import { ModelSeriesModel } from './ModelSeriesSchema'
import { KeyboardModels } from '../../../ModelCharacteristics/Keyboards/domain/KeyboadModels'
import { MouseModels } from '../../../ModelCharacteristics/Mouses/domain/MouseModels'

export class SequelizeModelSeriesRepository extends CriteriaToSequelizeConverter implements ModelSeriesRepository {
  private readonly models = sequelize.models as unknown as Models
  private readonly cacheKey: string = 'modelSeries'
  constructor(private readonly cache: CacheRepository) {
    super()
  }
  async searchAll(): Promise<ModelSeriesPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    }

    const result = await ModelSeriesModel.findAll({
      include: [
        'category',
        'brand',
        'modelPrinter',
        'modelMonitor',
        { association: 'modelLaptop', include: ['memoryRamType'] },
        { association: 'modelComputer', include: ['memoryRamType'] },
        { association: 'modelKeyboard', include: ['inputType'] }
      ]
    })
    await this.cache.set(this.cacheKey, JSON.stringify(result))
    return result
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
    const t = await sequelize.transaction()
    try {
      const { id, name, categoryId, brandId, generic } = payload
      const model = await ModelSeriesModel.findByPk(id) ?? null

      if (model === null) {
        await ModelSeriesModel.create({ id, name, categoryId, brandId, generic })
      } else {
        await ModelSeriesModel.update(
          { name, categoryId, brandId },
          {
            where: { id },
            transaction: t
          }
        )
      }

      if (ComputerModels.isComputerCategory({ categoryId })) {
        await this.createModelComputerIfCategoryMatches(id, payload, t)
      }

      if (LaptopsModels.isLaptopCategory({ categoryId })) {
        await this.createModelLaptopIfCategoryMatches(id, payload, t)
      }

      if (MonitorModels.isMonitorCategory({ categoryId })) {
        await this.createModelMonitorIfCategoryMatches(id, payload, t)
      }

      if (ModelPrinters.isPrinterCategory({ categoryId })) {
        await this.createModelPrinterIfCategoryMatches(id, payload, t)
      }
      if (KeyboardModels.isKeyboardCategory({ categoryId })) {
        await this.createModelKeyboardIfCategoryMatches(id, payload, t)
      }

      if (MouseModels.isMouseCategory({ categoryId })) {
        await this.createModelMouseIfCategoryMatches(id, payload, t)
      }
      await t.commit()
      await this.cache.del(this.cacheKey)
      await this.searchAll()
    } catch (error: any) {
      await t.rollback()
      throw new Error(error)
    }
  }

  private async createModelComputerIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives, transaction: Transaction): Promise<void> {
    const modelComputer = await this.models.ModelComputer.findByPk(id) ?? null
    if (modelComputer === null) {
      await this.models.ModelComputer.create({ modelSeriesId: id, ...payload })
    } else {
      await this.models.ModelComputer.update(
        { ...payload },
        {
          where: { id },
          transaction
        }
      )
    }
  }

  private async createModelLaptopIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives, transaction: Transaction): Promise<void> {
    const modelLaptop = await this.models.ModelLaptop.findByPk(id) ?? null
    if (modelLaptop === null) {
      await this.models.ModelLaptop.create({ modelSeriesId: id, ...payload })
    } else {
      await this.models.ModelLaptop.update(
        { ...payload },
        {
          where: { id },
          transaction
        }
      )
    }
  }

  private async createModelMonitorIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives, transaction: Transaction): Promise<void> {
    const modelMonitor = await this.models.ModelMonitor.findByPk(id) ?? null
    if (modelMonitor === null) {
      await this.models.ModelMonitor.create({ modelSeriesId: id, ...payload })
    } else {
      await this.models.ModelMonitor.update(
        { ...payload },
        {
          where: { id },
          transaction
        }
      )
    }
  }

  private async createModelPrinterIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives, transaction: Transaction): Promise<void> {
    const modelPrinter = await this.models.ModelPrinter.findByPk(id) ?? null
    if (modelPrinter === null) {
      await this.models.ModelPrinter.create({ modelSeriesId: id, ...payload })
    } else {
      await this.models.ModelPrinter.update(
        { ...payload },
        {
          where: { id },
          transaction
        }
      )
    }
  }
  private async createModelKeyboardIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives, transaction: Transaction): Promise<void> {
    const modelKeyboard = await this.models.ModelKeyboard.findByPk(id) ?? null
    if (modelKeyboard === null) {
      await this.models.ModelKeyboard.create({ modelSeriesId: id, ...payload })
    } else {
      await this.models.ModelKeyboard.update(
        { ...payload },
        {
          where: { id },
          transaction
        }
      )
    }
  }
  private async createModelMouseIfCategoryMatches(id: Primitives<ModelSeriesId>, payload: ModelSeriesPrimitives, transaction: Transaction): Promise<void> {
    const modelMouse = await this.models.ModelMouse.findByPk(id) ?? null
    if (modelMouse === null) {
      await this.models.ModelMouse.create({ modelSeriesId: id, ...payload })
    } else {
      await this.models.ModelMouse.update(
        { ...payload },
        {
          where: { id },
          transaction
        }
      )
    }
  }

  async remove(id: string): Promise<void> {
    await ModelSeriesModel.destroy({ where: { id } })
    await this.cache.del(this.cacheKey)
    await this.searchAll()
  }
}
