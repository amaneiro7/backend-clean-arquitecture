import { Sequelize } from "sequelize"
import { CategoryModel } from "../../../../Category/SubCategory/infrastructure/Sequelize/CategorySchema"
import { DashboardRepository } from "../../domain/DashboardRepository"
import { DeviceModel } from "../../../Device/infrastructure/sequelize/DeviceSchema"
import { OperatingSystemModel } from "../../../../Features/OperatingSystem/OperatingSystem/infraesructure/sequelize/OperatingSystemSchema"
import { TypeOfSiteModel } from "../../../../Location/TypeOfSite/infrastructure/sequelize/TypeOfSiteSchema"
import { DeviceComputerModel } from "../../../../Features/Computer/infraestructure/sequelize/DeviceComputerSchema"
import { sequelize } from "../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig"
import { LocationModel } from "../../../../Location/Location/infrastructure/sequelize/LocationSchema"
import { TypeOfSiteId } from "../../../../Location/TypeOfSite/domain/TypeOfSiteId"
import { type CacheRepository } from "../../../../Shared/domain/CacheRepository"

export class SequelizeDashboardRepository implements DashboardRepository {
    private readonly cacheKey: string = 'dashboard'
    constructor(private readonly cache: CacheRepository) { }
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

    async countByOperatingSystem(): Promise<any[]> {
        const results = await OperatingSystemModel.findAll({
            include: {
                association: 'computer',
                attributes: [],
            },
            attributes: {
                include: [
                    [Sequelize.fn('Count', Sequelize.col('computer.id')), 'totalComputer']
                ]
            },
            group: ['OperatingSystemVersion.id']
        });

        const operatingSystemIds = results.map(result => result.id);

        // const countByAgency = await DeviceModel.findAndCountAll({
        //     attributes: [],
        //     include: [
        //         {
        //             association: 'computer', 
        //             where: { operatingSystemId: operatingSystemIds }
        //         },
        //         {
        //             association: 'location',
        //             attributes: ['typeOfSiteId'],
        //             where: { typeOfSiteId: TypeOfSiteId.TypeOfSiteOptions.AGENCIA },
        //             include: [
        //                 {
        //                     association: 'typeOfSite',
        //                     attributes: ['name']
        //                 }
        //             ]
        //         }
        //     ]
        // });

        const countByAdministrativeSite = await DeviceComputerModel.findAll({
            include: [
                {
                    association: 'device',
                    include: [
                        {
                            association: 'location',
                            where: { typeOfSiteId: TypeOfSiteId.TypeOfSiteOptions.TORRE }
                        }
                    ]
                }
            ]
            // include: [
            //     {
            //         association: 'device',
            //         include: [
            //             {
            //                 association: 'location',
            //                 where: { typeOfSiteId: TypeOfSiteId.TypeOfSiteOptions.TORRE },
            //                 // attributes: ['name'],
            //             }

            //         ],
            //         // attributes: []
            //     },
            //     {
            //         association: 'operatingSystem',
            //         // attributes: []
            //     }
            // ],
            // attributes: [
            //     [sequelize.fn('COUNT', sequelize.col('DeviceComputer.id')), 'totalComputer'],
            //     [sequelize.col('operatingSystem.name'), 'operatingSystemName']
            // ],
            // group: ['operatingSystem.id']
        })
        // const countByAdministrativeSite = await DeviceModel.findAll({
        //     // attributes: [
        //     //     [sequelize.literal('Count(*)'), 'count']
        //     // ],
        //     include: [
        //         {
        //             association: 'computer',
        //             attributes: []
        //         },
        //         {
        //             association: 'location',
        //             attributes: [],
        //             where: { typeOfSiteId: TypeOfSiteId.TypeOfSiteOptions.TORRE },
        //         }
        //     ],
        //     attributes: {
        //         include: [
        //             [sequelize.fn('Count', sequelize.col('computer.operatingSystemId')), 'n_operatingSsystem']
        //         ]
        //     },
        //     group: ['Device.id']
        // })

        // const finalResults = results.map((result, index) => ({
        //     operatingSystemName: result.name,
        //     total: result.get('totalComputer'),
        //     // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     // // @ts-expect-error   
        //     // agency: countByAgency,
        //     //// eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //     //// @ts-expect-error   
        //     administrativeSite: countByAdministrativeSite
        // }))

        // return finalResults;
        return countByAdministrativeSite
    }

    async countTypeOfSite(): Promise<{}> {
        return await TypeOfSiteModel.findAndCountAll()


    }

    async countByTypeOfSiteAndOperatingSystem(): Promise<{}> {
        const result = await DeviceComputerModel.findAll({
            attributes: [
                [Sequelize.col('operatingSystem.name'), 'operatingSystemName'],
                [Sequelize.fn('Count', sequelize.col('DeviceComputer.id')), 'total']
            ],
            include: [
                {
                    association: 'device',
                    attributes: [],
                    include: [{
                        association: 'location',
                        attributes: ['typeOfSiteId', 'name']
                    }]
                },
                {
                    association: 'operatingSystem',
                    attributes: ['name']
                }
            ],
            group: ['device.location.id', 'device.location.name', 'operatingSystem.id']
        })

        return result
    }

}