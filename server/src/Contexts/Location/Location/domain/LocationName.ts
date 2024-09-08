import { Location } from './Location'
import { LocationNameAlreadyExistError } from './LocationNameAlreadyExistError'
import { InvalidArgumentError } from '../../../Shared/domain/value-object/InvalidArgumentError'
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'
import { type LocationRepository } from './LocationRepository'
import { type Primitives } from '../../../Shared/domain/value-object/Primitives'

export class LocationName extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 100
  private readonly NAME_MIN_LENGTH = 3
  private readonly regex = /^[a-zA-Z0-9()\-.,\s]*$/

  constructor(readonly value: string) {
    super(value)

    this.ensureIsValid(value)
  }

  toPrimitives(): string {
    return this.value
  }

  private ensureIsValid(value: string): void {
    if (!this.isValidLength(value)) {
      throw new InvalidArgumentError(`Este valor <${value}> no es válido, el nombre del sitio debe entre ${this.NAME_MIN_LENGTH} y ${this.NAME_MAX_LENGTH} carácteres`)
    }
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid site name`)
    }
  }

  private isValid(name: string): boolean {
    return this.regex.test(name)
  }

  private isValidLength(name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }

  static async updateNameField({ repository, name, entity }: { repository: LocationRepository, name?: Primitives<LocationName>, entity: Location }): Promise<void> {

    if (name === undefined) {
      return
    }

    if (entity.nameValue === name) {
      return
    }

    await LocationName.ensureNameDoesNotExit({ repository, name })

    entity.updateLocationName(name)
  }

  static async ensureNameDoesNotExit({ repository, name }: { repository: LocationRepository, name: Primitives<LocationName> }): Promise<void> {

    if (name === null) {
      return
    }

    const isExist = await repository.searchByName(name)


    if (isExist !== null) {
      throw new LocationNameAlreadyExistError(name)
    }
  }
}
