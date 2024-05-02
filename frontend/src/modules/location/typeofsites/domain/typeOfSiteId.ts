import { StringValueObject } from "../../../shared/domain/value-object/StringValueObject";

export class TypeOfSiteId extends StringValueObject {
  static readonly SitesOptions = {
    ADMINISTRATIVE: '1',
    AGENCY: '2',
    ALMACEN: '3',    
  } as const
}
