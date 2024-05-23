import { Filter } from '../../../Shared/domain/criteria/Filter'
import { FilterField } from '../../../Shared/domain/criteria/FilterField'
import { FilterOperator, Operator } from '../../../Shared/domain/criteria/FilterOperator'
import { FilterValue } from '../../../Shared/domain/criteria/FilterValue'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { Location } from './Location'
import { LocationNameAlreadyExistError } from './LocationNameAlreadyExistError'
import { LocationRepository } from './LocationRepository'

export class LocationName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 15

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidSerial(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidSerial (value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`Este valor <${value}> no es válido, el nombre del sitio debe entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} carácteres`)
    }
  }

  private isValid (name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }

  static async updateNameField ({ repository, name, entity }: { repository: LocationRepository, name?: Primitives<LocationName>, entity: Location }): Promise<void> {
    
    if (name === undefined) {
      return
    }
    
    if (entity.nameValue === name) {
      return
    }
    
    await LocationName.ensureNameDoesNotExit({ repository, name })
    
    entity.updateLocationName(name)
  }

  static async ensureNameDoesNotExit ({ repository, name }: { repository: LocationRepository, name: Primitives<LocationName> }): Promise<void> {
    
    if (name === null) {
      return
    }

    const isExist = await repository.searchByName(name)
    
    
    if (isExist !== null) {
      throw new LocationNameAlreadyExistError(name)
    }
  }
}
