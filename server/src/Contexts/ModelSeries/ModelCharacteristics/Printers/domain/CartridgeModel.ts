import { InvalidArgumentError } from '../../../../Shared/domain/value-object/InvalidArgumentError'
import { Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { StringValueObject } from '../../../../Shared/domain/value-object/StringValueObject'

import { ModelPrinters } from './ModelPrinters'

export class CartridgeModel extends StringValueObject {
  private readonly NAME_MAX_LENGTH = 20
  private readonly NAME_MIN_LENGTH = 3

  constructor (readonly value: string) {
    super(value)

    this.ensureIsValidName(value)
  }

  toPrimitives (): string {
    return this.value
  }

  private ensureIsValidName (value: string): void {
    if (!this.isValid(value)) {
      throw new InvalidArgumentError(`<${value}> is not a valid cartridge mode`)
    }
  }

  private isValid (name: string): boolean {
    return name.length >= this.NAME_MIN_LENGTH && name.length <= this.NAME_MAX_LENGTH
  }

  static async updateDVIField(params: { cartridgeModel: Primitives<CartridgeModel>, entity: ModelPrinters }): Promise<void> {
    
    if (params.cartridgeModel === undefined) {
      return
    }
    
    if (params.entity.cartridgeModelValue === params.cartridgeModel) {
      return
    }
    
    params.entity.updateCartridgeModel(params.cartridgeModel)
  }
}
