import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject'

export class TypeOfSiteId extends StringValueObject {
  static readonly TypeOfSiteOptions = {
    TORRE: '1',
    AGENCIA: '2',
    ALMACEN: '3'
  }
}
