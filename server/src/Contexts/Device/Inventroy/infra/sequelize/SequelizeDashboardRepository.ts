import { Sequelize } from "sequelize"
import { CategoryModel } from "../../../../Category/infrastructure/Sequelize/CategorySchema"
import { DashboardRepository } from "../../domain/DashboardRepository"
import { DeviceModel } from "../../../Device/infrastructure/sequelize/DeviceSchema"
import { OperatingSystemModel } from "../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/OperatingSystemSchema"
import { TypeOfSiteModel } from "../../../../Location/TypeOfSite/infrastructure/sequelize/TypeOfSiteSchema"

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
            categoryName: category.name,
            total: category.get('deviceCount')
        }))

    }

    async countByOperatingSystem() {

        const operatingSystem = await OperatingSystemModel.findAll({
            include: {
                association: 'computer',
                attributes: []
            },
            attributes: {
                include: [
                    [Sequelize.fn('COUNT', Sequelize.col('computer.id')), 'osCount']
                ]
            },
            group: ['OperatingSystemVersion.id']
        })

        return operatingSystem.map(os => ({
            operatingSystemName: os.name,
            total: os.get('osCount') as number
        })).sort((a, b) => b.total - a.total)
    }

    async countTyOfSite(): Promise<{}> {
        const typeOfSite = await TypeOfSiteModel.findAll()

        return typeOfSite
    }

}