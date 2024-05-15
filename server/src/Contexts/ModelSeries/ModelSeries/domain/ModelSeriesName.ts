import { BrandId } from '../../../Brand/domain/BrandId'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { ModelSeries, ModelSeriesPrimitives } from './ModelSeries'
import { ModelSeriesAlreadyExistError } from './ModelSeriesAlreadyExistError'
import { ModelSeriesRepository } from './ModelSeriesRepository'

export class ModelSeriesName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 2

  constructor(readonly value: string) {
    super(value)

    this.ensureIsValid(value)
  }

  toPrimitives(): Primitives<ModelSeriesName> {
    return this.value
  }

  private ensureIsValid(value: Primitives<ModelSeriesName>): void {
    if (this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid model series name`)
    }
  }

  private isValid(name: Primitives<ModelSeriesName>): boolean {
    return name.length <= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }

  static async updateNameField({ repository, name, entity }: { repository: ModelSeriesRepository, name: Primitives<ModelSeriesName>, entity: ModelSeries }): Promise<void> {
    // Si no se ha pasado un nuevo nombre no realiza ninguna acción
    if (name === undefined) {
      return
    }
    // Verifica que si el nombre actual y el nuevo nombre son iguales no realice una busqueda en el repositorio
    if (entity.nameValue === name) {
      return
    }
    const brandId = entity.brandIdValue
    // Verifica que el nombre no exista en la base de datos, si existe lanza un error {@link ModelSeriesAlreadyExistError} con el nombre pasado
    await ModelSeriesName.ensureModelNameDoesNotExist({ repository, name, brandId })
    // Actualiza el campo nomber de la entidad {@link ModelSeries} con el nuevo nombre
    entity.updateName(name)
  }

  static async ensureModelNameDoesNotExist({ repository, name, brandId }: { repository: ModelSeriesRepository, name: Primitives<ModelSeriesName>, brandId: Primitives<BrandId> }): Promise<void> {
    // Busca por un modelo con el nombre suministrador en la base de datos
    const modelSeries: ModelSeriesPrimitives | null = await repository.searchByName(name)
    // si el resultado es nulo significa que no existe por ende el nombre esta disponible
    if (modelSeries === null) {
      return
    }
    // Pueden existir dos nombres iguales siempre y cuando pertenezcan a dos marcas distintas
    if (modelSeries.brandId !== brandId) {
      return
    }
    // si el resultado es distinto de nulo significa que existe por ende el nombre no esta disponible
    throw new ModelSeriesAlreadyExistError(name)
  }
}
