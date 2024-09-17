import { CategoryOptions } from "../../../../Category/domain/CategoryDefaultData"
import { DeviceModel } from "../../../Device/infrastructure/sequelize/DeviceSchema"
import { DashboardRepository } from "../../domain/DashboardRepository"

export class SequelizeDashboardRepository implements DashboardRepository {
    async countByCategory(): Promise<{
        totalDevice: number
        totalComputers: {
            total: number
            computers: number
            servers: number
            allInOne: number
            laptops: number
        }
        monitors: number
    }> {
        const [laptops, computers, servers, allInOne, monitors] = await Promise.all([
            DeviceModel.count({ where: { categoryId: CategoryOptions.LAPTOP } }),
            DeviceModel.count({ where: { categoryId: CategoryOptions.COMPUTER } }),
            DeviceModel.count({ where: { categoryId: CategoryOptions.SERVER } }),
            DeviceModel.count({ where: { categoryId: CategoryOptions.ALLINONE } }),
            DeviceModel.count({ where: { categoryId: CategoryOptions.MONITOR } }),
        ])

        return {
            totalDevice: laptops + computers + servers + allInOne + monitors,
            totalComputers: {
                total: computers + servers + allInOne + laptops,
                computers,
                servers,
                allInOne,
                laptops
            },
            monitors,
        }
    }


}