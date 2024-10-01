import { Repository } from "../../../Shared/domain/Repository";
import { DeviceCounByCategory } from "./DeviceCountByCategory";
import { DeviceCounByOperatingSystem } from "./DeviceCountByOperatingSystem";
import { TotalDeviceCount } from "./TotalDeviceCount";

export class Dashboard {
    constructor(private readonly repository: Repository) { }

    async run(): Promise<{}> {
        return {
            totalDevices: await new TotalDeviceCount(this.repository).run(),
            countByCategory: await new DeviceCounByCategory(this.repository).run(),
            countByOperatingSystem: await new DeviceCounByOperatingSystem(this.repository).run(),
            countTyOfSite: await this.repository.dashboard.countTyOfSite()
        }
    }

}