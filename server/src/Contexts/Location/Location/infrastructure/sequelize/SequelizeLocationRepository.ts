import { Criteria } from '../../../../Shared/domain/criteria/Criteria'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { CriteriaToSequelizeConverter } from '../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'
import { type LocationPrimitives } from '../../domain/Location'
import { type LocationId } from '../../domain/LocationId'
import { LocationName } from '../../domain/LocationName'
import { type LocationRepository } from '../../domain/LocationRepository'
import { LocationAssociation } from './LocationAssociation'
import { LocationApiResponse } from './LocationResponse'
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
    const locationOption = new LocationAssociation().convertFilterLocation(criteria, options)
   
    return await LocationModel.findAll(locationOption).then(res => (res as unknown as LocationApiResponse[]).filter(r => r.site !== null))
  }

  async searchById(id: Primitives<LocationId>): Promise<LocationPrimitives | null> {
    return await LocationModel.findByPk(id, {
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
    }) ?? null
  }

  async searchByName (name: Primitives<LocationName>): Promise<LocationPrimitives | null> {
    return await LocationModel.findOne({ where: { name } }) ?? null
  }

  async save (payload: LocationPrimitives): Promise<void> {
    const { id } = payload
    const employee = await LocationModel.findByPk(id) ?? null
    if (employee === null) {
      await LocationModel.create({ ...payload })
    } else {
      employee.set({ ...payload })
      await employee.save()
    }
  }
}
