import { FindOptions } from "sequelize";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";

export class DeviceAssociation {
    convertFilterLocation(criteria: Criteria, options: FindOptions): FindOptions {
        options.include = [
            {
                association: 'model', // 0
                include: [
                    {
                        association: 'modelComputer', // 0 - 0
                        include: ['memoryRamType']
                    },
                    {
                        association: 'modelLaptop', // 0 - 1
                        include: ['memoryRamType']
                    }
                ]
            },
            'category', // 1
            'brand', // 2
            'status', // 3
            'employee', // 4
            {
                association: 'computer', // 5
                include: [
                    { association: 'processor' }, // 5 - 0
                    { association: 'hardDriveCapacity' }, // 5 - 1
                    { association: 'hardDriveType' }, // 5 - 2
                    { association: 'operatingSystem' }, // 5 - 3
                    { association: 'operatingSystemArq' }, // 5 - 4
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
        // Poder filtrar por las caracteristicas de computer
        const firstLevelJoin = ['computerName', 'processorId', 'hardDriveCapacityId', 'hardDriveTypeId', 'operatingSystemId', 'operatingSystemArqId', 'memoryRam', 'memoryRamCapacity', 'ipAddress', 'macAddress']
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