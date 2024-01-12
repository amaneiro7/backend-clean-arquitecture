/* eslint-disable @typescript-eslint/no-useless-constructor */
import { StringValueObject } from '../StringValueObject'

export class OrderBy extends StringValueObject {
  constructor (value: string) {
    super(value)
  }
}
