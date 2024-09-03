import { Repository } from "../../../Shared/domain/Repository";
import { Primitives } from "../../../Shared/domain/value-object/Primitives";
import { Site, SitePrimitives } from "../domain/Site";
import { SiteAddress } from "../domain/SiteAddress";
import { SiteDoesNotExistError } from "../domain/SiteDoesNotExistError";
import { SiteId } from "../domain/SiteId";
import { SiteName } from "../domain/SiteName";

export class SiteUpdater {
    constructor(private readonly repository: Repository) { }

    async run({ id, params }: { id: Primitives<SiteId>, params: Partial<Omit<SitePrimitives, 'id'>> }): Promise<void> {
        const siteId = new SiteId(id).value
        const site = await this.repository.site.searchById(siteId)
        if (!site) {
            throw new SiteDoesNotExistError(id);
        }

        const siteEntity = Site.fromPrimitives(site)

        await SiteName.updateNameField({ name: params.name, entity: siteEntity })
        await SiteAddress.updateAddressField({ address: params.address, entity: siteEntity })

        await this.repository.site.save(siteEntity.toPrimitive())
    }
}