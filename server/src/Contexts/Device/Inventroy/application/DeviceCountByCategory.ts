import { Repository } from "../../../Shared/domain/Repository";

export class DeviceCounByCategory {
    constructor(private readonly repository: Repository) { }

    async run(): Promise<{}> {
        return await this.repository.dashboard.countByCategory()
    }

}