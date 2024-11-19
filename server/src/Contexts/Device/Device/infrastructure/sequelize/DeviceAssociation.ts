import { FindOptions } from "sequelize";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";
import { sequelize } from "../../../../Shared/infrastructure/persistance/Sequelize/SequelizeConfig";

export class DeviceAssociation {
    convertFilterLocation(criteria: Criteria, options: FindOptions): FindOptions {
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
                include: [
                    { association: 'processor', attributes: ['productCollection', 'numberModel', 'name', 'frequency', 'cores', 'threads'] }, // 5 - 0
                    { association: 'hardDriveCapacity', attributes: ['name'] }, // 5 - 1
                    { association: 'hardDriveType', attributes: ['name'] }, // 5 - 2
                    { association: 'operatingSystem', attributes: ['name'] }, // 5 - 3
                    { association: 'operatingSystemArq', attributes: ['name'] }, // 5 - 4
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
                ]
            },
            {
                association: 'hardDrive', // 6
                include: [
                    'hardDriveCapacity', // 6 - 0
                    'hardDriveType' // 6 - 1
                ]
            },
            {
                association: 'location', // 7
                include: [
                    'typeOfSite', // 7 - 0
                    {
                        association: 'site', // 7 - 1
                        include: [
                            {
                                association: 'city', // 7 - 1 - 0
                                include: [
                                    {
                                        association: 'state', // 7 - 1 - 1
                                        include: [
                                            {
                                                association: 'region' // 7 - 1 - 1 - 0
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            'mfp', // 8
            {
                association: 'history',
                include: [
                    {
                        association: 'user',
                        attributes: ['email', 'name', 'lastName'],
                    },
                    'employee'
                ],
                order: ['createdAt', 'DESC']
            }
        ]

        // Poder filtrar por main category
        if (criteria.searchValueInArray('mainCategoryId')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[1].where = { ...options.include[1].where, mainCategoryId: options.where.mainCategoryId }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
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
        if (criteria.searchValueInArray('ipAddress')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error            
            const ipAddress = options.where.ipAddress
            const symbol = Object.getOwnPropertySymbols(ipAddress)[0]
            const value = ipAddress[symbol]
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[5].where = { ...options.include[5].where, ipAddress: sequelize.literal(`ip_address::text ILIKE '%${value}%'`) }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.ipAddress
        }

        // Poder filtrar por ubicacion - Tipo de sitio y sitio
        const locationFilter = ['typeOfSiteId', 'siteId']
        locationFilter.forEach(ele => {
            if (criteria.searchValueInArray(ele)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                options.include[7].where = { ...options.include[7].where, [ele]: options.where[ele] }
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                delete options.where[ele]
            }
        })

        // Poder filtrar por ciudad
        if (criteria.searchValueInArray('cityId')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[7].include[1].where = { ...options.include[7].include[1].where, cityId: options.where.cityId }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.cityId
        }
        // Poder filtrar por estado
        if (criteria.searchValueInArray('stateId')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[7].include[1].include[0].where = { ...options.include[7].include[1].include[0].where, stateId: options.where.stateId }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.stateId
        }
        // Poder filtrar por region
        if (criteria.searchValueInArray('regionId')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[7].include[1].include[0].include[0].where = { ...options.include[7].include[1].include[0].include[0].where, regionId: options.where.regionId }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.regionId
        }
        if (criteria.searchValueInArray('processor')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[5].include[0].where = { ...options.include[5].include[0].where, name: options.where.processor }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.processor
        }
        return options
    }
}