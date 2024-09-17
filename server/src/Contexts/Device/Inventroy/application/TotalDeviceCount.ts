import { Repository } from "../../../Shared/domain/Repository";

export class TotalDeviceCount {
    constructor(private readonly repository: Repository) { }

    async run(): Promise<{}> {
        return {
            totalDevices: await this.repository.dashboard.totalDevice()
        }
    }

}