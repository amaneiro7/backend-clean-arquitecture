import { FindOptions } from "sequelize";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";



export class DeviceAssociation {
    convertFilterLocation(criteria: Criteria, options: FindOptions): FindOptions {
        options.include = [
            'model',
            'category',
            'brand',
            'status',
            'employee',
            {
                association: 'computer',
                include: [
                    'processor',
                    'hardDriveCapacity',
                    'hardDriveType',
                    'operatingSystem',
                    'operatingSystemArq'
                ]
            },
            {
                association: 'hardDrive',
                include: ['hardDriveCapacity', 'hardDriveType']
            },
            {
                association: 'location',
                include: [
                    'typeOfSite',
                    {
                        association: 'site',
                        include: [
                            {
                                association: 'city',
                                include: [
                                    {
                                        association: 'state',
                                        include: [
                                            {
                                                association: 'region'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
        const firstLevelJoin = ['computerName', 'processorId', 'hardDriveCapacityId', 'hardDriveTypeId', 'operatingSystemId', 'operatingSystemArqId']
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
        if (criteria.searchValueInArray('cityId')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[7].include[1].where = { ...options.include[7].include[1].where, cityId: options.where.cityId }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.cityId
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log(options.include[5].where)
        return options
    }
}