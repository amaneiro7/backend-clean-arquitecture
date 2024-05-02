import { FindOptions, Includeable } from "sequelize";
import { Criteria } from "../../../../Shared/domain/criteria/Criteria";


export class DeviceAssociation {
    convertFilterLocation(criteria: Criteria, options: FindOptions): FindOptions {
        options.include = []
        options.include.push({
            association: 'devices',
            where: {},
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
                    where: {},
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
                                            include: ['region']
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        const firstLevelJoin = ['locationId', 'categoryId', 'brandId', 'modelId', 'serial', 'activo']
        firstLevelJoin.forEach(ele => {
            if (criteria.searchValueInArray(ele)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error            
                options.include[0].where = { ...options.include[0].where, [ele]: options.where[ele] }                
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                delete options.where[ele]
            }
        })
        const ComputerJoin = ['processorId', 'hardDriveCapacityId', 'hardDriveTypeId', 'operatingSystemId', 'operatingSystemArqId']
        ComputerJoin.forEach(ele => {
            if (criteria.searchValueInArray(ele)) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error            
                options.include[0].include[3].where = { ...options.include[0].include[3].where, [ele]: options.where[ele] }                
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                delete options.where[ele]
            }
        })
        if (criteria.searchValueInArray('typeOfSite')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[0].include[5].where = { ...options.include[0].include[5].where, typeOfSiteId: options.where.typeOfSite }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.typeOfSite
        }        
        return options
    }
}