import { StringValueObject } from '../../../../shared/domain/value-object/StringValueObject'

export class StatusId extends StringValueObject {
  static readonly StatusOptions = {
    INUSE: '1',
    INALMACEN: '2',
    PORDESINCORPORAR: '3',
    DESINCORPORADO: '4'
  } as const
}
