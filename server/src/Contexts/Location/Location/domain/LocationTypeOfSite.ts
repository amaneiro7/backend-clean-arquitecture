import { Primitives } from "../../../Shared/domain/value-object/Primitives"
import { TypeOfSiteDoesNotExistError } from "../../TypeOfSite/domain/TypeOfSiteDoesNotExistError"
import { TypeOfSiteId } from "../../TypeOfSite/domain/TypeOfSiteId"
import { TypeOfSiteRepository } from "../../TypeOfSite/domain/TypeOfSiteRepository"
import { Location } from "./Location"


export class LocationTypeOfSite extends TypeOfSiteId {
  static async updateTypeOfSiteField ({ repository, typeOfSite, entity }: { repository: TypeOfSiteRepository, typeOfSite?: Primitives<TypeOfSiteId>, entity: Location }): Promise<void> {
    
    if (typeOfSite === undefined) {
      return
    }
    
    if (entity.typeOfSiteValue === typeOfSite) {
      return
    }
    
    await LocationTypeOfSite.ensureTypeOfSiteExit({ repository, typeOfSite })
    
    entity.updateTypeOfSite(typeOfSite)
  }

  static async ensureTypeOfSiteExit ({ repository, typeOfSite }: { repository: TypeOfSiteRepository, typeOfSite: Primitives<TypeOfSiteId> }): Promise<void> {

    const isExist = await repository.searchById(new TypeOfSiteId(typeOfSite).value)

    if (isExist === null) {
      throw new TypeOfSiteDoesNotExistError(typeOfSite)
    }
  }
}
