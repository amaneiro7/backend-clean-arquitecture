import { ValueObject } from './value-object/ValueObject'

export class DateValueObject extends ValueObject<Date> {
  toString (): string {
    return this.value.toISOString()
  }
}
