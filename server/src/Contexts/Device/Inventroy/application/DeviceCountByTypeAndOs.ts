import { Repository } from "../../../Shared/domain/Repository";

export class DeviceCountByTypeOfSiteAndOperatingSystem {
    constructor(private readonly repository: Repository) { }

    async run(): Promise<{}> {
        return await this.repository.dashboard.countByTypeOfSiteAndOperatingSystem()
    }

}