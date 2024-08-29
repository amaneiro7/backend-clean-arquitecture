import { type BrandId } from '../../../Brand/domain/BrandId'
import { type CategoryId } from '../../../Category/domain/CategoryId'
import { type ModelSeriesPrimitives } from '../../../ModelSeries/ModelSeries/domain/ModelSeries'
import { ModelSeriesDoesNotExistError } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesDoesNotExistError'
import { ModelSeriesId } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesId'
import { type ModelSeriesRepository } from '../../../ModelSeries/ModelSeries/domain/ModelSeriesRepository'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'
import { type Device } from './Device'

export class DeviceModelSeries extends ModelSeriesId {
  static async updateModelField({
    repository,
    modelSeries,
    category,
    brand,
    entity
  }: {
    repository: ModelSeriesRepository
    modelSeries?: Primitives<ModelSeriesId>
    category?: Primitives<CategoryId>
    brand?: Primitives<BrandId>
    entity: Device
  }): Promise<void> {
    // Si no se ha pasado un nuevo model no realiza ninguna acción
    if (modelSeries === undefined) {
      return
    }
    // Verifica que si el model actual y el nuevo model son iguales no realice una busqueda en el repositorio
    if (entity.modelSeriesValue === modelSeries) {
      return
    }
    // Verifica que el model no exista en la base de datos, si existe lanza un error {@link DeviceAlreadyExistError} con el model pasado
    const { brandId, categoryId, generic } = await DeviceModelSeries.ensureModelSeriesExit({ repository, modelSeries, category, brand })
    // Actualiza el campo model de la entidad {@link Device} con el nuevo model
    entity.updateCategoryId(categoryId)
    entity.updateBrandId(brandId)
    entity.updateModelId(modelSeries)
  }

  static async ensureModelSeriesExit({
    repository,
    modelSeries,
    category,
    brand
  }: {
    repository: ModelSeriesRepository
    modelSeries: Primitives<ModelSeriesId>
    category?: Primitives<CategoryId>
    brand?: Primitives<BrandId>
  }): Promise<ModelSeriesPrimitives> {
    // Searches for a device with the given model in the database
    const deviceWithModel: ModelSeriesPrimitives | null = await repository.searchById(new ModelSeriesId(modelSeries).toString())
    // If a device with the given model exists, it means that it already exists in the database,
    // so we need to throw a {@link DeviceAlreadyExistError} with the given model
    if (deviceWithModel === null) {
      throw new ModelSeriesDoesNotExistError(modelSeries)
    }
    const { brandId, categoryId } = deviceWithModel
    if (brandId !== brand || categoryId !== category) {
      throw new InvalidArgumentError('the category and branch do not match for this model.')
    }
    return deviceWithModel
  }
}
