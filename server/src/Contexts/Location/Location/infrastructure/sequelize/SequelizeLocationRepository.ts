import { Criteria } from '../../../../Shared/domain/criteria/Criteria'
import { CriteriaToSequelizeConverter } from '../../../../Shared/infrastructure/criteria/CriteriaToSequelizeConverter'
import { type CacheRepository } from '../../../../Shared/domain/CacheRepository'
import { type Primitives } from '../../../../Shared/domain/value-object/Primitives'
import { type LocationPrimitives } from '../../domain/Location'
import { type LocationId } from '../../domain/LocationId'
import { type LocationRepository } from '../../domain/LocationRepository'
import { LocationName } from '../../domain/LocationName'
import { LocationAssociation } from './LocationAssociation'
import { LocationApiResponse } from './LocationResponse'
import { LocationModel } from './LocationSchema'

export class SequelizeLocationRepository extends CriteriaToSequelizeConverter implements LocationRepository {
  private readonly cacheKey: string = 'locations'
  constructor(private readonly cache: CacheRepository) {
    super()
  }
  async searchAll(): Promise<LocationPrimitives[]> {
    const cache = await this.cache.get(this.cacheKey)
    if (cache) {
      return JSON.parse(cache)
    } else {
      const result = await LocationModel.findAll({
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

      await this.cache.set(this.cacheKey, JSON.stringify(result))
      return result
    }
  }

  async matching(criteria: Criteria): Promise<LocationPrimitives[]> {
    const options = this.convert(criteria)
    const locationOption = new LocationAssociation().convertFilterLocation(criteria, options)
    const data = await LocationModel.findAll(locationOption)
    let filtered: LocationApiResponse[] | undefined
    ['regionId'].forEach(ele => {
      if (criteria.searchValueInArray(ele)) {
        filtered = (data as unknown as LocationApiResponse[]).filter(res => {
          return res?.site?.city !== null
        })
      }
    });

    ['stateId'].forEach(ele => {
      if (criteria.searchValueInArray(ele)) {
        filtered = (data as unknown as LocationApiResponse[]).filter(res => {
          return res?.site !== null
        })
      }
    });

    return filtered ?? data
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

  async searchByName(name: Primitives<LocationName>): Promise<LocationPrimitives | null> {
    return await LocationModel.findOne({ where: { name } }) ?? null
  }

  async save(payload: LocationPrimitives): Promise<void> {
    const { id } = payload
    const employee = await LocationModel.findByPk(id) ?? null
    if (employee === null) {
      await LocationModel.create({ ...payload })
    } else {
      employee.set({ ...payload })
      await employee.save()
    }
    await this.cache.del(this.cacheKey)
    await this.searchAll()
  }
}
