import { Primitives } from "../../../Shared/domain/value-object/Primitives"
import { SiteDoesNotExistError } from "../../Site/domain/SiteDoesNotExistError"
import { SiteId } from "../../Site/domain/SiteId"
import { SiteRepository } from "../../Site/domain/SiteRepository"
import { Location } from "./Location"

export class LocationSite extends SiteId {
  static async updateSiteField ({ repository, site, entity }: { repository: SiteRepository, site?: Primitives<SiteId>, entity: Location }): Promise<void> {
    
    if (site === undefined) {
      return
    }
    
    if (entity.siteValue === site) {
      return
    }
    
    await LocationSite.ensureSiteExit({ repository, site })
    // Actualiza el campo status de la entidad {@link Device} con el nuevo status
    entity.updateSite(site)
  }

  static async ensureSiteExit ({ repository, site }: { repository: SiteRepository, site: Primitives<SiteId> }): Promise<void> {

    const isSiteExist = await repository.searchById(new SiteId(site).value)

    if (isSiteExist === null) {
      throw new SiteDoesNotExistError(site)
    }
  }
}
