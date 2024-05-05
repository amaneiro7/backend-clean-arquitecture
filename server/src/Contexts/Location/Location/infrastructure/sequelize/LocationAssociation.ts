import { FindOptions } from "sequelize"
import { Criteria } from "../../../../Shared/domain/criteria/Criteria"

export class LocationAssociation {
    convertFilterLocation(criteria: Criteria, options: FindOptions): FindOptions {
        options.include = [
            'typeOfSite',
            {
              association: 'site',
              include: [{
                association: 'city',
                include: [{
                  association: 'state',
                  include: ['region']
                }]
              }]
            }]        
        if (criteria.searchValueInArray('cityId')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[1].where = { ...options.include[1].where, cityId: options.where.cityId }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.cityId
        }        
        if (criteria.searchValueInArray('stateId')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[1].include[0].where = { ...options.include[1].include[0].where, stateId: options.where.stateId }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.stateId
        }        
        if (criteria.searchValueInArray('regionId')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            options.include[1].include[0].include[0].where = { ...options.include[1].include[0].include[0].where, regionId: options.where.regionId }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            delete options.where.regionId
        }        
        return options
    }
}