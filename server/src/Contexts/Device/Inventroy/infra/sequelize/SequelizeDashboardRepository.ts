import { Sequelize } from "sequelize"
import { CategoryModel } from "../../../../Category/infrastructure/Sequelize/CategorySchema"
import { DashboardRepository } from "../../domain/DashboardRepository"
import { DeviceModel } from "../../../Device/infrastructure/sequelize/DeviceSchema"

export class SequelizeDashboardRepository implements DashboardRepository {
    async totalDevice(): Promise<{}> {
        return DeviceModel.count()
    }
    async countByCategory() {

        const categories = await CategoryModel.findAll({
            include: {
                association: 'device',
                attributes: []
            },
            attributes: {
                include: [
                    [Sequelize.fn('COUNT', Sequelize.col('device.id')), 'deviceCount']
                ]
            },
            group: ['Category.id']
        })



        return categories.map(category => ({
            [category.name]: category.get('deviceCount')
        }))

    }

}