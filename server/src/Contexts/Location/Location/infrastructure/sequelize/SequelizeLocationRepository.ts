import { Criteria } from '../../../../Shared/domain/criteria/Criteria'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { CriteriaToSequelizeConverter } from '../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'
import { type LocationPrimitives } from '../../domain/Location'
import { type LocationId } from '../../domain/LocationId'
import { type LocationRepository } from '../../domain/LocationRepository'
import { LocationModel } from './LocationSchema'

export class SequelizeLocationRepository extends CriteriaToSequelizeConverter implements LocationRepository {
  async searchAll(): Promise<LocationPrimitives[]> {
    return await LocationModel.findAll({
      include: [
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
        }
      ]
    })
  }

  async matching(criteria: Criteria): Promise<LocationPrimitives[]> {
    const options = this.convert(criteria)
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
    return await LocationModel.findAll(options)
  }

  async searchById(id: Primitives<LocationId>): Promise<LocationPrimitives | null> {
    return await LocationModel.findByPk(id) ?? null
  }
}
