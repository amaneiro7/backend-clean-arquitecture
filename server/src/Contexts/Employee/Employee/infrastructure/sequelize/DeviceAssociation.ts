import { FindOptions, Includeable } from "sequelize";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";


export class DeviceAssociation {
    convertFilterLocation(criteria: Criteria, options: FindOptions): FindOptions {
        options.include = []
        options.include.push({
            association: 'devices',
            include: [
                'category',
                'brand',
                'model',
                {
                    association: 'computer',
                    include: ['processor', 'hardDriveCapacity', 'hardDriveType', 'operatingSystem', 'operatingSystemArq']
                },
                {
                    association: 'hardDrive',
                    include: ['hardDriveCapacity', 'hardDriveType']
                },
                {
                    association: 'location',
                    include: [
                        'typeOfSite' as Includeable,
                        {
                            association: 'site',
                            include: [
                                {
                                    association: 'city',
                                    include: [
                                        {
                                            association: 'state',
                                            include: ['region' as Includeable]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        if (criteria.searchValueInArray('locationId')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error            
            options.include.where = { locationId: options.where.locationId }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.locationId
        }
        if (criteria.searchValueInArray('typeOfSite')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[0].include.where = { typeOfSiteId: options.where.typeOfSite }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.typeOfSite
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log('options', options.include[0].include)
        return options
    }
}