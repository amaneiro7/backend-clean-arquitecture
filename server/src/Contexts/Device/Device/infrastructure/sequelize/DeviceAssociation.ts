import { type FindOptions } from "sequelize";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";
import { sequelize } from "../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig";
import { MainCategoryList } from "../../../../Category/Category/domain/MainCategory";

export class DeviceAssociation {
    convertFilterLocation(criteria: Criteria, options: FindOptions): FindOptions {

        const mainCategoryId = criteria.obtainFilterValue('mainCategoryId') ?? []

        options.include = [
            {
                association: 'model', // 0
                include: [
                    {
                        association: 'modelComputer', // 0 - 0
                        include: ['memoryRamType'],
                        attributes: [
                            'memoryRamTypeId',
                            'memoryRamSlotQuantity',
                            'hasBluetooth',
                            'hasWifiAdapter',
                            'hasDVI',
                            'hasHDMI',
                            'hasVGA'
                        ]
                    },
                    {
                        association: 'modelLaptop', // 0 - 1
                        include: ['memoryRamType'],
                        attributes: [
                            'memoryRamTypeId',
                            'memoryRamSlotQuantity',
                            'hasBluetooth',
                            'hasWifiAdapter',
                            'hasDVI',
                            'hasHDMI',
                            'hasVGA',
                            'batteryModel'
                        ]
                    },
                    {
                        association: 'modelMonitor', // 0 - 2
                        attributes: ["screenSize", "hasDVI", "hasHDMI", "hasVGA"]
                    },
                    {
                        association: 'modelPrinter', // 0 - 3
                        attributes: ["cartridgeModel"]
                    },
                    {
                        association: 'modelKeyboard', // 0 - 4
                        include: ['inputType'],
                        attributes: ["inputTypeId", "hasFingerPrintReader"]
                    },
                    {
                        association: 'modelMouse', // 0 - 5
                        include: ['inputType'],
                        attributes: ["inputTypeId"]
                    },
                ],
                attributes: ['name', 'categoryId', 'brandId', 'generic']
            },
            {
                association: 'category', // 1                
                include: ['mainCategory']
            },
            {
                association: 'brand', // 2                
                attributes: ['id', 'name']
            },
            'status', // 3
            {
                association: 'employee', // 4                
                attributes: ['id', 'userName']
            },
            {
                association: 'computer', // 5
                required: mainCategoryId.includes(MainCategoryList.COMPUTER),
                include: [
                    {
                        association: 'processor',
                        attributes: ['productCollection', 'numberModel', 'name', 'frequency', 'cores', 'threads'],
                    }, // 5 - 0
                    {
                        association: 'hardDriveCapacity',
                        attributes: ['name'],
                    }, // 5 - 1
                    {
                        association: 'hardDriveType',
                        attributes: ['name'],
                    }, // 5 - 2
                    {
                        association: 'operatingSystem',
                        attributes: ['name'],
                    }, // 5 - 3
                    {
                        association: 'operatingSystemArq',
                        attributes: ['name'],
                    }, // 5 - 4
                ],
                attributes: [
                    'computerName',
                    'processorId',
                    'memoryRam',
                    'memoryRamCapacity',
                    'hardDriveCapacityId',
                    'hardDriveTypeId',
                    'operatingSystemId',
                    'operatingSystemArqId',
                    'macAddress',
                    'ipAddress'
                ],
            },
            {
                association: 'hardDrive', // 6
                include: [
                    'hardDriveCapacity', // 6 - 0
                    'hardDriveType' // 6 - 1
                ],
            },
            {
                association: 'location', // 7
                required: true,
                include: [
                    'typeOfSite', // 7 - 0
                    {
                        association: 'site', // 7 - 1
                        required: true,
                        include: [
                            {
                                association: 'city', // 7 - 1 - 0
                                required: true,
                                include: [
                                    {
                                        association: 'state', // 7 - 1 - 1
                                        required: true,
                                        include: [
                                            {
                                                association: 'region', // 7 - 1 - 1 - 0
                                                required: true
                                            }
                                        ],
                                    }
                                ],
                            }
                        ],
                    }
                ],
            },
            {
                association: 'mfp', // 8
                required: mainCategoryId.includes(MainCategoryList.PRINTERS),
            },
            {
                association: 'history',
                include: [
                    {
                        association: 'user',
                        attributes: ['email', 'name', 'lastName'],
                    },
                    'employee'
                ],
                separate: true,
                order: [['createdAt', 'DESC']]
            }
        ]

        // Poder filtrar por main category        
        if (options.where && 'mainCategoryId' in options.where) {
            (options.include[1] as any).where = {
                mainCategoryId: options.where?.mainCategoryId
            }
            delete options.where.mainCategoryId
        }
        // Poder filtrar por las caracteristicas de computer
        const firstLevelJoin = ['computerName', 'processorId', 'hardDriveCapacityId', 'hardDriveTypeId', 'operatingSystemId', 'operatingSystemArqId', 'memoryRam', 'memoryRamCapacity', 'macAddress']
        firstLevelJoin.forEach(ele => {
            if (criteria.searchValueInArray(ele)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error            
                options.include[5].where = { ...options.include[5].where, [ele]: options.where[ele] }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                delete options.where[ele]
            }
        })
        // Poder filtrar por direccion
        if (options.where && 'ipAddress' in options.where) {

            const ipAddress = options.where.ipAddress
            const symbol = Object.getOwnPropertySymbols(ipAddress)[0]
            const value: string = ipAddress[symbol] as string

            (options.include[5] as any).where = {
                ipAddress: sequelize.literal(`ip_address::text ILIKE '%${value}%'`)
            }

            delete options.where.ipAddress
        }

        // Poder filtrar por nombre de procesador
        if (options.where && 'processor' in options.where) {
            (options.include[5] as any).include[0].where = {
                name: options.where.processor
            }
            delete options.where.processor
        }

        // Poder filtrar por ubicacion - Tipo de sitio
        if (options.where && 'typeOfSiteId' in options.where) {
            (options.include[7] as any).where = {
                typeOfSiteId: (options.where as any)?.typeOfSiteId
            }
            delete options.where?.typeOfSiteId
        }

        // Poder filtrar por ubicacion - por sitio
        if (options.where && 'siteId' in options.where) {
            (options.include[7] as any).include[1].where = {
                id: (options.where as any)?.siteId

            }
            delete options.where?.siteId
        }

        // Poder filtrar por ciudad        
        if (options.where && 'cityId' in options.where) {

            (options.include[7] as any).include[1].include[0].where = {
                id: options.where.cityId
            }

            delete options.where?.cityId
        }

        // Poder filtrar por estado
        if (options.where && 'stateId' in options.where) {

            (options.include[7] as any).include[1].include[0].include[0].where = {
                id: options.where.stateId
            }

            delete options.where?.stateId
        }

        // Poder filtrar por region
        if (options.where && 'regionId' in options.where) {
            (options.include[7] as any).include[1].include[0].include[0].include[0].where = {
                id: (options.where as any)?.regionId
            }

            delete options.where?.regionId
        }

        return options
    }
}