
import { Repository } from '../../../Shared/domain/Repository'
import { Site, type SitePrimitives } from '../domain/Site'


export class SiteCreator {
  constructor(private readonly repository: Repository) { }

  async run(params: Omit<SitePrimitives, 'id'>): Promise<void> {

    const site = Site.create(params)

    await this.repository.site.save(site.toPrimitive())
  }

}
